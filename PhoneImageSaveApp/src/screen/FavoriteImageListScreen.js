import { View, Text, FlatList } from "react-native";
import React from "react";
import { Typography } from "../components/Typography";
import { useSelector } from "react-redux";
import PhotoListItem from "../components/PhotoListItem";
import { Header } from "../../Header/Header";
const FavoriteImageListScreen = (props) => {
  const imageList = useSelector((state) => state.favorite.favoriteList);


  return (
    <View style= {{flex:1, alignItems:'center'}}>
      <Header>
        <Header.Title title='FAVORITE'> </Header.Title>
      </Header>
      <FlatList style={{ flex: 1 }} data={imageList} renderItem={({ item }) => {
        return (
          <PhotoListItem url={item} />
        )
      }}/>
    </View>
  )
};

export default FavoriteImageListScreen;
