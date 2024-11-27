import { View, Text, StyleSheet} from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

const IconButton = (props) => {
    return (
        <View style={{paddingHorizontal : 6}}>
            <Ionicons name={props.name} size={24} color="black"/>
        </View>
    )
}
const Header = () => {
    return (
      <View
            style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 10,
          backgroundColor : 'white'
        }}
      >
        <Text style={styles.title}>친구</Text>
        <View style={styles.headerContainer}>
          <IconButton name="search-outline" />
          <IconButton name="person-add-outline" />
          <IconButton name="musical-notes-outline" />
          <IconButton name="settings-outline" />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection : 'row',
    },
    title: {
        fontSize: 22,
        fontWeight : 'bold'
    }
})

export default Header