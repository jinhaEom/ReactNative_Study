import { View, Text, Image, TouchableOpacity, TextInput, Platform } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PushNotification from 'react-native-push-notification'
import PushNotificationIOS from '@react-native-community/push-notification-ios';
const PostItem = ({ data }) => {
  const [like, setLike] = useState(data.isLiked);

  const handleNotification = (title) => {
 
    if (Platform.OS === 'ios') {
      PushNotificationIOS.addNotificationRequest({
        id: title,
        title: `${title}을 클릭했습니다.`,
        body: `메세지 입니다!`,
        //  fireDate : new Date(Date.now() + 5 * 1000)

     }) 
     
    } else {
      PushNotification.getChannels(function(channel_ids){
        console.log(channel_ids);
      })
    }
    PushNotification.cancelAllLocalNotifications(); /**기존에 있던 노티 지워줌*/

    PushNotification.localNotificationSchedule({
      channelId: 'insta-channel',
      title: `${title}를 클릭했습니다.`,
      message: '메시지 입니당.',
      color: 'red',
      bigText: 'My Big Text',
      date: new Date(Date.now() + 5 * 1000),
      allowWhileIdle : true
    })
  }
  return (
    <View
      style={{
        paddingBottom: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.2,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 15,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
     <TouchableOpacity onPress={() => handleNotification(data.postTitle)}>

          <Image
            source={data.postPersonImage}
            style={{width: 40, height: 40, borderRadius: 40}}
            />
            </TouchableOpacity>
          <View style={{paddingLeft: 5}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              {data.postTitle}
            </Text>
          </View>
        </View>
        <Feather name="more-vertical" style={{fontSize: 20}} />
      </View>

      <View
        style={{
          position: 'relative',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={data.postImage} style={{width: '100%', height: 400}} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => setLike(!like)}>
            <AntDesign
              name={like ? 'heart' : 'hearto'}
              style={{
                fontSize: 20,
                paddingRight: 10,
                color: like ? 'red' : 'black',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="chatbubble-outline"
              style={{
                fontSize: 20,
                paddingRight: 10,
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Feather name="navigation" style={{fontSize: 20}} />
          </TouchableOpacity>
        </View>
        <Feather name="bookmark" style={{fontSize: 20}} />
      </View>
      <View
        style={{
          flexDirection: 'vertical',
          justifyContent: 'space-between',
          alignItems: 'left',
          paddingHorizontal: 15,
        }}>
        <Text>좋아요 {like ? data.likes + 1 : data.likes} 개</Text>
        <Text style={{fontWeight: 700, fontSize: 14, paddingVertical: 2}}>
          게시글 설명글입니다.
        </Text>
        <Text
          style={{
            opacity: 0.4,
            paddingVertical: 2,
            marginTop: 5,
            marginBottom: 5,
          }}>
          댓글 모두 보기
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              <Image
                source={data.postPersonImage}
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 100,
                  backgroundColor: 'orange',
                  marginRight: 10,
                }}
              />
            <TextInput placeholder="댓글 달기..." style={{opacity: 0.5}} />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: '#0095F6'}}>게시글</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default PostItem;