import MealItem from "../components/MealItem";
import { useLayoutEffect } from "react";
import { MEALS ,CATEGORIES} from "../data/dummy-data";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { useEffect } from "react";
function MealsOverviewScreen({ route, navigation }) {

  const catId = route.params.categoryId;
  const disPlayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0; 
  });

  useLayoutEffect(() => { 
  const categoryTitle = CATEGORIES.find(
    (category) => category.id === catId
  ).title;

  navigation.setOptions({
    title: categoryTitle,
  });

  },[catId, navigation])


  function renderMealItem(itemData) {
    const item = itemData.item;

    const mealItempProps = {
      id : item.id,
      title: item.title,
      imageUrl: itemData.item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
    };
    return (
      <MealItem {...mealItempProps}/>
    )
  }
 
 
    return (
      <View style={styles.container}>
        <FlatList data={disPlayedMeals} keyExtractor={(item) => item.id} renderItem={renderMealItem}></FlatList>
      </View>
    );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
