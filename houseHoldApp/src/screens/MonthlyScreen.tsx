import React from "react";
import { Header } from "../components/Header/Header";
import { View } from "react-native";

export const MonthlyScreen : React.FC =() => {
    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="MonthlyScreen" />
            </Header>
        </View>
    )
}