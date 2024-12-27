import React, {useCallback, useEffect, useState} from "react";
import { Header } from "../components/Header/Header";
import { View } from "react-native";
import { useAccountHistoryItem } from "../hooks/useAccountHookHistoryItem";
import { useWindowDimensions } from "react-native";
import { StackedBarChart } from "react-native-chart-kit";
import { useRootNavigation } from "../navigations/RootNavigation";
export const MonthlyScreen : React.FC = () => {
    const {getMonthlyAverage} = useAccountHistoryItem();
    const [average,setAverage] = useState<{month: number; data: number[]}[]>([]);
    const {width} = useWindowDimensions();
    const navigation=useRootNavigation();
    const getAverage = useCallback(async () => {
        const result = await getMonthlyAverage();
        setAverage(result);
    },[getMonthlyAverage]);

    useEffect(() => {
        getAverage();
    },[getAverage]);

    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="MonthlyScreen" />
                <Header.Icon iconName="close" onPress={() => navigation.pop()} />
            </Header>
            <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                <StackedBarChart

                    data={{
                        labels:average.map(item => `${item.month}월`),
                        legend:['사용','수입'],
                        data:average.map(item => item.data),
                        barColors:['red','blue'],
                    }}
                    hideLegend
                    width={width}
                    height={220}
                    chartConfig={{
                        backgroundColor: 'white',
                        backgroundGradientFrom: 'lightgray',
                        backgroundGradientTo: 'gray',
                        color:(opacity = 1)=> `rgba(0,0,0,${opacity})`,
                    }}
                />
            </View>
        </View>
    )
}