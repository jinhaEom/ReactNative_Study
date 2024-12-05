import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import Toast from 'react-native-toast-message'
import AsyncStorage from "@react-native-async-storage/async-storage";

const defaultAlbum = {
  id: 1,
  title: "기본",
};

const ASYNC_KEY = {
  IMAGES: "images",
  ALBUMS: "albums",
}

export const useGallery = () => {
  const [images, setImages] = useState([]);

  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);
  const [albums, setAlbums] = useState([defaultAlbum]);
  const [textInputModelVisible, setTextInputModalVisible] = useState(false);
  const [bigImageModalVisible, setBigImageModalVisible] = useState(false);
  const [albumTitle, setAlbumTitle] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const _setImages = (newImages) => {
    setImages(newImages)
    AsyncStorage.setItem(ASYNC_KEY.IMAGES, JSON.stringify(newImages))
  }
   const _setAlbums = (newAlbums) => {
     setAlbums(newAlbums);
     AsyncStorage.setItem(ASYNC_KEY.ALBUMS, JSON.stringify(newAlbums));
   };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const lastId = images.length === 0 ? 0 : images[images.length - 1].id;
      const newImage = {
        id: lastId + 1,
        uri: result.assets[0].uri,
        albumId: selectedAlbum.id,
      };
      _setImages([...images, newImage]);
    }
  };
  const deleteImage = (imageId) => {
    Alert.alert("이미지를 삭제하시겠습니까?", "", [
      {
        style: "cancel",
        text: "아니오",
      },
      {
        text: "네",
        onPress: () => {
          const newImages = images.filter((image) => image.id !== imageId);
          _setImages(newImages);
        },
      },
    ]);
  };
  const openTextInputModal = () => {
    setTextInputModalVisible(true);
  };
  const closeTextInputModal = () => {
    setTextInputModalVisible(false);
  };
  const openBigImageModal = () => {
    setBigImageModalVisible(true);
  };
  const closeBigImageModal = () => {
    setBigImageModalVisible(false);
  };
  const openDropdown = () => {
    setIsDropdownOpen(true);
  };
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const addAlbum = () => {
    const isDuplicate = albums.some((album) => album.title === albumTitle);
    if (isDuplicate) {
      showAlert();
      return;
    }
    const lastId = albums.length === 0 ? 0 : albums[albums.length - 1].id;
    const newAlbum = {
      id: lastId + 1,
      title: albumTitle,
    };
    _setAlbums([...albums, newAlbum]);
    setSelectedAlbum(newAlbum);
    return true;
  };
  const resetAlbumTitle = () => {
    setAlbumTitle("");
  };
  const showAlert = () => {
    Alert.alert("앨범 이름이 겹칩니다.", "", [
      { text: "확인" },
    ]);
  };
  const filteredImages = images.filter((image) => image.albumId === selectedAlbum.id);
  const imagesWithAddButton = [
    ...filteredImages,
    {
      id: -1,
      uri: "",
    },
    // 이미지 처럼 넣되, id와 uri는 그냥 허수로 넣어주고 추가해줌
  ];
  const selectAlbum = (album) => {
    setSelectedAlbum(album);
  };
  const deleteAlbum = (albumId) => {
    const newAlbums = albums.filter((album) => album.id !== albumId);
    _setAlbums(newAlbums);
  };
  const selectImage = (image) => {
    setSelectedImage(image);
  };
  const moveToPreviousImage = () => {
    const selectedImageIndex = filteredImages.findIndex(image => image.id === selectedImage.id)
    const previousImageIdx = selectedImageIndex - 1
    const previousImage = filteredImages[previousImageIdx];
    if (previousImageIdx < 0) {

      Toast.show({
        type: "error", 
        text1: "Oops!",
        text2: "이전 사진이 없습니다.",
        position: "bottom",
        visibilityTime: 2000, 
        
      });
      return;
    }

    setSelectedImage(previousImage)


  }
  const moveToNextImage = () => {
    const selectedImageIndex = filteredImages.findIndex(image => image.id === selectedImage.id)
    const nextImageIdx = selectedImageIndex + 1
    const nextImage = filteredImages[nextImageIdx];
    setSelectedImage(nextImage)


  };
  const initValues = async () => {
    const imagesFromStorage = await AsyncStorage.getItem(ASYNC_KEY.IMAGES);
    if (imagesFromStorage !== null) {
      _setImages(JSON.parse(imagesFromStorage));
    }
  }
  useEffect(() => {
    initValues();
  }, []);
  return {
    images,
    pickImage,
    deleteImage,
    imagesWithAddButton,
    selectedAlbum,
    openTextInputModal,
    closeTextInputModal,
    textInputModelVisible,
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
    defaultAlbum,
    setSelectedAlbum,
    showAlert,
    openBigImageModal,
    closeBigImageModal,
    bigImageModalVisible,
    selectedImage,
    selectImage,
    moveToPreviousImage,
    moveToNextImage
  };
};
