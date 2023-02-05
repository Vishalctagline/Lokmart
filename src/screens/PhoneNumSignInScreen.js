import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {fonts} from '../styles/fonts';

import auth from '@react-native-firebase/auth';
import {ScreenNames} from '../navigation/ScreenNames';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhoneNumSignInScreen = ({navigation}) => {
  const [number, setnumber] = useState('');
  const [otp, setotp] = useState('');
  const [numberError, setnumberError] = useState('');
  const [otpError, setotpError] = useState('');

  const [confirm, setconfirm] = useState(null);

  const signinPhoneNum = async number => {
    try {
      const res = await auth().signInWithPhoneNumber(number);
      console.log('result of phone number signin : ', res);
      setconfirm(res);
    } catch (error) {
      console.log('ERROR : : ', {error});
      Alert.alert('Signin', error.userInfo.message);
    }
  };

  const verifyOTP = async otp => {
    try {
      const res = await confirm.confirm(otp);
      console.log('otp result : ', res);
      console.log('USER : ',res.user);
        AsyncStorage.setItem('USER', JSON.stringify(res.user));
      navigation.replace(ScreenNames.HomeTab, {user: res.user.phoneNumber});
    } catch (error) {
      console.log('ERROR : : ', {error});
      if (error.userInfo) {
        Alert.alert('Signin', error.userInfo.message);
      } else {
        Alert.alert('Signin', 'Something went wrong !');
      }
    }
  };

  return (
    <KeyboardAwareScrollView scrollEnabled={false} enableOnAndroid={true}>
      <View style={styles.mainContainer}>
        <View>
          <Image
            style={styles.img}
            source={require('../assets/images/SignInBG.png')}
          />
          <Image
            style={styles.logo}
            source={require('../assets/images/Logo.png')}
          />
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontWeight: '400',
              fontSize: 16,
              lineHeight: 24,
              position: 'absolute',
              color: colors.white,
              alignSelf: 'center',
              top: hp('15'),
              letterSpacing: 6,
            }}>
            Grocery App
          </Text>
        </View>
        <View
          style={{
            // backgroundColor: 'red',
            marginHorizontal: 20,
            top: hp('35'),
            position: 'absolute',
            alignSelf: 'center',
          }}>
          <Text style={fonts.h3}>Sign In with Phone Number</Text>
          <View style={{height: 20}} />
          <CustomInput
            keyboardType={'phone-pad'}
            placeholder={'+91 1234567890'}
            value={number}
            prefix={'phone'}
            onChangeText={txt => {
              if (number) {
                setnumberError('');
              }
              setnumber(txt);
            }}
          />
          {numberError && <Text style={styles.errorTxt}>{numberError}</Text>}
          <Text
            style={{
              ...fonts.h7,
              alignSelf: 'flex-end',
              color: colors.primary_color,
            }}
            onPress={() => {
              signinPhoneNum(number);
            }}>
            Get OTP
          </Text>
          <CustomInput
            keyboardType={'numeric'}
            placeholder={'Enter OTP'}
            value={otp}
            prefix={'lock'}
            onChangeText={txt => {
              if (otp) {
                setotpError('');
              }
              setotp(txt);
            }}
          />
          {otpError && <Text style={styles.errorTxt}>{otpError}</Text>}
          <View style={{height: 20}} />
          <CustomButton
            title={'Sign in'}
            onPress={() => {
              if (number == '' && otp == '') {
                Alert.alert('Sign In', 'Both fields are empty !');
              } else if (number == '') {
                Alert.alert('Sign In', 'Please enter Phone Number !');
              } else if (otp == '') {
                Alert.alert('Sign In', 'Please enter OTP !');
              } else if (!/^([+]\d{2})?\d{10}$/.test(number)) {
                Alert.alert('Sign In', 'Invalid Phone Number !');
              } else {
                verifyOTP(otp);
              }
            }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor:'red'
  },
  img: {
    width: wp('100'),
    resizeMode: 'contain',
    top: -500,
  },
  logo: {
    width: wp('50'),
    position: 'absolute',
    resizeMode: 'contain',
    alignSelf: 'center',
    top: hp('5'),
  },
  errorTxt: {
    color: 'red',
  },
});

export default PhoneNumSignInScreen;
