import {View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import React from 'react'
import { colors } from '../styles/colors';

const CustomMarker = ({color}) => {
  return (
    <View >
      {/* <Image source={require('../assets/images/custom_pin.png')} style={{height:20,width:20,}}/> */}
      <Icon name={'flag'} size={30} color={color}/>
    </View>
  )
}

export default CustomMarker