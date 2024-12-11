import React, { useCallback } from "react";
import { Typography } from "../components/Typography";
import { useNavigation } from "@react-navigation/native";
import { Header } from "../Header/Header";
import Spacer from "../components/Spacer";
import Button from "../components/Button";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from "../components/Icon";
import { useRecoilValue } from "recoil";
import { atomLinkList } from "../states/atomLinkList";


const LinkListScreen = () => {
    const navigation = useNavigation();
    const safeAreaInset = useSafeAreaInsets();
    const data = useRecoilValue(atomLinkList);

  const onPressListItem = useCallback((item) => {
    navigation.navigate("LinkDetailScreen", {item});
  }, []);

  const onPressAddButton = useCallback(() => {
    navigation.navigate("AddLinkScreen");
  }, []);

  return (
      <View style={{ flex: 1 }}>
          <Header>
              <Header.Group>
                  <Header.Title title="Link List"/>
              </Header.Group>
          </Header>
          <FlatList style={{ flex: 1 }} data={data.list} renderItem={({ item }) => {
              return (
                  <Button onPress={() => onPressListItem(item)} paddingHorizontal={24} paddingVertical={12}>
                  <View>
                    <Typography fontSize={20}>{item.link}</Typography>
                    <Spacer space={4} />
                    <Typography fontSize={16} color="gray">
                      {item.title !== "" ? `${item.title.slice(0, 20)} | ` : ""}
                      {new Date(item.createdAt).toLocaleString()}
                    </Typography>
                  </View>
                </Button>
              );
          }}/>
         
          <View style={{ position: 'absolute', right: 24, bottom: 24 + safeAreaInset.bottom }}>
              <Button onPress={onPressAddButton}>
                  <View style={{ width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
                      <Icon name="add" size={24} color='white'/>
                  </View>
              </Button>
              
          </View>
   </View>
  );
};

export default LinkListScreen;
