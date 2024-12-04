import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

const defaultAlbum = {
    id: 1,
    title : '기본',
}

export const useGallery = () => {
    const [images, setImages] = useState([]); 
    
    const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);
    const [albums, setAlbums] = useState([defaultAlbum]);

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
      };
      setImages([...images, newImage]);
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
          setImages(newImages);
        },
      },
    ]);
  };
  const imagesWithAddButton = [
    ...images ,
    {
      id: -1,
      uri: "",
    },
    // 이미지 처럼 넣되, id와 uri는 그냥 허수로 넣어주고 추가해줌
  ];
  return {
    images,
    pickImage,
    deleteImage,
      imagesWithAddButton,
    selectedAlbum
  };
};
