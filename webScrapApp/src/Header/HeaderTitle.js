import { View, Text } from 'react-native'
import React from 'react'
import { Typography } from '../components/Typography'

const HeaderTitle = (props) => {
  return (
      <Typography fontSize={18}>{props.title}</Typography>
  )
}

export default HeaderTitle