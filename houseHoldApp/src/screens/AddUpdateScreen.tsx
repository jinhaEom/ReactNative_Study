import React, { useCallback, useState } from "react";
import { Header } from "../components/Header/Header"

import { ScrollView, View } from "react-native";
import { useRootNavigation, useRootRoute } from "../navigations/RootNavigation";
import { Button } from "../components/Button";
import { AccountBookHistory } from "../data/AccountBookHistory";
import { Typography } from "../components/Typography";
import { Spacer } from "../components/Spacer";
import { SingleLineInput } from "../components/SingleLineInput";
import { Icon } from "../components/Icons";
import { convertToDateString } from '../utils/DateUtils';
import { MultiLineInput } from "../components/MultiLineInput";


export const AddUpdateScreen: React.FC = () => {
    const navigation = useRootNavigation<'Add' | 'Update'>();
    const routes = useRootRoute<'Add' | 'Update'>();

    const [item, setItem] = useState<AccountBookHistory>(

        routes.params?.item ?? {
            type: '사용',
            price: 0,
            comment: '',
            date: 0,
            createdAt: 0,
            updatedAt: 0,
            photoUrl: null

        })
    const onPressType = useCallback<(type: AccountBookHistory['type']) => void>(
        type => {
            if (routes.name === 'Update') {
                return;
            }
            setItem(prevItem => {
                return {
                    ...prevItem,
                    type: type,
                };
            });
        }, [routes.name],
    )
    const onChangePrice = useCallback<(test: string) => void>(text => {
        setItem(prevItem => {
            return {
                ...prevItem,
                price: parseInt(text),
            };
        });
    }, [])
    const onChangeComment = useCallback<(text:string)=>void>((text) =>{
        setItem(prevItem => {
            return {
                ...prevItem,
                comment: text,
            };
        });
    },[])

    const onPressPhoto = useCallback(() => {

    }, [])

    const onPressCalendar = useCallback(() => {
        navigation.navigate('CalenderSelect', {
            onSelectDay: (date: number) => {
                setItem(prevItem => {
                    return {
                        ...prevItem,
                        date: date,
                    };
                });
            }
        })
    }, [navigation])
    const onPressSave = useCallback(() => {

    }, [])
    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Title title="Add/Update" />
                <Header.Icon iconName="close" onPress={() => {
                    navigation.goBack();
                }} />
            </Header>
            <ScrollView style={{ flex: 1, }}
                contentContainerStyle={{ paddingTop: 32, paddingHorizontal: 24 }}
            >
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Button onPress={() => onPressType('사용')}>
                            <View style={{ backgroundColor: item.type === '사용' ? 'black' : 'white', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderTopLeftRadius: 12, borderBottomLeftRadius: 12, }}>
                                <Typography fontSize={20} color={item.type === '사용' ? 'white' : 'black'}>사용</Typography>
                            </View>
                        </Button>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button onPress={() => onPressType('수입')}>
                            <View style={{ backgroundColor: item.type === '사용' ? 'white' : 'black', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderTopRightRadius: 12, borderBottomRightRadius: 12, }}>
                                <Typography fontSize={20} color={item.type === '사용' ? 'black' : 'white'}>수입</Typography>
                            </View>
                        </Button>
                    </View>
                </View>

                <Spacer space={32} />

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <SingleLineInput value={item.price === 0 ? '' : item.price.toString()}
                            placeholder="금액을 입력하세요"
                            onChangeText={onChangePrice}
                            keyboardType="number-pad"
                            onSubmitEditing={() => { }}
                            fontSize={20}
                        />

                        <Spacer space={24} />
                        <Button onPress={onPressCalendar}>
                            <View style={{ borderColor:item.date === 0 ? 'lightgray' : 'gray', borderWidth: 1, justifyContent: 'center', paddingVertical: 8,paddingHorizontal: 12, borderRadius: 4,}}>
                                <Typography fontSize={20} color={item.date === 0 ? 'lightgray' : 'gray'}>{item.date !== 0 ? convertToDateString(item.date) : '날짜를 선택하세요'}</Typography>
                            </View>
                        </Button>


                    </View>
                    <View style={{ marginLeft: 24 }}>
                        <Button onPress={onPressPhoto}>
                            <View style={{ width: 100, height: 100, borderRadius: 12, backgroundColor: 'lightgray', alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name="add" size={24} color="gray" />
                            </View>
                        </Button>
                    </View>
                </View>
                <Spacer space={12} />
                <MultiLineInput onSubmitEditing={()=>{}} placeholder="어떤 일인가용?" value={item.comment} height={100} onChangeText={onChangeComment}/>
                    <Spacer space={64} />
                    <Button onPress={onPressSave}>
                        <View style={{ backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 4, }}>
                            <Typography fontSize={16} color="white">{item.type === '사용' ? '저장하기' : '수정하기'}</Typography>
                        </View>
                    </Button>
            </ScrollView>
        </View>
    )
}