import React from "react";
import { View } from "react-native";
import { Header } from "../components/Header/Header";
import { useRootNavigation, useRootRoute } from "../navigations/RootNavigation";
import { Calendar } from "react-native-calendars";
import { convertToDateString } from "../utils/DateUtils";
import { DateData } from "react-native-calendars";

const today = new Date();

const todayString = today.toISOString().split('T')[0];
export const CalenderSelectScreen: React.FC = () => {
    const navigation = useRootNavigation<'CalenderSelect'>();
    const routes = useRootRoute<'CalenderSelect'>();
    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Title title="날짜선택" />
                <Header.Icon iconName="close" onPress={() => { navigation.goBack() }} />
            </Header>
            <Calendar
    maxDate={todayString}
    onDayPress={(day: DateData) => {
        routes.params?.onSelectDay(day.timestamp);
        navigation.goBack();
    }}
/>

        </View>
    )
};