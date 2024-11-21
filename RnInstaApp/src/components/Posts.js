import { View, Text } from 'react-native'
import React from 'react'
import PostItem from './PostItem';

const postInfo = [
  {
    postTitle: 'John',
    postPersonImage: require('../../assets/images/userProfile.jpeg'),
    postImage: require('../../assets/images/post1.jpeg'),
    likes: 753,
    isLiked: false,
  },
  {
    postTitle: 'Jinha',
    postPersonImage: require('../../assets/images/profile5.jpeg'),
    postImage: require('../../assets/images/post2.jpeg'),
    likes: 345,
    isLiked: false,
  },
  {
    postTitle: 'John',
    postPersonImage: require('../../assets/images/profile4.jpeg'),
    postImage: require('../../assets/images/post3.jpeg'),
    likes: 32,
    isLiked: true,
  },
  {
    postTitle: 'John',
    postPersonImage: require('../../assets/images/profile3.jpeg'),
    postImage: require('../../assets/images/post4.jpeg'),
    likes: 753,
    isLiked: false,
  },
];
const Posts = () => {
  return (
    <View>
      {postInfo.map((data, index) => {
        return (
          <PostItem data={data} key={index} />
        );
      })}
    </View>
  )
}

export default Posts