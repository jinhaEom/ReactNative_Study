import { View, Text, TouchableOpacity, Touchable, Platform } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
const headerHeight = 50;
export default ({
  selectedAlbumTitle,
  onPressHeader,
  onPressAddAlbum,
  isDropdownOpen,
  albums,
  onPressAlbum,
  onPressDeleteAlbum,
  selectedAlbum,
  defaultAlbum,
  setSelectedAlbum,
}) => {
  return (
    <View
      style={{
        zIndex: 2, 
        elevation: Platform.OS === "android" ? 5 : 0,
        position: "relative", 
      }}
    >
      {" "}
      <TouchableOpacity
        onPress={onPressHeader}
        activeOpacity={1}
        style={{
          height: headerHeight,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{selectedAlbum.title}</Text>
        <SimpleLineIcons
          name={isDropdownOpen ? "arrow-up" : "arrow-down"}
          size={12}
          color="black"
          style={{ marginLeft: 8 }}
        />
        <TouchableOpacity
          onPress={onPressAddAlbum}
          style={{
            position: "absolute",
            right: 0,
            height: headerHeight,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ fontSize: 12 }}>앨범 추가</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View
          style={{
            borderTopColor: "lightgrey",
            borderTopWidth: 0.5,
            borderBottomColor: "lightgrey",
            borderBottomWidth: 0.7,
            position: "absolute",
            top: headerHeight,
            borderColor: "gray",
            width: "100%",
          }}
        >
          {albums.map((album, index) => {
            const isSelectedAlbum = album.id === selectedAlbum.id;
            return (
              <TouchableOpacity
                style={{
                  paddingVertical: 12,
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor: "#FFFFFF",
                  alignItems: "center",
                }}
                onPress={() => onPressAlbum(album)}
                key={`album-${index}`}
              >
                <Text
                  style={{
                    fontWeight: isSelectedAlbum ? "bold" : undefined,
                  }}
                >
                  {album.title}
                </Text>
                <TouchableOpacity
                  onPress={() => onPressDeleteAlbum(album.id)}
                  style={{ position: "absolute", right: 10 }}
                >
                  <Ionicons
                    name={album.title === "기본" ? undefined : "close"}
                    size={20}
                    color="black"
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};
