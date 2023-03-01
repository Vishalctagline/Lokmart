import {View, Text, Animated, Image, Button, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import NormalButton from '../../components/NormalButton';
import { fonts } from '../../styles/fonts';

const ScaleEffectScreen = () => {
  const Scale = new Animated.Value(1);
  const ScaleX = new Animated.Value(1);
  const ScaleY = new Animated.Value(1);

  useEffect(() => {}, []);

  const scaleXY = type => {
    Scale.setValue(0);
    type == 'spring'
      ? Animated.spring(Scale, {
          toValue: 1,
          useNativeDriver: true,
          duration: 1000,
        }).start()
      : Animated.timing(Scale, {
          toValue: 1,
          useNativeDriver: true,
          duration: 1000,
        }).start();
  };
  const scaleX = type => {
    ScaleX.setValue(0);
    type == 'spring'
      ? Animated.spring(ScaleX, {
          toValue: 1,
          useNativeDriver: true,
          duration: 1000,
        }).start()
      : Animated.timing(ScaleX, {
          toValue: 1,
          useNativeDriver: true,
          duration: 1000,
        }).start();
  };
  const scaleY = type => {
    ScaleY.setValue(0);
    type == 'spring'
      ? Animated.spring(ScaleY, {
          toValue: 1,
          useNativeDriver: true,
          duration: 1000,
        }).start()
      : Animated.timing(ScaleY, {
          toValue: 1,
          useNativeDriver: true,
          duration: 1000,
        }).start();
  };

  return (
    <View style={styles.centeredItem}>
      <Animated.View
        style={{
          ...styles.centeredItem,
          transform: [
            {
              scale: Scale,
            },
            {
              scaleY: ScaleY,
            },
            {
              scaleX: ScaleX,
            },
          ],
        }}>
        <Text style={fonts.h1}>ScaleEffectScreen</Text>
        <Animated.Image
          source={require('../../assets/images/noImg.png')}
          style={styles.img}
        />
      </Animated.View>
      <View style={{flexDirection: 'row'}}>
        <NormalButton title={'Scale in XY'} onPress={scaleXY} />
        <NormalButton title={'Scale in X'} onPress={scaleX} />
        <NormalButton title={'Scale in Y'} onPress={scaleY} />
      </View>
      <View style={{flexDirection: 'row'}}>
        <NormalButton
          title={'ScaleXY spring'}
          onPress={() => scaleXY('spring')}
        />
        <NormalButton
          title={'ScaleX spring'}
          onPress={() => scaleX('spring')}
        />
        <NormalButton
          title={'ScaleY spring'}
          onPress={() => scaleY('spring')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredItem: {justifyContent: 'center', alignItems: 'center'},
  img: {height: 100, width: 100, resizeMode: 'contain'},
});

export default ScaleEffectScreen;
