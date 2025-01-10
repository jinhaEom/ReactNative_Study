import React, { useCallback, useMemo, useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Header } from '../components/Header/Header';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { useRootNavigation, useRootRoute } from '../navigation/RootStackNavigation';
import { useSignUpNavigation, useSignUpRoute } from '../navigation/SignupNavigation';
import { useState } from 'react';
import { SingleLineInput } from '../components/SingleLineInput';
import { Spacer } from '../components/Spacer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RemoteImage } from '../components/RemoteImage';
import { Icon } from '../components/Icons';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import { uploadFile } from '../utils/FileUtils';
import database from '@react-native-firebase/database';

export const InputNameScreen : React.FC = () => {
    const rootNavigation = useRootNavigation<'SignUp'>();
    const navigation = useSignUpNavigation<'InputName'>();
    const routes = useSignUpRoute<'InputName'>();
    const actionSheetRef = useRef<ActionSheet>(null);

    const [isLoading, setLoading] = useState(false);
    const [profileImage] = useState(routes.params.preInput.profileImage);
    const safeArea = useSafeAreaInsets();
    const [selectedPhoto, setSelectedPhoto] = useState<{uri:string} | null >(null);
    const[inputName, setInputName] = useState(routes.params.preInput.name);
    const isValid = useMemo(() =>{
        return true;
    }, []);
    const onPressSubmit = useCallback(async() => {
        const getPhotoUrl = async() => {
            if(selectedPhoto){
                return await uploadFile(selectedPhoto.uri);
            }
            return profileImage;
        };
        setLoading(true);
        const photoUrl = await getPhotoUrl();
        const currentTime = new Date();
        const reference = database().ref(`member/${routes.params.uid}`);
        await reference.set({
            name : inputName,
            email : routes.params.inputEmail,
            profile : photoUrl,
            regeditAt : currentTime.toISOString(),
            lastLoginAt : currentTime.toISOString(),
        });
        rootNavigation.reset({
            routes : [{name : 'Main'}],
        });
        setLoading(false);
        // rootNavigation.replace('Main');
    }, [profileImage,selectedPhoto,inputName,routes.params.uid,routes.params.inputEmail,rootNavigation]);


    const onPressProfileImage = useCallback(async() => {
      actionSheetRef.current?.show();
    }, []);

    return(
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="InputNameScreen"/>
                <Header.Icon iconName="close" onPress={navigation.goBack}/>
            </Header>

            <View style={{flex:1, justifyContent:'center', alignItems:'center',paddingHorizontal:24,}}>
                <Button onPress={onPressProfileImage}>


                <View style={{width: 100, height : 100}}>

                    {profileImage !== '' ? (
                         <>
                        <RemoteImage
                        width={100}
                        height={100}
                        url={selectedPhoto !== null ? selectedPhoto.uri : profileImage}
                        style={{borderRadius:50}}
                        />

                        <View style={{position:'absolute', right: 0, bottom: 0}}>
                            <View style={{width:20,height:20,borderRadius:10,backgroundColor:'gray',alignItems:'center',justifyContent:'center'}}>
                                <Icon name="add" size={16} color="white"/>
                            </View>
                        </View>
                    </>
                    ) : (
                        <View style={{width : 100, height:100, borderRadius:50,backgroundColor:'gray',alignItems:'center',justifyContent:'center'}}>
                            <Icon name="add" size={32} color="#000000"/>
                        </View>
                    )}
                    </View>
                </Button>

        <Spacer space={24}/>

            <SingleLineInput value={inputName} onChangeText={setInputName} placeholder="이름을 입력해주세요." onSubmitEditing={() => {}}/>
            </View>
            <Button onPress={onPressSubmit}>
                <View style={{backgroundColor : isValid ? 'black' : 'lightgray'}}>
                    <Spacer space={16}/>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        {isLoading ? <ActivityIndicator size={20} color="white"/> : <Typography fontSize={16} color="white">회원가입</Typography>}
                    </View>
                    <Spacer space={safeArea.bottom + 12}/>
                </View>
            </Button>
            <ActionSheet
            ref={actionSheetRef}
            options={['카메라로 촬영하기', '앨범에서 선택하기', '취소']}
            cancelButtonIndex={2}
            onPress={async(index) => {
                if(index === 0){
                    rootNavigation.navigate('TakePhoto', {onTakePhoto: (uri:string) => {
                        setSelectedPhoto({uri:uri});
                    }});
                }
                if(index === 1){
                    const photoResult = await ImagePicker.openPicker({
                        width: 300,
                        height: 400,
                        cropping: true,
                      });
                      setSelectedPhoto({uri:photoResult.path});
                }
            }}
        />
        </View>
    );
}