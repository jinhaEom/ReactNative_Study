import {
  View,
  Text,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { Header } from "../Header/Header";
import React, { useCallback, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Spacer from "../components/Spacer";
import SingleLineInput from "../components/SingleLineInput";
import Button from "../components/Button";
import { Typography } from "../components/Typography";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSetRecoilState } from "recoil";
import { atomLinkList } from "../states/atomLinkList";
import { getOpenGraphData } from "../utils/OpenGraphTagUtils";
import { RemoteImage } from "../components/RemoteImage";
import { getClipboardString } from "../states/ClipboardUtils";
import Icon from "../components/Icon";

const AddLinkScreen = () => {
  const navigation = useNavigation();
  const [url, setUrl] = useState("");
  const safeAreaInset = useSafeAreaInsets();
  const updateList = useSetRecoilState(atomLinkList);
  const [metaData, setMetaData] = useState(null);
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, []);

  const onPressSave = useCallback(() => {
    if (url === "") return;
    updateList((prevState) => {
      const list = [
        {
          title: metaData.title,
          image: metaData.image,
          link: url,
          createdAt: new Date().toISOString(),
        },
      ];
      return {
        list: list.concat(prevState.list),
      };
    });
    setUrl("");
  }, [url, updateList]);
  const onSubmitEditing = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getOpenGraphData(url);
      console.log("OpenGraph Result:", result);
      setMetaData(result);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch OpenGraph data:", error);
      setMetaData(null);
      setLoading(false);
    }
  }, [url]);

  const onGetClipboardString = useCallback(async () => {
    const result = await getClipboardString();
    if (result.startsWith("http://") || result.startsWith("https://")) {
      setUrl(result);
      const ogResult = await getOpenGraphData(result);
      setMetaData({
        title: ogResult.title,
        description: ogResult.description,
        image: ogResult.image,
      });
    }
  }, []);
  useEffect(() => {
    onGetClipboardString();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Spacer space={12} />
          <Header.Title title="ADD LINK" />
        </Header.Group>
        <Header.Icon iconName="close" onPress={onPressClose} />
      </Header>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          paddingTop: 32,
          paddingHorizontal: 24,
        }}
      >
        <View>
          <SingleLineInput
            value={url}
            onChangeText={setUrl}
            placeholder="https://www.example.com"
            onSubmitEditing={() => { g
              console.log("Input Submitted");
              onSubmitEditing();
            }}
          />
          <View
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              top: 0,
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onPress={() => {
                setUrl("");
                setMetaData(null);
              }}
            >
              <Icon name="close" size={24} color="black" />
            </Button>
          </View>
        </View>

        {loading ? (
          <>
            <Spacer space={20} />
            <View
              style={{ borderWidth: 1, borderRadius: 4, borderColor: "gray" }}
            >
              <Spacer space={(width - 48) * 0.5} />
              <Spacer space={50} />
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ActivityIndicator />
              </View>
            </View>
          </>
        ) : (
          metaData !== null && (
            <>
              <Spacer space={20} />
              <View
                style={{ borderWidth: 1, borderRadius: 4, borderColor: "gray" }}
              >
                <RemoteImage
                  url={metaData.image}
                  width={width - 48}
                  height={(width - 48) * 0.5}
                />
                <View style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
                  <Spacer space={10} />
                  <Typography fontSize={20} color="black">
                    {metaData.title}
                  </Typography>
                  <Spacer space={4} />
                  <Typography fontSize={16} color="gray">
                    {metaData.description}
                  </Typography>
                </View>
              </View>
            </>
          )
        )}
      </View>
      <Button onPress={onPressSave} disabled={url === ""}>
        <View style={{ backgroundColor: url === "" ? "gray" : "black" }}>
          <View
            style={{
              height: 52,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography fontSize={16} color="white">
              저장하기
            </Typography>
          </View>
          <Spacer space={safeAreaInset.bottom} />
        </View>
      </Button>
    </View>
  );
};

export default AddLinkScreen;
