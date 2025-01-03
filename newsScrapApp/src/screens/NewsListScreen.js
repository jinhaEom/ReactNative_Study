import React, { useCallback, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Header } from "../Header/Header";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button";
import { Typography } from "../components/Typography";
import { getNewsList } from "../actions/news";
import SingleLineInput from "../components/SingleLineInput";
import { useNavigation } from "@react-navigation/native";
export const NewsListScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const onSubmitEditing = useCallback(() => {
    if (query === "") {
      return;
    }
    dispatch(getNewsList(query));
  }, [query]);

  const newsList = useSelector((state) => state.news.newsList);
  const onPressListItem = useCallback((newsItem) => {
    navigation.navigate("NewsDetailScreen", { newsItem });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="News List" />
      </Header>
      <View style={{ flex: 1 }}>
        <View style={{ paddingVertical: 12, paddingHorizontal: 24 }}>
          <SingleLineInput
            value={query}
            onChangeText={setQuery}
            placeholder="뉴스 검색어를 입력하세요"
            onSubmitEditing={onSubmitEditing}
          />
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={newsList}
          renderItem={({ item }) => {
              return (
                <Button onPress={() => onPressListItem(item)}>
                  <View
                    style={{
                      flex: 1,
                      paddingHorizontal: 20,
                      paddingVertical: 8,
                    }}
                  >
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
    </View>
  );
};
