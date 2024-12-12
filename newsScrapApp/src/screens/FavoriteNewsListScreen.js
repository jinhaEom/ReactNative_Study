import React, { useCallback, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { Header } from "../Header/Header";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { Typography } from "../components/Typography";
import { clippedTabFocus } from "../actions/news";
import { useDispatch } from "react-redux";
export const FavoriteNewsListScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
  const data = useSelector((state) => state.news.favoriteNews);
  const onPressItem = useCallback((newsItem) => {
    navigation.navigate("NewsDetailScreen", { newsItem });
  }, []);
    
    const isFocused = useIsFocused();
    useEffect(() => {
        if(isFocused) {
            dispatch(clippedTabFocus())
        }
    }, [isFocused])
    const ListEmptyComponent = () => {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: 24, fontWeight: "bold",alignSelf: "center"}}>좋아요한 뉴스가 없습니다.</Text>
            </View>
        )
    }
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="Favorite News List" />
      </Header>
      <FlatList
        style={{ flex: 1 }}
              data={data}
              ListEmptyComponent={ListEmptyComponent}
        renderItem={({ item }) => {
          return (
            <Button onPress={() => onPressItem(item)}>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                }}>
                     
                <Typography fontSize={24} numberOfLines={1}>
                    {item.title}
                </Typography>
                <Typography fontSize={16} numberOfLines={2} color="gray">
                  {item.description}
                </Typography>
              </View>
            </Button>
          );
        }}
      />
    </View>
  );
};
