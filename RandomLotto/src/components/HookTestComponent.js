import { View, Text } from 'react-native'
import React, {useMemo} from 'react'
import {Typography} from './Typography'

const HookTestComponent = (props) => {
    const text = useMemo(() => {
        return props.a + props.b;
    },[props.a, props.b])
  return (
    <View>
          <Typography fontSize={30}>결과값 : {text}</Typography>
    </View>
  )
}

export default HookTestComponent