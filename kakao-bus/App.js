import {
  RefreshControl,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import BusInfo from "./src/BusInfo";
import { COLOR } from "./src/color";
import { useState, useEffect } from "react";
import {
  busStop,
  getBusNumColorByType,
  getRemainedTimeText,
  getSeatStatusText,
  getSections,
} from "./src/data";
import dayjs from "dayjs";
import { SimpleLineIcons } from "@expo/vector-icons";
import Margin from "./src/Margin";
import BookmarkButton from "./src/BookmarkButton";
import { useTheme } from "./src/use-theme";

export default function App() {
  const sections = getSections(busStop.buses);
  const [now, setNow] = useState(dayjs());
  const [refreshing, setRefreshing] = useState(false);
  const IconButton = ({ style, name, color, size }) => {
    return (
      <TouchableOpacity style={style}>
        <SimpleLineIcons name={name} size={size} color={color} />
      </TouchableOpacity>
    );
  };
  const busStopBookmarkSize = 20;
  const busStopBookmarkPadding = 6;
  const {isDark, NEWCOLOR ,toggleIsDark } = useTheme();
  const onPressBusStopBookmarked = () => {};

  const ListHeaderComponent = () => (
    <View
      style={{
        backgroundColor: COLOR.GRAY_3,
        height: 170,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Margin height={10} />

      <Text style={{ color: NEWCOLOR.WHITE_BLACK, fontSize: 13 }}>
        {busStop.id}
      </Text>
      <Margin height={4} />
      <Text style={{ color: NEWCOLOR.WHITE_BLACK, fontSize: 20 }}>
        {busStop.name}
      </Text>
      <Margin height={4} />

      <Text style={{ color: NEWCOLOR.GRAY_1_GRAY_2, fontSize: 14 }}>
        {busStop.directionDescription}
      </Text>
      <Margin height={15} />
      <BookmarkButton
        size={busStopBookmarkSize}
        isBookmarked={busStop.isBookmarked}
        onPress={onPressBusStopBookmarked}
        style={{
          borderWidth: 0.3,
          borderRadius: (busStopBookmarkSize + busStopBookmarkPadding * 2) / 2,
          padding: 5,
          borderColor: COLOR.GRAY_1,
        }}
      />
      <Switch
        style={{ position: "absolute", right: 0 }}
        value={isDark}
        onValueChange={(v) => {
          toggleIsDark();
        }}
      />
      <Margin height={25} />
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View
      style={{
        paddingLeft: 13,
        paddingVertical: 5,
        backgroundColor: NEWCOLOR.GRAY_1_GRAY_4,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopColor: NEWCOLOR.GRAY_2_GRAY_3,
        borderBottomColor: NEWCOLOR.GRAY_2_GRAY_3,
      }}
    >
      <Text style={{ color: NEWCOLOR.GRAY_4_GRAY_1, fontSize: 12 }}>
        {title}
      </Text>
    </View>
  );
  const renderItem = ({ item: bus }) => {
    const numColor = getBusNumColorByType(bus.type);
    const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null;
    const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
    const newNextBusInfos =
      !firstNextBusInfo && !secondNextBusInfo
        ? [null]
        : [firstNextBusInfo, secondNextBusInfo];
    const processedNextBusInfos = newNextBusInfos.map((info) => {
      if (!info)
        return {
          hasInfo: false,
          remainedTimeText: "도착 정보 없음",
        };

      const { arrivalTime, numOfRemainedStops, numOfPassengers } = info;
      const remainedTimeText = getRemainedTimeText(now, arrivalTime);
      const seatStatusText = getSeatStatusText(bus.type, numOfPassengers);
      return {
        hasInfo: true,
        remainedTimeText,
        numOfRemainedStops,
        seatStatusText,
      };
    });
    return (
      <BusInfo
        NEWCOLOR={NEWCOLOR}
        isBookmarked={true}
        onPressBookmark={() => {}}
        num={bus.num}
        directionDescription={bus.directionDescription}
        numColor={numColor}
        processedNextBusInfos={processedNextBusInfos}
      />
    );
  };
  const onRefresh = () => {
    console.log("onRefresh");
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setNow(dayjs());
    }, 3000);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const newNow = dayjs();
      setNow(newNow);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const ItemSeparatorComponent = () => (
    <View
      style={{
        width: "100%",
        height: 1,
        backgroundColor: NEWCOLOR.GRAY_1_GRAY_4,
      }}
    />
  );
  const ListFooterComponent = () => <Margin height={30} />;

  return (
    <View style={[styles.container, { backgroundColor: NEWCOLOR.WHITE_BLACK }]}>
      <View
        style={{
          position: "absolute",
          width: "100%",
          backgroundColor: COLOR.GRAY_3,
          top: 0,
          height: 300,
          zIndex: 0,
        }}
      />
      <View style={{ backgroundColor: NEWCOLOR.GRAY_3_GRAY_2, width: "100%" }}>
        <SafeAreaView
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <IconButton
            style={{ padding: 10 }}
            name="arrow-left"
            color="black"
            size={20}
          />
          <IconButton
            style={{ padding: 10 }}
            name="home"
            color="black"
            size={20}
          />
        </SafeAreaView>
      </View>
      <SectionList
        key={Math.random()}
        style={{ flex: 1, width: "100%" }}
        sections={sections}
        ListHeaderComponent={ListHeaderComponent}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
