import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import React, { useEffect, useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import { colors } from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fonts } from '../styles/fonts';
import { ScreenNames } from '../navigation/ScreenNames';
import { useRtlContext } from 'react-native-easy-localization-and-rtl';


const FavoriteIcon=({isFav,onPress})=>{
  // console.log(isFav)
  return (
    <View style={{position: 'absolute', right: 15, top: 15}}>
      <TouchableWithoutFeedback
        onPress={onPress}>
        <Icon
          name="heart"
          backgroundColor={'transparent'}
          size={20}
          color={isFav ? 'red' : 'rgba(45, 45, 45, 0.5)'}
          // color={item.isFavorite ? 'red' : 'rgba(45,45,45,0.5)'}
        />
      </TouchableWithoutFeedback>
    </View>
  );
}

const GroceryCard = (props) => {

  // const {RtlStyles}=useRtlContext()

  // let item=props.item
  const [error, seterror] = useState(false)
  // const [item, setitem] = useState(props.item);
  
  // useEffect(() => {
  //   setisFav(item.isFavorite);
  //   console.log('rendinring.............................');
  // }, [props.item]);
  

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        // console.log('clicked', item);
        props.navigation.navigate(ScreenNames.DetailScreen, {item: props.item});
      }}>
      <View
        style={{
          flex: 1,
          // backgroundColor: 'blue',
          marginVertical: 15,
          flexDirection: 'row',
          // ...RtlStyles.containerRow,
        }}>
        <View style={{}}>
          <Image
            onError={error => seterror(true)}
            alt="Image not Found"
            style={{
              height: hp('19'),
              width: wp('32'),
              borderRadius: 20,
              resizeMode: 'cover',
            }}
            // source={item.image}
            source={{
              uri: error
                ? 'https://reactnative-examples.com/wp-content/uploads/2022/02/error-image.png'
                : props.item.thumbnail,
            }}
          />
          {props.item.discount && (
            <View
              style={{
                position: 'absolute',
                // top: 156,
                left: 25,
                bottom: -13,
                alignItems: 'center',
                backgroundColor: colors.solid_primary,
                padding: 3,
                width: wp('19'),
                borderColor: colors.white,
                borderWidth: 1,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 10,
                  fontWeight: '700',
                  lineHeight: 18,
                  color: colors.white,
                  textAlign:'left'
                }}>
                {props.item.discount}% OFF
              </Text>
            </View>
          )}
          <FavoriteIcon onPress={props.onPress} isFav={props.item.isFavorite} />
        </View>
        <View
          style={{
            flex: 1,
            // backgroundColor: 'yellow',
            marginHorizontal: 20,
            justifyContent: 'space-evenly',
          }}>
          <Text
            // numberOfLines={1}
            style={[fonts.h5,
            // RtlStyles.text
            ]}>
            {/* {item.name} */}
            {props.item.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // ...RtlStyles.containerRow,
            }}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                width: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                borderColor: '#B8BBC6',
                // ...RtlStyles.containerRow,
              }}>
              <Icon name="star" color={colors.ratingStart} />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 10,
                  fontWeight: '600',
                  lineHeight: 18,
                  color: colors.dark,
                  // ...RtlStyles.text,
                }}>
                {props.item.rate}
              </Text>
            </View>
            <View style={{width: 10}} />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                fontWeight: '500',
                lineHeight: 18,
                color: colors.primary_color,
                // ...RtlStyles.text,
              }}>
              {props.item.rating} Ratings
            </Text>
          </View>
          <Text
            style={{
              textAlign:'left',
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              fontWeight: '600',
              // lineHeight: 18,
              color: colors.dark,
              // ...RtlStyles.text,
            }}>
            ${props.item.price}
          </Text>
          {/* {item.discount ? ( */}
          <View>
            <View
              style={{
                height: 1,
                backgroundColor: colors.grey1,
                marginVertical: 10,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5,
                // ...RtlStyles.containerRow,
              }}>
              <Image
                style={{height: 20, width: 20}}
                source={require('../assets/images/discount.png')}
              />
              <View style={{width: 10}} />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 10,
                  fontWeight: '500',
                  lineHeight: 18,
                  color: colors.soft_grey,
                }}>
                {/* {item.discount}% off upto $ */}
                {props.item.discountPercentage}% off upto $
                {(
                  (props.item.price * props.item.discountPercentage) /
                  100
                ).toFixed(2)}
                {/* {(item.price * item.discount) / 100} */}
              </Text>
            </View>
          </View>
          {/* )  
          : (
            <View style={{height: 36}}></View>
          )} */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GroceryCard