import {View, Text} from "react-native";
import BookmarkButton from "./BookmarkButton";
import AlarmButton from "./AlarmButton";
import NextBusInfo from "./NextBusInfo";
import {COLOR} from "./color";

  export default ({ isBookmarked, onPressBookmark, directionDescription , num,numColor, processedNextBusInfos,NEWCOLOR}) => {
  return (
    <View
      style={{ flexDirection: "row", height: 80, backgroundColor: NEWCOLOR.WHITE_BLACK }}
    >
      <View style={{ flex: 0.85, flexDirection: "row", alignItems: "center" }}>
        <BookmarkButton
          isBookmarked={isBookmarked}
          onPress={onPressBookmark}
          style={{ paddingHorizontal: 10 }}
          size={20}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 20, color: numColor }}>{num}</Text>
          <Text style={{ fontSize: 13,marginRight:5, color: NEWCOLOR.GRAY_3_GRAY_2 }}>
            {directionDescription} 방향
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          {processedNextBusInfos.map((info) => (
            <NextBusInfo
              key={Math.random()}
              hasInfo={info.hasInfo}
              remainedTimeText={info.remainedTimeText}
              numOfRemainedStops={info.numOfRemainedStops}
              seatStatusText={info.seatStatusText}
              NEWCOLOR={NEWCOLOR}
            />
          ))}
        </View>

        <AlarmButton NEWCOLOR={NEWCOLOR} style={{ paddingHorizontal: 15 }} onPress={() => {}} />
      </View>
    </View>
  );
};