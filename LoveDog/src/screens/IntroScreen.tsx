import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Header } from '../components/Header/Header';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { useRootNavigation } from '../navigation/RootStackNavigation';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

export const IntroScreen : React.FC = () => {
    const rootNavigation = useRootNavigation<'Intro'>();
    const safeArea = useSafeAreaInsets();
    const [visibleGoogleSigninButton, setVisibleGoogleSigninButton] = useState(true);

    const checkUserLoginOnce = useCallback(async() => {
        const isSignIn = await GoogleSignin.hasPreviousSignIn();
        if(!isSignIn){
            setVisibleGoogleSigninButton(true);
            return;
        }
        setVisibleGoogleSigninButton(false);
        const result = await GoogleSignin.signInSilently();
        const googleCredential = auth.GoogleAuthProvider.credential(result.data?.idToken ?? '');
        const authResult = await auth().signInWithCredential(googleCredential);
        const uid = authResult.user.uid;

        const currentTime = new Date();
        const reference = database().ref(`member/${uid}`);
        await reference.update({
            lastLoginAt : currentTime.toISOString(),
        });
        rootNavigation.reset({
            routes : [{name : 'Main'}],
        });

    },[rootNavigation]);
    useEffect(() => {
        checkUserLoginOnce();
    },[checkUserLoginOnce]);

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
                {visibleGoogleSigninButton && <GoogleSigninButton onPress={onPressGoogleSignin}/>}
            </View>
        </View>
    );
};
