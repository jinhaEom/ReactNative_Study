import React from 'react';
import {SafeAreaView} from 'react-native';
import SnackBar from './src/Chapter3/SnackBar';
import DrawerMenu from './src/Chapter3/DrawerMenu';
import Collapse from './src/Chapter3/Collapse';
import ProgressBar from './src/Chapter3/ProgressBar';
import Skeleton from './src/Chapter3/Skeleton';
import SnowAnimation from './src/Chapter3/SnowAnimation';
function App(): React.JSX.Element {
  return (
    <SnowAnimation/>
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
