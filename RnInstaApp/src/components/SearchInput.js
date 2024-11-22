import { View, Text, TextInput } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchInput = () => {
  return (
    <View style={{justifyContent : 'center', alignItems: 'center', width : '100%', position : 'relative',paddingVertical : 10 }}>
          <Ionicons name="search" style={{ fontSize: 18, position: 'absolute', zIndex: 1, left: 25 ,opacity : 0.7}} />
          <TextInput placeholder="Search..." placeholderTextColor ="#909090" style={{width : '94%',padding:4,paddingLeft:40,justifyContent : 'center', alignItems : 'center', borderRadius : 10, backgroundColor: "#EBEBEB"}} />
    </View>
  )
}

export default SearchInput