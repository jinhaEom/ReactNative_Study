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
import Toast from "react-native-toast-message";

import * as ImagePicker from "expo-image-picker";
import { useGallery } from "./src/use-gallery";
import MyDropDownPicker from "./src/MyDropDownPicker";
import TextInputModal from "./src/TextInputModal";
import BigImageModal from "./src/BigImageModal";

const width = Dimensions.get("screen").width;
const columnSize = width / 3;
export default function App() {
  const {
    pickImage,
    deleteImage,
    imagesWithAddButton,
    selectedAlbum,
    openTextInputModal,
    textInputModelVisible,
    closeTextInputModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isDropdownOpen,
    openDropdown,
    closeDropdown,
    albums,
    selectAlbum,
    deleteAlbum,
    setSelectedAlbum,
    defaultAlbum,
    showAlert,
    openBigImageModal,
    closeBigImageModal,
    bigImageModalVisible,
    selectedImage,
    selectImage,
    moveToPreviousImage,
    moveToNextImage,
  } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  };
  const onLongPressImage = (imageId) => deleteImage(imageId);
  const onPressAddAlbum = () => {
    openTextInputModal();
  };
  const onSubmitEditing = () => {
    if (!albumTitle) return;
    const isSuccess = addAlbum();
    if (isSuccess) {
      closeTextInputModal();
      resetAlbumTitle();
    }
  };
  const onPressTextInputModalBackdrop = () => {
    closeTextInputModal();
    resetAlbumTitle();
  };
    const onPressBigImgModalBackdrop = () => {
      closeBigImageModal();
    };
  const onPressHeader = () => {
    if (isDropdownOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };
  const onPressAlbum = (album) => {
    selectAlbum(album);
    closeDropdown();
  };
  const onPressDeleteAlbum = (albumId) => {
    if (albumId === selectedAlbum.id) {
      setSelectedAlbum(albumId === 1 ? defaultAlbum : albums[0]);
    }
    deleteAlbum(albumId);
  };
  const onPressImage = (image) => {
    selectImage(image);
    openBigImageModal(image);

  };
  const onPressLeftArrow = () => {
    moveToPreviousImage();

  }
  const onPressRightArrow = () => {
    moveToNextImage();
  }
  const renderItem = ({ item: image, index }) => {
    const { id, uri } = image;
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
            zIndex: 2
          }}
        >
          <Text style={{ fontWeight: "100", fontSize: 45 }}>+</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={() => onPressImage(image)} onLongPress={() => onLongPressImage(id)}>
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
        selectedAlbum={selectedAlbum}
        onPressHeader={onPressHeader}
        onPressAddAlbum={onPressAddAlbum}
        isDropdownOpen={isDropdownOpen}
        albums={albums}
        onPressAlbum={onPressAlbum}
        onPressDeleteAlbum={onPressDeleteAlbum}
        defaultAlbum={defaultAlbum}
      />
      {/** 앨범을 추가하는 TextInputModal */}
      <TextInputModal
        textInputModelVisible={textInputModelVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={onPressTextInputModalBackdrop}
        showAlert={showAlert}
      />
      {/** 이미지 리스트 */}
      <BigImageModal
        modalVisible={bigImageModalVisible}
        onPressBackdrop={onPressBigImgModalBackdrop}
        selectedImage={selectedImage}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
      />
      <FlatList
        numColumns={3}
        data={imagesWithAddButton}
        renderItem={renderItem}
        style={{ zIndex: 1 }}
      />
      <Toast/>
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
