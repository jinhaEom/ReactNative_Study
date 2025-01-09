import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Header } from '../components/Header/Header';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { useRootNavigation } from '../navigation/RootStackNavigation';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';

export const IntroScreen : React.FC = () => {
    const rootNavigation = useRootNavigation<'Intro'>();
    const safeArea = useSafeAreaInsets();

    const onPressGoogleSignin = useCallback(async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const isSignIn = await GoogleSignin.hasPreviousSignIn();
            if(isSignIn){
                await GoogleSignin.signOut();
            }
            const result = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(result.data?.idToken ?? '');
            const authResult = await auth().signInWithCredential(googleCredential);

            rootNavigation.push('SignUp', {
                screen : 'InputEmail',
                params : {
                    preInput : {
                        email : result.data?.user.email ?? '',
                        name : result.data?.user.name ?? 'Unknown',
                        profileImage : result.data?.user.photo ?? '',
                    },
                    uid : authResult.user.uid,
                },
            });
        } catch (error) {
            console.error('Google Signin Error:', error);
        }
    }, [rootNavigation]);


    return(
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="IntroScreen"/>
            </Header>
            <View style={{flex:1, justifyContent:'flex-end', alignItems:'center', paddingBottom: 32 + safeArea.bottom}}>
                <GoogleSigninButton onPress={onPressGoogleSignin}/>
            </View>
        </View>
    );
};
