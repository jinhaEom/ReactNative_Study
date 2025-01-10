import { Platform } from 'react-native';
import storage from '@react-native-firebase/storage';
export const uploadFile = async (localUri : string) : Promise<string> => {

    const fileNameList = localUri.split('/');
    const fileName = fileNameList[fileNameList.length - 1];

    const uploadFileUrl = await storage().ref(fileName).putFile(Platform.OS === 'android' ? localUri.replace('file://', '') : localUri).then((result)=>
        storage().ref(result.metadata.fullPath).getDownloadURL());

    return uploadFileUrl;
};
