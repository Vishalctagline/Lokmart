import { View, Text, SafeAreaView, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { heightPercentageToDP } from 'react-native-responsive-screen-hooks';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {colors} from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fonts } from '../styles/fonts';


const CustomHeader = (props) => {
  return (
    <SafeAreaView
      style={{
        height: heightPercentageToDP('10'),
        // borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        marginTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 20,
        }}>
        {!props.noBack && <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Icon name={props.close? "close" : "arrow-left"} size={25} color={colors.black} />
        </TouchableWithoutFeedback>}
        <View style={{width: 20}} />
        <Text style={{...fonts.h4}}>{props.title}</Text>
      </View>
      <View style={{flexDirection: 'row', marginHorizontal: 20}}>
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
            style={{...fonts.h7,color:colors.primary_color}}>
            Reset
          </Text>
        ) : (
          <TouchableWithoutFeedback onPress={() => {}}>
            <Icon name="ellipsis-v" size={25} color={colors.black} />
          </TouchableWithoutFeedback>
        )}
      </View>
    </SafeAreaView>
  );
}

export default CustomHeader