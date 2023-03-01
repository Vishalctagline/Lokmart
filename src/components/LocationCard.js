import { View, Text, StyleSheet, Image, TouchableWithoutFeedback ,} from 'react-native'
import React from 'react'
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';

const LocationCard = ({item, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image source={require('../assets/images/noImg.png')} />
        <Text style={fonts.h1}>{item.title}</Text>
        <Text>{item.latitude}</Text>
        <Text>{item.longitude}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    padding: 5,
    marginHorizontal: 10,
    borderRadius: 20,
    alignItems:'center'
  },
});

export default LocationCard