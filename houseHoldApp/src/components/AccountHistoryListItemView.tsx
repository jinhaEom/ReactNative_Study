import React from 'react';
import { View, Text } from 'react-native';
import { AccountBookHistory } from '../data/AccountBookHistory';
import { Button } from './Button';
import { Icon } from './Icons';
import { Typography } from './Typography';
import { Spacer } from './Spacer';
import { RemoteImage } from './RemoteImage';
import { convertToDateString } from '../utils/DateUtils';

export const AccountHistoryListItemView : React.FC<{item:AccountBookHistory, onPressItem:(item : AccountBookHistory) => void}> = props => {
    return (
        <Button onPress={() => props.onPressItem(props.item)}>
            <View style={{paddingVertical : 12, paddingHorizontal : 16, flexDirection: 'row', alignItems:'center'}}>
                <Icon
                    name={props.item.type==='사용' ? 'remove-circle': 'add-circle'}
                    size={24}
                    color={props.item.type==='사용' ? 'red': 'blue'}
                />
                <View style={{flex : 1, marginLeft : 12}}>
                    <Typography fontSize={16} color={'black'}>{props.item.comment}</Typography>
                    <Spacer space={4}/>
                    <Typography fontSize={12} color={'gray'}>{convertToDateString(props.item.createdAt)}</Typography>
                </View>
                {props.item.photoUrl !== null && (
                    <>
                    <Spacer space={12} horizontal/>
                      <RemoteImage
                        url={props.item.photoUrl}
                        width={100}
                        height={100}
                        style={{borderRadius : 10}}
                    />
                    </>
                  
                )}
            </View>
            </Button>
    )
}
    
