import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { fonts } from '../styles/fonts';

const CustomInput = (props) => {
  const [visibility, setvisibility] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View
      style={
        isFocus
          ? {
              ...styles.input,
              borderColor: colors.primary_color,
              borderWidth: 2,
            }
          : styles.input
      }>
      {props.prefix && (
        <Icon name={props.prefix} size={24} color={colors.soft_grey} />
      )}
      <TextInput
        onBlur={() => {
          setIsFocus(!isFocus);
        }}
        onFocus={() => {
          setIsFocus(!isFocus);
        }}
        style={{
          ...fonts.h6,
          flex: 1,
          marginHorizontal: 10,
          textAlign: 'left',
          lineHeight: 24,
        }}
        secureTextEntry={props.passwordField && !visibility}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={colors.soft_grey}
        keyboardType={props.keyboardType}
        maxLength={props.maxLength}
      />
      {props.passwordField && (
        <TouchableOpacity
          onPress={() => {
            setvisibility(!visibility);
          }}>
          <Icon
            backgroundColor={'transparent'}
            name={visibility ? 'eye' : 'eye-slash'}
            size={24}
            color={visibility ? colors.primary_color : colors.soft_grey}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: colors.grey1,
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default CustomInput;
