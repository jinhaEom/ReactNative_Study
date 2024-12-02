import { View, Text, FlatList } from 'react-native'
import React from 'react'
import {Typography} from '../components/Typography'
import {Header} from "../../Header/Header";
import PhotoListItem from '../components/PhotoListItem';
import { IMAGE_LIST } from '../constants';
const ImageListScreen = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Text>Image List</Text>
      </Header>
      <FlatList style={{ flex: 1 ,alignSelf:'center'}} data={IMAGE_LIST} renderItem={({ item }) => {
        return(<PhotoListItem url={item}/>)
        
      }}/>
     
    </View>
  );
}

export default ImageListScreen