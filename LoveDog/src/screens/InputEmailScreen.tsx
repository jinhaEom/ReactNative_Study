import React from 'react';
import { View } from 'react-native';
import { Header } from '../components/Header/Header';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { useSignUpNavigation, useSignUpRoute } from '../navigation/SignupNavigation';

export const InputEmailScreen : React.FC = () => {
    const navigation = useSignUpNavigation<'InputEmail'>();
    const routes= useSignUpRoute<'InputEmail'>();
    return(
        <View style={{flex:1}}>
            <Header>
                <Header.Group>
                    <Header.Title title="InputEmailScreen"/>
                </Header.Group>
                <Header.Icon iconName="close" onPress={navigation.goBack}/>

            </Header>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Button onPress={() => {
                    navigation.push('InputName', {
                            uid : '',
                            preInput : routes.params.preInput,
                            inputEmail :'test@test.com'
                    });
                }}>
                    <Typography fontSize={16}>회원가입 화면으로 이동하기</Typography>
                </Button>
            </View>
        </View>
    );
}