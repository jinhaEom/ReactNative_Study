import {
  StyleSheet,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  Platform,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useGallery } from "./src/use-gallery";
import MyDropDownPicker from "./src/MyDropDownPicker";
import TextInputModal from "./src/TextInputModal";

const width = Dimensions.get("screen").width;
const columnSize = width / 3;
export default function App() {
  const { pickImage, deleteImage, imagesWithAddButton, selectedAlbum } =
    useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  };
  const onLongPressImage = (imageId) => deleteImage(imageId);
  const onPressAlbum = () => {};

  const renderItem = ({ item: { id, uri }, index }) => {
    if (id === -1) {
      return (
        <TouchableOpacity
          onPress={onPressOpenGallery}
          style={{
            width: columnSize,
            height: columnSize,
            backgroundColor: "lightgrey",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "100", fontSize: 45 }}>+</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onLongPress={() => onLongPressImage(id)}>
        <Image
          source={{ uri }}
          style={{ width: columnSize, height: columnSize }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/** 앨범 DropDown , 앨범 추가 버튼 */}
      <MyDropDownPicker
        selectedAlbumTitle={selectedAlbum.title}
        onPressAddAlbum={onPressAlbum} />
      {/** 앨범을 추가하는 TextInputModal */}
      <TextInputModal />
      {/** 이미지 리스트 */}
      <FlatList
        numColumns={3}
        data={imagesWithAddButton}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    marginTop: Platform.OS === "android" ? 30 : 0,
  },
});
