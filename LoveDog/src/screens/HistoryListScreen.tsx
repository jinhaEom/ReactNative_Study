import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { Header } from '../components/Header/Header';
import { useRootNavigation } from '../navigation/RootStackNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLikedHistory, TypeUserDispatch } from '../actions/user';
import { TypeRootReducer } from '../store';
import { RemoteImage } from '../components/RemoteImage';
import { TypeDog } from '../data/TypeDog';
import { useWindowDimensions } from 'react-native';
import { Button } from '../components/Button';
import ImageView from 'react-native-image-viewing';
import { useState } from 'react';

export const HistoryListScreen : React.FC = () => {
    const {width} = useWindowDimensions();
    const rootNavigation = useRootNavigation<'HistoryList'>();
    const likedList = useSelector<TypeRootReducer, TypeDog[]>(
        state => state.user.history,
    );
    const [visible, setVisible] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState(0);

    const dispatch = useDispatch<TypeUserDispatch>();
    useEffect(() => {
        dispatch(getUserLikedHistory());
    }, [dispatch]);
    return(
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="HistoryListScreen"/>
                <Header.Icon iconName="close" onPress={()=>{
                    rootNavigation.goBack();
                }}/>
            </Header>
            <FlatList<TypeDog>
                data={likedList}
                numColumns={2}
                renderItem={({item, index}) => (
                    <Button onPress={() => {
                        setVisible(true);
                        setSelectedIdx(index);
                    }}>
                        <RemoteImage url={item.photoUrl} width={width * 0.5} height={width * 0.5}/>
                    </Button>
                )}
               />
               <ImageView images={likedList.map(item => ({uri: item.photoUrl}))}
               imageIndex={selectedIdx}
               visible={visible}
               onRequestClose={() => setVisible(false)}
               />
        </View>
    );
}