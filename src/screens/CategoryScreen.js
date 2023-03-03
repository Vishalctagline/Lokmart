import {
  View,
  Text,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {colors} from '../styles/colors';
import {categories} from '../assets/data/data';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fonts } from '../styles/fonts';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { heightPercentageToDP } from 'react-native-responsive-screen-hooks';
import { ScreenNames } from '../navigation/ScreenNames';
import CustomHeader from '../components/CustomHeader';


export const CotegoryCard = ({item, index, onPress = () => {}}) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      style={{
        // flex:1,
        flexDirection: 'row',
        borderColor: colors.grey,
        borderWidth: 1,
        borderRadius: 20,
        height: 100,
        // width: 100,
        alignItems: 'center',
        // justifyContent: 'center',
        // marginHorizontal: 20,
        // marginVertical: 10,
        padding: 10,
        backgroundColor: colors.white,
      }}>
      <Image
        source={item.image}
        style={{height: 70, width: 70, marginHorizontal: 10}}
      />
      <View style={{marginLeft: 10}}>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
            fontWeight: '600',
            color: colors.dark,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
            fontWeight: '400',
            color: colors.soft_grey,
          }}>
          {item.items} Items
        </Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

const CategoryScreen = (props) => {
  return (
    <>
      {/* <SafeAreaView
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
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="arrow-left" size={25} color={colors.black} />
          </TouchableWithoutFeedback>
          <View style={{width: 20}} />
          <Text style={{...fonts.h4}}>Categories</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => {}}>
          <Icon
            name="ellipsis-v"
            size={25}
            color={colors.black}
            style={{marginRight: 20}}
          />
        </TouchableWithoutFeedback>
      </SafeAreaView>*/}
      <CustomHeader title={'Categories'} {...props}/>
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={({item, index}) => (
            <CotegoryCard
              item={item}
              index={index}
              onPress={() => {
                // console.log(index, item.name);
                props.navigation.navigate(ScreenNames.ProductScreen, {item});
              }}
            />
          )}
        />
      </View>
    </>
  );
};

export default CategoryScreen;
