import React from 'react';
import {
  View,
  Text,
  LayoutAnimation,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import {collapseData} from '../utils/data';
import {useState} from 'react';
const LayoutAnimationCollapse: React.FC = () => {
    const [isOpen, setIsOpen] = useState<number | null>(null);
    const onPress = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsOpen(index === isOpen ? null : index);
    };
  return (
    <SafeAreaView>
      {collapseData.map((item, index) => {
        return (
          <View key={index}>
            <TouchableWithoutFeedback onPress={()=> onPress(index)}>
            <View style={{backgroundColor:'#006aff',padding : 20, borderBottomWidth : 1, borderBottomColor:'#428df5'}}>
            <Text style={{color:'white',fontSize:14}}>{index + 1}.{item.q}</Text>
            </View>

            </TouchableWithoutFeedback>
            {isOpen === index && (
            <View style={{backgroundColor:'#f4f4f4', padding : 20, paddingLeft : 40, borderBottomColor:'#ddd', borderBottomWidth : 1}}>
            <Text style={{fontSize:14}}>{item.a}</Text>
            </View>
            )}
          </View>
        );
      })}
    </SafeAreaView>
  );
};

export default LayoutAnimationCollapse;
