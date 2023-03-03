import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Animated,
  Image,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen-hooks';
import {categories} from '../../assets/data/data';
import {CotegoryCard} from '../CategoryScreen';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import SwapableListItem from '../../components/animatedComponents/SwapableListItem';

const HeaderMaxHeight = hp(50);
const HeaderMinHeight = hp(8);
const ImageMaxHeight = hp(20);
const ImageMinHeight = hp(8);

const ImageMaxWidth = hp(20);
const ImageMinWidth = hp(8);

const AnimatedProfileScreen = () => {

  const scrollY = new Animated.Value(0.1);


  const headerHeightHandler = scrollY.interpolate({
    inputRange: [0, HeaderMaxHeight - HeaderMinHeight],
    outputRange: [HeaderMaxHeight, HeaderMinHeight],
    extrapolate: 'clamp',
  });

  const ImageHeightHandler = scrollY.interpolate({
    inputRange: [0, HeaderMaxHeight - HeaderMinHeight],
    outputRange: [ImageMaxHeight, ImageMinHeight],
    extrapolate: 'clamp',
  });
  const ImageWidthHandler = scrollY.interpolate({
    inputRange: [0, HeaderMaxHeight - HeaderMinHeight],
    outputRange: [ImageMaxWidth, ImageMinWidth],
    extrapolate: 'clamp',
  });
  
  const ImageTranslateHandler = scrollY.interpolate({
    inputRange: [0, HeaderMaxHeight - HeaderMinHeight],
    outputRange: [0, wp(-40)],
    extrapolate: 'clamp',
  },);
  const ImageScaleHandler = scrollY.interpolate({
    inputRange: [0, HeaderMaxHeight - HeaderMinHeight],
    outputRange: [1,0.3],
    extrapolate: 'clamp',
  });
 


  return (
    <>
      {/* <SafeAreaView style={{flex: 1}} > */}
      <View
        style={{
          flex: 1,
          marginTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
        }}>
        <Animated.View
          style={{
            ...styles.headerContainer,
            height: headerHeightHandler,
            // transform:[
            //     {
            //         scaleY:headerHeightHandler
            //     }
            // ]
          }}>
          <Animated.Image
            source={require('../../assets/images/user.png')}
            style={{
              ...styles.img,
              //   height: ImageHeightHandler,
              //   width: ImageWidthHandler,
              transform: [
                {
                  translateX: ImageTranslateHandler,
                },
                {
                  scale: ImageScaleHandler,
                },
              ],
            }}
          />
        </Animated.View>

        {/* <View style={{flex: 1}}> */}
        <Animated.FlatList
            // style={{flex: 1}}
          data={categories}
          bounces={false}
          ListFooterComponent={() => <View style={{height: HeaderMaxHeight}} />}
          renderItem={({item}) => (
              <SwapableListItem item={item}/>
              // <CotegoryCard item={item}/>
          )}
          showsVerticalScrollIndicator={false}
          onScroll={
            // (e)=>console.log(e.nativeEvent.contentOffset.x)
            Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: scrollY,
                    },
                  },
                },
              ],
              {
                useNativeDriver: false,
              },
            )
          }
        />
        {/* </View> */}
      </View>
      {/* </SafeAreaView> */}
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'grey',
    justifyContent: 'center',    
    alignItems: 'center',
  },
  img: {
    resizeMode: 'cover',
    borderRadius: hp(20),
  },
});

export default AnimatedProfileScreen;
