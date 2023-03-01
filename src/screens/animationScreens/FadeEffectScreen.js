import {View, Text, Animated, Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import { style } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';
import { fonts } from '../../styles/fonts';

const FadeEffectScreen = () => {
  const Fade = new Animated.Value(0);

  const fadding = () => {
    Fade.setValue(0);
    Animated.timing(Fade, {
      toValue: 1,
      useNativeDriver: true,
      delay: 500,
      duration: 2000,
    }).start(() => fadding());
  };

  useEffect(() => {
    fadding();
  }, [Fade]);

  return (
    <Animated.View style={{...styles.centeredItem, opacity: Fade}}>
      <Text style={fonts.h1}>FadeEffectScreen</Text>
      <Image
        source={require('../../assets/images/noImg.png')}
        style={styles.img}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  centeredItem: {justifyContent: 'center', alignItems: 'center',},
  img: {height: 100, width: 100, resizeMode: 'contain'},
});

export default FadeEffectScreen;
