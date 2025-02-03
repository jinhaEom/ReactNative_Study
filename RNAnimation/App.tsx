import React from 'react';
import {SafeAreaView} from 'react-native';
import LayoutAnimationPageHeader from './src/Chapter4/LayoutAnimationPageHeader';
import LayoutAnimationCollapse from './src/Chapter4/LayoutAnimationCollapse';
function App(): React.JSX.Element {
  return (
    <LayoutAnimationCollapse/>
    // <SafeAreaView style={{flex: 1}}>
    //      <SnackBar />
    // </SafeAreaView>
  );
}

export default App;

/**
 * Animated와 쓸수 있는 Component
 * Animated.Text
 * Animate.View
 * Animated.Image
 * Animated.ScrollView
 * Animated.FlatList
 * Animated.SectionList
 */
