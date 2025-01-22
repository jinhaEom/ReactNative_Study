import React from 'react';
import {SafeAreaView} from 'react-native';
import AnimatedComponents from './src/Chapter2/AnimatedComponents';
import AnimatedValue from './src/Chapter2/AnimatedValue';
import AnimatedTiming from './src/Chapter2/AnimatedTiming';
import AnimatedSpring from './src/Chapter2/AnimatedSpring';
import AnimatedDecay from './src/Chapter2/AnimatedDecay';
import AnimatedComposing from './src/Chapter2/AnimatedComposing'
import AnimatedOtherMethod from './src/Chapter2/AnimatedOtherMethod'
import AnimatedProperty from './src/Chapter2/AnimatedProperty'
function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <AnimatedProperty />
    </SafeAreaView>
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
