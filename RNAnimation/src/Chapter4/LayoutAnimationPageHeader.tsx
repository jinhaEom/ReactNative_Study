import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  LayoutAnimation,
  StatusBar,
  SafeAreaView,
  Platform,
  UIManager,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
const LayoutAnimationPageHeader: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const heightAnim = useRef(new Animated.Value(200)).current;

  const onScroll = (e: any) => {
    const y = e.nativeEvent.contentOffset.y;
    
    if (y > 10 && expanded) {
      setExpanded(false);
      Animated.timing(heightAnim, {
        toValue: 80,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else if (y <= 10 && !expanded) {
      setExpanded(true);
      Animated.timing(heightAnim, {
        toValue: 350,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <ScrollView
        contentContainerStyle={{height: 1000}}
        onScroll={onScroll}
        scrollEventThrottle={16}>
        <Animated.View
          style={{
            backgroundColor: '#333',
            height: heightAnim,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {expanded ? (
            <View style={{backgroundColor: '#333'}}>
              <SafeAreaView style={{flexDirection: 'row'}}>
                <View
                  style={{
                    backgroundColor: '#222',
                    marginLeft: 20,
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                    marginBottom: -20,
                  }}>
                  <Icon name="person" size={30} color="#333" />
                </View>
                <View>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      marginBottom: 2,
                      marginTop: 4,
                    }}>
                    개발자 JH
                  </Text>
                  <Text style={{color: 'white', fontSize: 13, marginBottom: 4}}>
                    리액트네이티브는 재밌어
                  </Text>
                </View>
              </SafeAreaView>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: '#333',
                height: 350,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  position: 'absolute',
                  bottom: -100,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#222',
                    width: 160,
                    height: 160,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name="person" size={100} color="#333" />
                </View>
                <Text style={{fontSize: 20, marginTop: 30}}>
                  큰 프로필 이미지
                </Text>
                <Text style={{fontSize: 14, marginTop: 10}}>
                  큰 프로필 이미지
                </Text>
              </View>
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </>
  );
};

export default LayoutAnimationPageHeader;
