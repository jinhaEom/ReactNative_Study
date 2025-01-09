import React from 'react';
import { View } from 'react-native';
import { Header } from '../components/Header/Header';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { useRootNavigation, useRootRoute } from '../navigation/RootStackNavigation';
import { useSignUpNavigation } from '../navigation/SignupNavigation';

export const InputNameScreen : React.FC = () => {
    const rootNavigation = useRootNavigation<'SignUp'>();
    const navigation = useSignUpNavigation<'InputName'>();
    return(
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="InputNameScreen"/>
                <Header.Icon iconName="close" onPress={navigation.goBack}/>
            </Header>
            <View style={{flex:1}}>
        
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Button onPress={()=> {
                rootNavigation.replace('Main');
            }}>
                    <Typography fontSize={16}>회원가입 완료</Typography>
                </Button>
            </View>
        </View>
        </View>
    );
}