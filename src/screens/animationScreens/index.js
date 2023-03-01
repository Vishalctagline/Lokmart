import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import FadeEffectScreen from './FadeEffectScreen';
import ScaleEffectScreen from './ScaleEffectScreen';
import {fonts} from '../../styles/fonts';
import TranslateEffect from './TranslateEffect';

const AminationScreens = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={fonts.h1}>AminationScreens</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        bounces={false}>
        <FadeEffectScreen />
        <ScaleEffectScreen />
        <TranslateEffect />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default AminationScreens;
