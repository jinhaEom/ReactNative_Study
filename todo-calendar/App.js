import {FlatList,SafeAreaView,StyleSheet,Text,View,Image,KeyboardAvoidingView,Platform,Keyboard,Pressable,Alert,} from "react-native";
import { getCalendarColumns, ITEM_WIDTH } from "./src/util";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useCalendar } from "./src/hook/use-calendar";
import useTodoList from "./src/use-todo-list";
import Calendar from "./src/Calendar";
import Ionicons from "@expo/vector-icons/Ionicons";
import Margin from "./src/Margin";
import AddTodoInput from "./src/AddTodoInput";

export default function App() {
  const now = dayjs();
  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subract1Month,
    add1Month,
  } = useCalendar(now);
  const {
    todoList,
    filteredTodoList,
    addTodo,
    removeTodo,
    toggleTodo,
    input,
    setInput,
    resetInput,
  } = useTodoList(selectedDate);

  const columns = getCalendarColumns(selectedDate);
  const flatListRef = useRef(null);

  const onPressLeftArrow = subract1Month;
  const onPressRightArrow = add1Month;
  const onPressHeaderDate = showDatePicker;
  const onPressDate = setSelectedDate;

  const ListHeaderComponent = () => {
    return (
      <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
        <Calendar
          columns={columns}
          selectedDate={selectedDate}
          onPressLeftArrow={onPressLeftArrow}
          onPressRightArrow={onPressRightArrow}
          onPressHeaderDate={onPressHeaderDate}
          onPressDate={onPressDate}
          todoList={todoList}
        />
        <Margin height={15} />

        <View
          style={{
            width: 4,
            height: 4,
            borderRadius: 10 / 2,
            backgroundColor: "#a3a3a3",
          }}
        />
        <Margin height={15} />
      </View>
    );
  };
  const renderItem = ({ item: todo }) => {
    const isSuccess = todo.isSuccess;
    const onPress = () => toggleTodo(todo.id);
    const onLongPress = () => {
      Alert.alert("삭제하시겠어요?", "", [
        {
          style: "cancel",
          text: "아니오",
        },
        {
          text: "네",
          onPress: () => removeTodo(todo.id),
        },
      ]);
    };
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={{
          width: ITEM_WIDTH,
          alignSelf: "center",
          paddingVertical: 10,
          flexDirection: "row",
          paddingHorizontal: 5,
          borderBottomWidth: 0.2,
          borderBottomColor: "#a6a6a6",
        }}
      >
        <Text style={{ flex: 1, fontSize: 14, color: "#595959" }}>
          {todo.content}
        </Text>
        <Ionicons
          name="checkmark"
          size={17}
          color={isSuccess ? "#595959" : "#bfbfbf"}
        />
      </Pressable>
    );
  };
  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 300);
  };
  const onPressAdd = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  };
  const onSubmitEditing = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  };
  const onFocus = () => {
    scrollToEnd();
  };
  useEffect(() => {
    console.log(
      "changed selectedDate",
      dayjs(selectedDate).format("YYYY-MM-DD")
    );
  }, [selectedDate]);

  return (
    <Pressable
      style={{ width: "100%", height: "100%" }}
      onPress={Keyboard.dismiss}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Image
          source={{
            uri: "https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c",
          }}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={{ flex: 1, alignItems: "center" }}>
          <SafeAreaView style={{ flex: 1 }}>
            <FlatList
              ref={flatListRef}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              data={filteredTodoList}
              renderItem={renderItem}
              ListHeaderComponent={ListHeaderComponent}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            />
          </SafeAreaView>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              paddingHorizontal: 10,
              marginBottom: Platform.OS === "ios" ? 24 : 0,
              paddingVertical: 10,
            }}
          >
            <AddTodoInput
              value={input}
              onChangeText={setInput}
              onPressAdd={onPressAdd}
              placeholder={`${dayjs(selectedDate).format(
                "MM.D"
              )}에 추가할 TODO`}
              onSubmitEditing={onSubmitEditing}
              blurOnSubmit={false}
              onFocus={onFocus}
            />
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
});
