import { View, Text } from 'react-native'
import React from 'react'

const HeaderGroup = (props) => {
  return (
    <View style={{flexDirection:'row', alignItems: 'center'}}>
      {props.children}
    </View>
  )
}

export default HeaderGroup