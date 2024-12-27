import {useCallback} from 'react';
import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';
import {AccountBookHistory} from '../data/AccountBookHistory';

SQLite.enablePromise(true);

export const useAccountHistoryItem = () => {
  const openDB = useCallback<() => Promise<SQLiteDatabase>>(async () => {
    const dbName = 'account_history.db';

    const db = await SQLite.openDatabase({
      name: dbName,
      location: 'default',
    });

    // Create table if it doesn't exist
    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS account_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        price INTEGER NOT NULL,
        comment TEXT,
        date INTEGER NOT NULL,
        photo_url TEXT,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL
      )
    `);

    return db;
  }, []);

  return {
    insertItem: useCallback<
      (item: Omit<AccountBookHistory, 'id'>) => Promise<AccountBookHistory>
    >(
      async item => {
        const db = await openDB();
        const now = new Date().getTime();
        const result = await db.executeSql(
          `
            INSERT INTO account_history (type, price, comment, date, photo_url, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
          [
            item.type,
            item.price,
            item.comment,
            item.date,
            item.photoUrl ?? null, // 명시적으로 NULL 처리
            now,
            now,
          ],
        );
        console.log('insertItem', result);
        return {
          ...item,
          id: result[0].insertId,
        };
      },
      [openDB],
    ),

    getList: useCallback<() => Promise<AccountBookHistory[]>>(async () => {
      const db = await openDB();
      const result = await db.executeSql('SELECT * FROM account_history');
      const items: AccountBookHistory[] = [];
      const size = result[0].rows.length;

      for (let i = 0; i < size; i++) {
        const row = result[0].rows.item(i);
        items.push({
          id: row.id,
          type: row.type,
          comment: row.comment,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
          date: row.date,
          price: row.price,
          photoUrl: row.photo_url,
        });
      }
      return items.sort((a, b) => b.date - a.date);
    }, [openDB]),

    updateItem: useCallback<
      (item: AccountBookHistory) => Promise<AccountBookHistory>
    >(
      async item => {
        if (typeof item.id === 'undefined') {
          throw Error('Unexpected id Value');
        }
        const db = await openDB();
        const now = new Date().getTime();
        await db.executeSql(
          `
        UPDATE account_history 
        SET price = ?, 
            comment = ?, 
            date = ?, 
            photo_url = ?, 
            updated_at = ? 
        WHERE id = ?
        `,
          [
            item.price,
            item.comment,
            item.date,
            item.photoUrl ?? null,
            now,
            item.id,
          ],
        );
        return item;
      },
      [openDB],
    ),
    getMonthlyAverage: useCallback<
      () => Promise<{month: number; data: number[]}[]>
    >(async () => {
      const now = new Date();
      const currentMonthStart = new Date();
      currentMonthStart.setDate(1);
      const prevMonthList = [2, 1].map(monthDiff => {
        const date = new Date();
        date.setMonth(now.getMonth() - monthDiff);
        date.setDate(1);

        return date.getTime();
      });
      const queryMonth = prevMonthList.concat([
        currentMonthStart.getTime(),
        now.getTime(),
      ]);
      const result : {month: number; data: number[]}[] = [];

      const db = await openDB();

      // [10월시작 11월 시작, 12월 시작, 오늘]
      for (let i = 0; i < queryMonth.length - 1; i++) {
        const start = queryMonth[i];
        const end = queryMonth[i + 1];

        const usedPriceResult = await db.executeSql(
          `
          SELECT SUM(price) FROM account_history WHERE date >= ${start} AND date < ${end} AND type = \"사용\"
          `,
        );
        const savedPriceResult = await db.executeSql(
          `
          SELECT SUM(price) FROM account_history WHERE date >= ${start} AND date < ${end} AND type = \"수입\"
          `,
        );
        const usedPrice = usedPriceResult[0].rows.item(0)['SUM(price)'] ?? 0;
        const savedPrice = savedPriceResult[0].rows.item(0)['SUM(price)'] ?? 0;

        result.push({
          month : new Date(start).getMonth() + 1,
          data : [usedPrice ?? 0, savedPrice ?? 0],
        });
      }
      return result;
    }, [openDB]),
  };
};
