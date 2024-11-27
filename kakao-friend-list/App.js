import { StatusBar } from 'expo-status-bar';
import { FlatList, Platform,  StyleSheet, Text, View } from 'react-native';
import  Header  from './src/Header';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import MyProfile from './src/Profile';
import { friendProfiles, myProfile } from './src/data';
import Margin from './src/Margin';
import Division from './src/Division';
import FriendSection from './src/FriendSection';
import FriendList from './src/FriendList';
import { useState } from 'react';
import TabBar from './src/TabBar'
import Profile from './src/Profile';
export default function App() {
  const [isOpend, setIsOpend] = useState(true);
  const [selectedTabIdx, setSelectTabIdx] = useState(0);

  const onPressArrow = () => {
    setIsOpend(!isOpend);
  }
  const ItemSeparatorComponent = () => <Margin height={13} />
  const renderItem=({ item}) => (
          <View>
            <Profile
              uri={item.uri}
              name={item.name}
        introduction={item.introduction}
        isMe={false}
            />
            </View>
  )
  const ListHeaderComponent = () => {
    return (
      <View style={{ backgroundColor: "white" }}>
        <Header />
        <Margin height={10} />
        <Profile
          uri={myProfile.uri}
          name={myProfile.name}
          introduction={myProfile.introduction}
          isMe={true}
        />
        <Margin height={15} />

        <Division />
        <Margin height={12} />
        <FriendSection
          friendProfileLen={friendProfiles.length}
          onPressArrow={onPressArrow}
          isOpend={isOpend}
        />
        <Margin height={5}/>
      </View>
    );
  }
const ListFooterComponent = () => <Margin height = {10}/>


  
  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={isOpend ? friendProfiles : []}
          keyExtractor={(_, index) => index}
          stickyHeaderIndices={[0]}
          contentContainerStyle={{paddingHorizontal : 15}}
          ItemSeparatorComponent={ItemSeparatorComponent}
          renderItem={renderItem}
          ListHeaderComponent={ListHeaderComponent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={ListFooterComponent}
        />
          <TabBar
    selectedTabIdx={selectedTabIdx}
    setSelectedTabIdx={setSelectTabIdx} // 오타 확인!
  />
      </SafeAreaView>
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // marginTop : Platform.OS === 'android' ? 24 : 0,
  },
});
