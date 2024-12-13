import React, { useState } from "react";
import { Header } from "../../Header/Header";
import { Dimensions, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { FlatList } from "react-native-gesture-handler";
import { RemoteImage } from "../components/RemoteImage";
import { Spacer } from "../components/Spacer";
import { Typography } from "../components/Typography";
export const DiaryListScreen = () => {
  const navigation = useNavigation();
  const safeAreaInsets = useSafeAreaInsets();
  const onPressSetting = useCallback(() => {
    navigation.navigate("Settings");
  }, []);

  const onPressAdd = useCallback(() => {
    navigation.navigate("AddDiary");
  }, []);
  const width = Dimensions.get("window").width;
  const [data, setData] = useState([
    {
      id: 0,
      title: "TITIE_01",
      content: "CONTENT_01",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
      imageUrl:
        "https://docs.expo.dev/static/images/tutorial/background-image.png",
    },
    {
      id: 1,
      title: "TITIE_02",
      content: "CONTENT_02",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
      imageUrl:
        "https://docs.expo.dev/static/images/tutorial/background-image.png",
    },
    {
      id: 2,
      title: "TITIE_03",
      content: "CONTENT_03",
      createdAt: "2024-01-01",
      updatedAt: "2024-01-01",
      imageUrl:
        "https://docs.expo.dev/static/images/tutorial/background-image.png",
    },
  ]);
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header>
          <Header.Group>
            <Header.Title title="DIARY LIST" />
          </Header.Group>
          <Header.Icon iconName="settings" onPress={onPressSetting} />
        </Header>
        <FlatList
                  data={data}
                  contentContainerStyle={{paddingHorizontal : 24, paddingVertical: 32}}
          renderItem={({ item }) => (
            <Button
              onPress={() => navigation.navigate("DiaryDetail", { item })}
            >
              <View style={{ paddingVertical: 12 }}>
                {item.imageUrl !== null && (
                  <>
                    <RemoteImage
                      url={item.imageUrl}
                      width={width - 24 * 2}
                      height={(width - 24 * 2) * 0.5}
                      style={{borderRadius: 8}}
                    />
                    <Spacer space={4}/>
                  </>
                )}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View>
                    <Typography fontSize={18}>{item.title}</Typography>
                    <Spacer space={4}/>
                    <Typography fontSize={14}>{item.content}</Typography>
                  </View>
                  <View>
                    <Typography fontSize={14}>{item.updatedAt}</Typography>
                  </View>
                </View>
              </View>
            </Button>
          )}
        />
      </View>
      <View
        style={{
          position: "absolute",
          right: 12,
          bottom: safeAreaInsets.bottom + 24,
        }}
      >
        <Button onPress={onPressAdd}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "black",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="add" color="white" size={30} />
          </View>
        </Button>
      </View>
    </View>
  );
};
