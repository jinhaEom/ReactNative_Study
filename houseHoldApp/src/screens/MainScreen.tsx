import React, {useState, useCallback} from 'react';
import {Header} from '../components/Header/Header';
import { FlatList, View} from 'react-native';
import {AccountBookHistory} from '../data/AccountBookHistory';
import {AccountHistoryListItemView} from '../components/AccountHistoryListItemView';
import {useRootNavigation} from '../navigations/RootNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../components/Button';
import {Icon} from '../components/Icons';
import {useAccountHistoryItem} from '../hooks/useAccountHookHistoryItem';
import {useFocusEffect} from '@react-navigation/native';
import {Typography} from '../components/Typography';
import {Spacer} from '../components/Spacer';

export const MainScreen: React.FC = () => {
  const navigation = useRootNavigation();
  const safeAreaInset = useSafeAreaInsets();

  const [list, setList] = useState<AccountBookHistory[]>([]);
  const {getList, getMonthlyAverage} = useAccountHistoryItem();
  const [average, setAverage] = useState<{month: number; data: number[]}[]>([]);

  const fetchList = useCallback(async () => {
    const data = await getList();
    setList(data);
    const monthlyAverage = await getMonthlyAverage();
    setAverage(monthlyAverage);
  }, [getList, getMonthlyAverage]);

  useFocusEffect(
    useCallback(() => {
      fetchList();
    }, [fetchList]),
  );
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Main Screen" />
      </Header>
      <FlatList
        ListHeaderComponent={
          <Button onPress={() => navigation.push('Monthly')}>
            <View style={{height: 200, alignItems: 'center',justifyContent:'center'}}>
              <Typography fontSize={16} color="gray">
                이번달 총 사용금액
              </Typography>
              <Spacer space={12} />
              <Typography>
                {average.length > 0 ? `${average[average.length - 1].data[0]}원` : '0원'}
              </Typography>
            </View>
            <View style={{height: 200, alignItems: 'center',justifyContent:'center'}}>
              <Typography fontSize={16} color="gray">
                이번달 총 수입금액
              </Typography>
              <Spacer space={32} />
              <Typography>
                {average.length > 0 ? `${average[average.length - 1].data[1]}원` : '0원'}
              </Typography>
              <Spacer space={12} />
            </View>
          </Button>
        }
        data={list}
        renderItem={({item}) => {
          return (
            <AccountHistoryListItemView
              item={item}
              onPressItem={clicked => {
                navigation.push('Detail', {item: clicked});
              }}
            />
          );
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: 12,
          bottom: 12 + safeAreaInset.bottom,
        }}>
        <Button
          onPress={() => {
            navigation.push('Add');
          }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="add" size={24} color="white" />
          </View>
        </Button>
      </View>
    </View>
  );
};
