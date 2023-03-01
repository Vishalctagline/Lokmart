import { View, Text, Animated, StyleSheet, Button } from 'react-native'
import React from 'react'
import NormalButton from '../../components/NormalButton';
import { fonts } from '../../styles/fonts';

const TranslateEffect = () => {
  
  const TranslateX = new Animated.Value(1);
  const TranslateY = new Animated.Value(1);

     const translateXY = () => {
       TranslateX.setValue(0);
       Animated.spring(TranslateX, {
         toValue: 100,
         duration: 1000,
         useNativeDriver: true,
       }).start();
       TranslateY.setValue(0);
       Animated.spring(TranslateY, {
         toValue: 100,
         duration: 1000,
         //   delay:1000,
         useNativeDriver: true,
       }).start();
     };
     const translateX = () => {
       TranslateX.setValue(0);
       Animated.spring(TranslateX, {
         toValue: 100,
         duration: 1000,
         useNativeDriver: true,
       }).start();
     };
     const translateY = () => {
       TranslateY.setValue(0);
       Animated.spring(TranslateY, {
         toValue: 100,
         duration: 1000,
         useNativeDriver: true,
       }).start();
     };
     const reset=()=>{
         TranslateX.setValue(0)
         TranslateY.setValue(0)
     }

  return (
    <View style={styles.centeredItem}>
      <Text style={fonts.h1}>TranslateEffect</Text>
      <Animated.Image
        source={require('../../assets/images/noImg.png')}
        style={{
          ...styles.img,
          transform: [{translateX: TranslateX}, {translateY: TranslateY}],
        }}
      />
      <NormalButton title={'Translate in XY'} onPress={translateXY} />
      <NormalButton title={'Translate in X'} onPress={translateX} />
      <NormalButton title={'Translate in Y'} onPress={translateY} />
      <NormalButton title={'Reset Translate'} onPress={reset} />

    </View>
  );
}

const styles = StyleSheet.create({
  centeredItem: {justifyContent: 'center', alignItems: 'center'},
  img: {height: 100, width: 100, resizeMode: 'contain'},
});

export default TranslateEffect