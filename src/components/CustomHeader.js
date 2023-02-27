import { View, Text, SafeAreaView, TouchableWithoutFeedback, I18nManager } from 'react-native'
import React from 'react'
import { heightPercentageToDP } from 'react-native-responsive-screen-hooks';
import {colors} from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fonts } from '../styles/fonts';
import { useRtlContext } from 'react-native-easy-localization-and-rtl';

const CustomHeader = (props) => {
  // const {RtlStyles,isRtl}=useRtlContext()
  // console.log(RtlStyles.containerRow)
  return (
    <SafeAreaView
      style={{
        height: heightPercentageToDP('10'),
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        // marginTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
        // ...RtlStyles.containerRow,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          // marginLeft: 20,
          // ...RtlStyles.containerRow,
        }}>
        {!props.noBack && (
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Icon
              name={
                props.close ? 'close' : 'arrow-left'
              }
              size={25}
              color={colors.black}
              style={{marginHorizontal: 20,
              // ...RtlStyles.flipHorizontal
              transform:[{scaleX: I18nManager.isRTL ? -1 : 1}]
            }}
            />
          </TouchableWithoutFeedback>
        )}
        {/* <View style={{width: 20,backgroundColor:'red'}} /> */}
        <Text style={{...fonts.h4, marginHorizontal: 20}}>{props.title}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 20,
          // ...RtlStyles.containerRow,
        }}>
        {props.fav && (
          <TouchableWithoutFeedback onPress={props.onFav}>
            <Icon
              name="heart"
              size={25}
              color={props.isFav ? 'red' : 'black'}
            />
          </TouchableWithoutFeedback>
        )}

        <View style={{width: 25}} />
        {props.reset ? (
          <Text
            onPress={props.resetOnPress}
            style={{...fonts.h7, color: colors.primary_color}}>
            Reset
          </Text>
        ) : (
          <TouchableWithoutFeedback onPress={props.onMenuPress}>
            <Icon name={'ellipsis-v'} size={25} color={colors.black} />
          </TouchableWithoutFeedback>
        )}
      </View>
    </SafeAreaView>
  );
}

export default CustomHeader