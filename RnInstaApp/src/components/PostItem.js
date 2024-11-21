import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const PostItem = ({ data }) => {
    const [like, setLike] = useState(data.isLiked);
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
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={data.postPersonImage}
            style={{width: 40, height: 40, borderRadius: 40}}
          />
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
                  color: like ? 'red' : 'black'
              }}
            />
          </TouchableOpacity>
         <TouchableOpacity>
            <Ionicons
              name="chatbubble-outline"
              style={{
                  fontSize: 20,
                  paddingRight : 10,
              }}
            />
        </TouchableOpacity>

          <TouchableOpacity
            >
            <Feather name="navigation" style={{fontSize: 20}} />
          </TouchableOpacity>
              </View>
              <Feather name="bookmark" style={{fontSize : 20}}/>
      </View>
    </View>
  );
}

export default PostItem