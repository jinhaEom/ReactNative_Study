import React from "react";
import { View, Text, Button } from "react-native";

function Home({ navigation }) {
  return (
    <View>
      <Text>Home!</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate("Logins")}
      />
    </View>
  );
}

export default Home;