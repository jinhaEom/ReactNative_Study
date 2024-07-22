import { useState } from "react";

import { StyleSheet, View, TextInput, Button, Modal, Image } from "react-native";

function GoalInput(props) { 
    const [enteredGoalText, setEnteredGoalText] = useState("");

     function goalInputHandler(enteredText) {
       setEnteredGoalText(enteredText);
     }
    function addGoalHandler() {
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText('');
    }
  console.log(enteredGoalText);
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image
          style={styles.image}
          
          source={require("../assets/images/goal.png")}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Your Course Goal!"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} color="#f31282" />
          </View>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={addGoalHandler} color="#b180f0" />
          </View>
        </View>
      </View>
    </Modal>
  );

}; 
const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor : "#311b6b",
    padding : 16, 
 
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "100%",
    backgroundColor: '#e4d0ff',
    color: '#120438',
    borderRadius : 6,
    padding: 16,
  },
  buttonContainer: {
    marginTop : 16,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    margin : 20
  },  
  button: {
    width: '30%',
    marginHorizontal: 8,
  }
});

export default GoalInput;