import { View, Text, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActivityPrevious from '../components/Activity/ActivityPrevious';
import ActivityRecommend from '../components/Activity/ActivityRecommend';
import ActivityThisWeek from '../components/Activity/ActivityThisWeek';
import { FriendsProfileData } from '../components/Database';

const Activity = () => {
  return (
    <SafeAreaView style={{width: '100%', backgroundColor: 'white'}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          borderBottomWidth: 0.5,
          borderBottomColor: '#DEDEDE',
          padding: 10,
        }}>
        활동
      </Text>
      <ScrollView style={{margin: 10}}>
        <ActivityThisWeek />

        <Text style={{fontWeight: 'bold', paddingVertical: 10}}>이전 활동</Text>

          {FriendsProfileData.slice(3, 6).map((data, index) => (
            <ActivityPrevious data={data} key={index} />
          ))}
        <Text style={{fontWeight: 'bold', paddingVertical: 10}}>
          회원님을 위한 추천
        </Text>
        {FriendsProfileData.slice(6, 12).map((data, index) => (
          <ActivityRecommend data={data} key={index} />
        ))}

        <Text style={{fontWeight: 'bold'}}>이전 활동</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Activity