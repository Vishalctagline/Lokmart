import {
  View,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {colors} from '../styles/colors';
import {sizes} from '../styles/sizes';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fonts } from '../styles/fonts';


const CustomButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0.5, y: 2.5}}
        colors={[colors.primary_color, colors.secondary_color]}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          height: 60,
          width: sizes.width / 1.1,
          borderRadius: 15,
          flexDirection:'row',
          // justifyContent:'center'
        }}>
          {props.icon && <Icon name={props.icon} size={20} color={colors.white} style={{marginRight:15}}/>}
        <Text
          style={fonts.btnText}>
          {props.title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButton;
