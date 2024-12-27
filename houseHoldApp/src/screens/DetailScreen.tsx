import React, { useCallback, useState } from 'react';
import { Header } from '../components/Header/Header';
import { View } from 'react-native';
import { useRootNavigation, useRootRoute } from '../navigations/RootNavigation';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { Spacer } from '../components/Spacer';
import { convertToDateString } from '../utils/DateUtils';
import { RemoteImage } from '../components/RemoteImage';
import { AccountBookHistory } from '../data/AccountBookHistory';

export const DetailScreen : React.FC = () => {
    const navigation = useRootNavigation<'Detail'>();
    const routes = useRootRoute<'Detail'>();
    const [item ,setItem] = useState<AccountBookHistory>(routes.params.item);

    const onPressUpdate = useCallback(() => {
        navigation.push('Update', {
            item : {
                ...item,
                id: routes.params.item.id,
            },
            onChangeData : nextItem => {
                console.log('nextItem',nextItem);
                setItem(nextItem);
            },
        });
    }, [item,navigation,routes.params.item.id]);
    return (
        <View style={{flex:1}}>
            <Header>
                <Header.Title title="DetailScreen" />
                <Header.Icon iconName="close" onPress={() => {
                    navigation.goBack();
                }} />
            </Header>
            <ScrollView style={{ flex: 1, }}
                contentContainerStyle={{ paddingTop: 32, paddingHorizontal: 24 }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                            <View style={{ backgroundColor: item.type === '사용' ? 'black' : 'white', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, }}>
                                <Typography fontSize={20} color={item.type === '사용' ? 'white' : 'black'}>사용</Typography>
                            </View>
                    </View>
                    <View style={{ flex: 1 }}>
                            <View style={{ backgroundColor: item.type === '사용' ? 'white' : 'black', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderTopRightRadius: 12, borderBottomRightRadius: 12, }}>
                                <Typography fontSize={20} color={item.type === '사용' ? 'black' : 'white'}>수입</Typography>
                            </View>
                    </View>
                </View>

                <Spacer space={32} />

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                       <View style={{borderWidth:1, borderColor:'gray', borderRadius:4, paddingVertical:8, paddingHorizontal:12, justifyContent:'center'}}>
                        <Typography fontSize={16} color={item.date === 0 ? 'lightgray' : 'gray'}>{item.price.toString()} 원</Typography>
                       </View>

                        <Spacer space={24} />
                            <View style={{ borderColor:item.date === 0 ? 'lightgray' : 'gray', borderWidth: 1, justifyContent: 'center', paddingVertical: 8,paddingHorizontal: 12, borderRadius: 4,}}>
                                <Typography fontSize={20} color={item.date === 0 ? 'lightgray' : 'gray'}>{convertToDateString(item.date)}</Typography>
                            </View>


                    </View>
                    <View style={{ marginLeft: 24 }}>
                            {item.photoUrl ? (
                                <RemoteImage url={item.photoUrl} width={100} height={100} style={{borderRadius: 12 }} />
                            ) : (
                                <View style={{ width: 100, height: 100, borderRadius: 12, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center' }} />
                            )}

                    </View>
                </View>
                <Spacer space={12} />
                <View style={{alignSelf:'stretch', paddingHorizontal:12, paddingVertical:8, borderRadius:4, borderWidth:1, borderColor:'gray',height:100}}>
                    <Typography fontSize={16} color={'gray'}>{item.comment}</Typography>
                </View>
                    <Spacer space={64} />
                    <Button onPress={onPressUpdate}>
                        <View style={{ backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 4, }}>
                            <Typography fontSize={16} color="white">{'수정하기'}</Typography>
                        </View>
                    </Button>
            </ScrollView>
        </View>
    );
};
