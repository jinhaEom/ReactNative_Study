import { View, Text, ScrollView, TouchableOpacity , Image } from 'react-native';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
const storyInfo = [
  {
    id: 1,
    name: '나의 스토리',
    image: require('../../../assets/images/userProfile.jpeg'),
  },
  {
    id: 2,
    name: 'jinha',
    image: require('../../../assets/images/profile1.jpeg'),
  },
  {
    id: 3,
    name: 'yeaseul',
    image: require('../../../assets/images/profile2.jpeg'),
  },
  {
    id: 4,
    name: 'dajeong',
    image: require('../../../assets/images/profile3.jpeg'),
  },
  {
    id: 5,
    name: 'john',
    image: require('../../../assets/images/profile4.jpeg'),
  },
  {
    id: 6,
    name: 'Daniel',
    image: require('../../../assets/images/profile5.jpeg'),
  },
  {
    id: 7,
    name: 'Jennie',
    image: require('../../../assets/images/profile3.jpeg'),
  },
];

const Stories = () => {
  const navigation = useNavigation();
  const [clickedItems, setClickedItems] = useState({});

  const handlePress = (id, data) => {
    setClickedItems(prevState => ({
      /* prevState는 클릭되기전(상태가 일어나기전)을 뜻함*/
      ...prevState,
      [id]: !prevState[id],
    }));
    navigation.push('Status', {
      name: data.name,
      image: data.image,
    });
  };
    return (
        <ScrollView
            horizontal={true}
            style ={{paddingVertical : 20}}
        >
        {storyInfo.map((data, index) => {
          const isClicked = clickedItems[data.id] || false;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handlePress(data.id, data)}>
                    <View
                      style={{
                        flexDirection: 'column',
                        paddingHorizontal: 8,
                        position: 'relative',
                      }}>
                      {data.id === 1 ? (
                        <View
                          style={{
                            position: 'absolute',
                            bottom: 15,
                            right: 10,
                            zIndex: 1,
                          }}>
                          <Entypo
                            name="circle-with-plus"
                            style={{
                              fontSize: 20,
                              color: '#405de6',
                              backgroundColor: 'white',
                              borderRadius: 10,
                              overflow: 'hidden',
                            }}
                          />
                        </View>
                      ) : null}
                      <View
                        style={{
                          width: 68,
                          height: 68,
                          backgroundColor: 'white',
                          borderWidth: 1.8,
                          borderRadius: 100,
                          borderColor: isClicked ? '#8C8C8C' : '#c13584',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={data.image}
                          style={{
                            resizeMode: 'cover',
                            width: '92%',
                            height: '92%',
                            borderRadius: 100,
                            backgroundColor: 'orange',
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: isClicked ? '#8c8c8c' : 'black',
                          fontWeight: '500',
                          marginTop: 4,
                        }}>
                        {data.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
           })}
          
        </ScrollView>
    );
};

export default Stories;