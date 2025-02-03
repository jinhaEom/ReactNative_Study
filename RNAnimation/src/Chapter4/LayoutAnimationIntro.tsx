import React, {useState} from 'react';
import {View, Text, Button, LayoutAnimation, Platform, UIManager} from 'react-native';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
//useState update, create, delete -> LayoutAnimation what, how??
const LayoutAnimationIntro: React.FC = () => {
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(true);
  const onButtonPress = () => {
    // LayoutAnimation.configureNext(
    // {duration : 300,
    //     // type : easeIm . spring, linear
    //     // property : opacity,  scaleX, scaleY, scaleXY
    //     create: { type : 'easeIn', property:'opacity'},
    //     update: {type:'spring',property:'scaleX',springDamping:0.3},
    //     delete: {type:'linear',property:'scaleXY'},
    // },
    // () => console.log('end'),
    // () => console.log('fail')
    // );
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
   setCount(value => value * 10);
   setShow(value => !value);
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button title="layout Animatino 작동" onPress={onButtonPress}/>
        <View style={{width : 250, height : 250}}>
      <View style={{backgroundColor: 'orange'}}>
        <Text style={{fontSize:50}}>{count}</Text>
      </View>
      {show && (
        <View style={{backgroundColor: 'green', marginTop: 10}}>
          <Text style={{fontSize: 30}}>보이는 컴포넌트</Text>
        </View>
      )}
      </View>
    </View>
  );
};

export default LayoutAnimationIntro;
