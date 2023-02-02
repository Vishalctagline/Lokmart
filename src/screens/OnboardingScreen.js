import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import {colors} from '../styles/colors';
import CustomButton from '../components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import Onboarding from 'react-native-onboarding-swiper';
import {SafeAreaView} from 'react-native-safe-area-context';
import { fonts } from '../styles/fonts';
import { ScreenNames } from '../navigation/ScreenNames';

const data = [
  {
    id: 1,
    image: require('/Users/mac/Desktop/Projects/Lokmart/src/assets/images/illustration.png'),
    caption1: 'Welcome to LokMart! Grocery Applications',
    caption2:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore',
  },
  {
    id: 2,
    image: require('/Users/mac/Desktop/Projects/Lokmart/src/assets/images/illustration2.png'),
    caption1: 'Best Quality and Fast Delivery!',
    caption2:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore',
  },
];

const OnboardingScreen = ({navigation}) => {
  const ref=useRef(null)
  const [curInd, setCurInd] = useState(0);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.illustrationBG}>
        <Image
          style={styles.img}
          source={require('/Users/mac/Desktop/Projects/Lokmart/src/assets/images/illustrationBG.png')}
        />
      </View>

      <ScrollView
        ref={ref}
        style={{position: 'absolute', height: hp('100')}}
        horizontal
        pagingEnabled={true}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={e => {
          console.log(Math.round(e.nativeEvent.contentOffset.x / wp('100')));
          let Ind = Math.round(e.nativeEvent.contentOffset.x / wp('100'));
          setCurInd(Ind);
        }}>
        {data.map((item, index) => (
          <View style={{width: wp('100')}}>
            <Image style={styles.illu} source={item.image} />

            <View style={styles.captionBox}>
              <View style={styles.caption}>
                <Text
                  style={{
                    ...fonts.h1,
                    textAlign: 'center',
                  }}>
                  {item.caption1}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 14,
                    fontWeight: '400',
                    marginHorizontal: wp('10'),
                    textAlign: 'center',
                    marginTop: 20,
                    color: colors.black,
                  }}>
                  {item.caption2}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {data.map((item, index) => (
          <View
            style={
              curInd == index ? styles.activeIndicator : styles.indicator
            }></View>
        ))}
      </View>
      <View style={{position: 'absolute', bottom: 40, width: wp('100')}}>
        {curInd == data.length - 1 ? (
          <CustomButton
            title="GET STARTED"
            onPress={() => {
              navigation.navigate(ScreenNames.Signup);
            }}
          />
        ) : (
          <CustomButton
            title="NEXT"
            onPress={() => {
              let nextind = curInd + 1;
              let offSetx = nextind * wp('100');
              console.log(offSetx);
              ref?.current.scrollTo({x: offSetx, y: 0, animated: true});
              setCurInd(nextind);
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: 'blue',
  },
  illustrationBG: {
    // flex: 1,
    // backgroundColor: 'blue',
    alignItems:'center',
    justifyContent: 'center',
    top: hp('-50'),
  },
  img: {
    width: wp('100'),
    top: hp('-5'),
    resizeMode: 'contain',
  },
  illu: {
    resizeMode: 'contain',
    position: 'absolute',
    width: wp('85'),
    top: hp('-65'),
    alignSelf:'center'
  },
  captionBox: {
    flex: 1,
    // backgroundColor: 'green',
    justifyContent: 'space-evenly',
  },
  caption: {
    alignSelf: 'center',
    // backgroundColor:'red',
    width: wp('80'),
    bottom:hp('-15')
  },
  indicatorContainer: {
    position:'absolute',
    bottom:hp('18'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: 20,
    width: 100,
    // backgroundColor: 'red',
    alignSelf: 'center',
  },
  indicator: {
    borderRadius: 20,
    height: 10,
    width: 18,
    backgroundColor: colors.grey,
  },
  activeIndicator: {
    borderRadius: 20,
    height: 10,
    width: 25,
    backgroundColor: colors.primary_color,
  },
});

export default OnboardingScreen;
