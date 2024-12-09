import {View, Text} from "react-native";
import {COLOR} from "./color";

export default ({hasInfo, numOfRemainedStops, seatStatusText, remainedTimeText,NEWCOLOR}) => {
    if(!hasInfo) return <Text style={{color : NEWCOLOR.GRAY_2_GRAY_3}}>도착 정보 없음</Text>

    return (
    <View style={{flexDirection :'row' ,alignItems:'center'}}>
        <Text style={{color : COLOR.BLACK ,marginRight : 10}}>{remainedTimeText}</Text>
        <View style={{borderWidth : 0.5, borderColor : COLOR.GRAY_1, borderRadius: 3, flexDirection:'row',alignItems:'center', padding : 1}}>

        <Text style={{color : NEWCOLOR.GRAY_3_GRAY_2, marginRight : 3}}>{numOfRemainedStops}번째전</Text>
        <Text style={{color : COLOR.CORAL}}>{seatStatusText}</Text>
        </View>

    </View>
);

}