import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "./color";
import { useState } from "react";

const useBookMarked = (initialIsBookmarked) => {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const toggleIsBookmarked = () => setIsBookmarked(!isBookmarked);

  return { isBookmarked, toggleIsBookmarked}

}

export default ({ isBookmarked: isBookmarkedProp, onPress, style, size ,NEWCOLOR }) => {
  const {isBookmarked , toggleIsBookmarked} = useBookMarked(isBookmarkedProp);
  return (
    <TouchableOpacity onPress={toggleIsBookmarked} style={style}>
      <Ionicons
        name="star"
        size={size}
        color={isBookmarked ? COLOR.YELLOW : NEWCOLOR.GRAY_1_GRAY_4}
      />
    </TouchableOpacity>
  );
};
