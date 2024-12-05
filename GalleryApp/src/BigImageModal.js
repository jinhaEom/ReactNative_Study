import { Modal, Pressable, View, Image, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";

const ArrowButton = ({iconName, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        justifyContent: "center",
        paddingHorizontal: 20,
        height: "100%",
      }}
    >
      <AntDesign
        name={iconName}
        size={24}
        style={{ flexDirection: "row", alignItems: "center" }}
      />
    </TouchableOpacity>
  );
}

export default ({ modalVisible, onPressBackdrop, selectedImage, onPressLeftArrow, onPressRightArrow }) => {
  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <Pressable
        // onPress={onPressBackdrop}
        style={{
          flex: 1,
          backgroundColor: "rgba(115,115,115,0.8)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ArrowButton iconName="left" onPress={onPressLeftArrow} />

          <Pressable>
            <Image
              source={{ uri: selectedImage?.uri }}
              style={{ width: 280, height: 280, backgroundColor: "white" }}
              resizeMode="contain"
            />
          </Pressable>
          <ArrowButton iconName="right" onPress={onPressRightArrow} />
        </View>
      </Pressable>

      <Ionicons
        name="close-outline"
        size={24}
        color="white"
        style={{ position: "absolute", top: 40, right: 40 }}
        onPress={onPressBackdrop}
      />
    </Modal>
  );
};
