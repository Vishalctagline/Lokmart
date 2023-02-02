import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import {colors} from '../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../components/CustomButton';
import Onboarding from 'react-native-onboarding-swiper';
import {fonts} from '../styles/fonts';
import { ScreenNames } from '../navigation/ScreenNames';

const OnboardingScreen2 = ({navigation}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.illustrationBG}>
        <Image
          style={styles.img}
          source={require('/Users/mac/Desktop/Projects/Lokmart/src/assets/images/illustrationBG.png')}
        />
      </View>

      <Onboarding
        bottomBarHighlight={false}
        DotComponent={({selected}) => (
          <View style={styles.indicatorContainer}>
            {selected ? (
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0.5, y: 3}}
                colors={[colors.primary_color, colors.secondary_color]}
                style={styles.activeIndicator}
              />
            ) : (
              <View style={styles.indicator}></View>
            )}
          </View>
        )}
        showSkip={false}
        NextButtonComponent={({...props}) => (
          <View style={{width: wp('100'), bottom: 20}}>
            <CustomButton title={'NEXT'} {...props} />
          </View>
        )}
        DoneButtonComponent={() => (
          <View style={{width: wp('100'), bottom: 20}}>
            <CustomButton
              title="GET STARTED"
              onPress={() => {
                navigation.navigate(ScreenNames.SigninScreen);
              }}
            />
          </View>
        )}
        imageContainerStyles={{
          top: hp('-20'),
        }}
        titleStyles={styles.title}
        subTitleStyles={styles.subTitle}
        pages={[
          {
            backgroundColor: 'transparent',
            image: (
              <Image
                style={styles.illu}
                source={require('/Users/mac/Desktop/Projects/Lokmart/src/assets/images/illustration.png')}
              />
            ),
            title: 'Welcome to LokMart! Grocery Applications',
            subtitle:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore',
          },
          {
            backgroundColor: 'transparent',
            image: (
              <Image
                style={styles.illu}
                source={require('/Users/mac/Desktop/Projects/Lokmart/src/assets/images/illustration2.png')}
              />
            ),
            title: 'Best Quality and Fast Delivery!',
            subtitle:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore',
          },
        ]}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  illustrationBG: {
    flex: 1,
    // backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: hp('-10'),
    width: wp('100'),
  },
  img: {
    width: wp('100'),
    top: -650,
    // top:hp('-80'),
    resizeMode: 'contain',
  },
  illu: {
    resizeMode: 'contain',
    position: 'absolute',
    width: wp('90'),
    height: hp('100'),
    top: hp('-52'),
  },
  captionBox: {
    flex: 1,
    // backgroundColor: 'green',
    justifyContent: 'space-evenly',
  },
  caption: {
    alignSelf: 'center',
    // backgroundColor:'blue',
    width: wp('80'),
  },
  indicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 20,
    width: 40,
    // backgroundColor: 'red',
    alignSelf: 'center',
    bottom: hp('10'),
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
  title: {
    ...fonts.h1,
    position: 'absolute',
    bottom: hp('-8'),
    textAlign: 'center',
    alignSelf: 'center',
  },
  subTitle: {
    ...fonts.h2,
    position: 'absolute',
    bottom: hp('-20'),
    marginHorizontal: wp('10'),
    textAlign: 'center',
    alignSelf: 'center',
  },
});
export default OnboardingScreen2;
