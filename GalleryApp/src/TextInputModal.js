import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
export default ({
  textInputModelVisible,
  albumTitle,
  setAlbumTitle,
  onSubmitEditing,
  onPressBackdrop,
}) => {
  return (
    <Modal
      animationType="slide"
      visible={textInputModelVisible}
      transparent={true}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Pressable onPress={onPressBackdrop} style={{ flex: 1 }}>
          <SafeAreaView
            style={{ position: "absolute", bottom: 0, width: "100%" }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <TextInput
                placeholder="앨범명을 입력해주세요."
                value={albumTitle}
                onChangeText={setAlbumTitle}
                onSubmitEditing={onSubmitEditing}
                style={{
                  flex: 1,
                  padding: 10,
                  borderWidth: 0.5,
                  borderColor: "lightgray",
                }}
                autoFocus={true}
              />
              <TouchableOpacity onPress={onSubmitEditing}>
                <Ionicons
                  name="enter-outline"
                  size={24}
                  color="black"
                  style={{ padding: 10 }}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};
