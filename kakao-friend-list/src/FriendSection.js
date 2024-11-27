import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'

export default (props) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ color: "grey" }}>친구 {props.friendProfileLen}</Text>
        <TouchableOpacity onPress={props.onPressArrow}>
          <MaterialIcons
            name={props.isOpend ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color="light-gray"
          />
        </TouchableOpacity>
      </View>
    );
}