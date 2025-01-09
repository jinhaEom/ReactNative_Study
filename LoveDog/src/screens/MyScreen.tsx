import React from 'react';
import { View } from 'react-native';
import { Header } from '../components/Header/Header';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { useRootNavigation } from '../navigation/RootStackNavigation';
import { useBottomTabNavigation } from '../navigation/BottomTabNavigation';

export const MyScreen : React.FC = () => {
    const rootNavigation = useRootNavigation<'Main'>();
    
    return(
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="MyScreen"/>
            </Header>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Button onPress={()=> {
                    rootNavigation.navigate('HistoryList');
                }}>
                    <Typography fontSize={16}>히스토리 화면으로 이동</Typography>
                </Button>
            </View>
        </View>
    );
}