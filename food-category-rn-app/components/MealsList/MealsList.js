import { View, FlatList, StyleSheet } from "react-native";
import MealItem from "../MealsList/MealItem";

function MealsList({items}) {
  function renderMealItem(itemData) {
    const item = itemData.item;

    const mealItempProps = {
      id: item.id,
      title: item.title,
      imageUrl: itemData.item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
    };
    return <MealItem {...mealItempProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      ></FlatList>
    </View>
  );
}
export default MealsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
