import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react'
import { fonts } from '../styles/fonts';

const CustomCallout = ({title}) => {
  return (
    <View style={styles.bubble}>
      <Text>
        <Image
          source={require('../assets/images/noImg.png')}
          style={{height: 30, width: 30, resizeMode: 'contain',}}
        />
      </Text>
      <View style={{flex: 1}}>
        <Text style={{...fonts.h1}}>{title}</Text>
        <Text style={{...fonts.h2}}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  callout: {
    flex: 1,
  },
  bubble: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#5DADE2',
    borderRadius: 10,
    padding: 5,
    width:150,
  },
  
});

export default CustomCallout