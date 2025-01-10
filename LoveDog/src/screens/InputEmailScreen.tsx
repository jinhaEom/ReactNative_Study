import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { Header } from '../components/Header/Header';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { useSignUpNavigation, useSignUpRoute } from '../navigation/SignupNavigation';
import { Spacer } from '../components/Spacer';
import { SingleLineInput } from '../components/SingleLineInput';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EmailValidator from 'email-validator';

export const InputEmailScreen : React.FC = () => {
    const navigation = useSignUpNavigation<'InputEmail'>();
    const routes = useSignUpRoute<'InputEmail'>();

    const safeArea = useSafeAreaInsets();

    const [inputEmail, setInputEmail] = useState(routes.params.preInput.email);
    const isValid = useMemo(() => {
        if(inputEmail.length === 0) {return false;}
        return EmailValidator.validate(inputEmail);
    }, [inputEmail]);

    const onPressSubmit = useCallback(() => {
        if(!isValid) {
            return;
        }

        navigation.push('InputName', {
            preInput : routes.params.preInput,
            uid : routes.params.uid,
            inputEmail : inputEmail,
        });
    }, [isValid, inputEmail, navigation, routes.params.preInput, routes.params.uid]);
    return(
        <View style={{flex:1}}>
            <Header>
                <Header.Group>
                    <Header.Title title="InputEmailScreen"/>
                </Header.Group>
                <Header.Icon iconName="close" onPress={navigation.goBack}/>

            </Header>
            <View style={{flex:1, justifyContent:'center', alignItems:'center',paddingHorizontal:24}}>
            <SingleLineInput value={inputEmail} onChangeText={setInputEmail} placeholder="이메일을 입력해주세요." keyboardType='email-address' onSubmitEditing={onPressSubmit}/>
            </View>

            <Button onPress={onPressSubmit}>
                <View style={{backgroundColor: isValid ? 'black' : 'lightgray'}}>
                    <Spacer space={16}/>
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <Typography fontSize={20} color='white'>다음</Typography>
                    </View>
                    <Spacer space={safeArea.bottom + 12}/>
                </View>
            </Button>

        </View>
    );
};
