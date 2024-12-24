import React, { useEffect, useState } from "react";
import { Header } from "../components/Header/Header";
import { FlatList, View } from "react-native";
import { AccountBookHistory } from "../data/AccountBookHistory";
import { AccountHistoryListItemView } from "../components/AccountHistoryListItemView";
import { useRootNavigation } from "../navigations/RootNavigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../components/Button";
import { Icon } from "../components/Icons";

const now = new Date().getTime();
export const MainScreen : React.FC =() => {
    const navigation = useRootNavigation();
    const safeAreaInset = useSafeAreaInsets();

    const [list] = useState<AccountBookHistory[]>([
       {
        id: 0,
        type : '사용',
        price : 10000,
        comment : 'TEST_01',
        date: now,
        createdAt : now,
        updatedAt : now,
        photoUrl : null
       },
       {
        id: 1,
        type : '수입',
        price : 20000,
        comment : 'TEST_02',
        date: now,
        createdAt : now,
        updatedAt : now,
        photoUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQK-2a8gt43aMfhf6McxaOBmZMQrfdxRwooA&s'
       }
    ])
    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="Main Screen" />
            </Header>
            <FlatList
                data={list}
                renderItem={({item}) => {
                    return(
                        <AccountHistoryListItemView
                            item={item}
                            onPressItem={clicked =>{
                                navigation.push('Detail', {item : clicked})
                            }}
                        />
                    )
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
                        <View style={{width : 48, height : 48, borderRadius : 24, backgroundColor : 'red', alignItems : 'center', justifyContent : 'center'}}>
                            <Icon name="add" size={24} color="white" />
                        </View>
                </Button>
            </View>
        </View>
    )
}