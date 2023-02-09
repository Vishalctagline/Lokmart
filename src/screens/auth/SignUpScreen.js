import {View, Text, StyleSheet, Image, ScrollView, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CheckBox from '@react-native-community/checkbox';
import {colors} from '../../styles/colors';
import {fonts} from '../../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

import auth from '@react-native-firebase/auth';
import {ScreenNames} from '../../navigation/ScreenNames';

const SignUpScreen = ({navigation, route}) => {
  const [usernameError, setusernameError] = useState('');
  const [emailError, setemailError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isChecked, setisChecked] = useState(false);

  const [userList, setuserList] = useState([]);

  const getUserList = async () => {
    const data = JSON.parse(await AsyncStorage.getItem('USERLIST'));
    if (data == null) {
      data = [];
    }
    setuserList(data);
  };

  useEffect(() => {
    getUserList();
    return () => {
      setusername('');
      setemail('');
      setpassword('');
    };
  }, []);

  const createAndSignIn = async (email, password) => {
    try {
      const res = await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          res.user.sendEmailVerification();
          Alert.alert('Sign Up', 'Email has been sent !');
          console.log('create User With Email And Password : ', res);
          console.log('Response : ', res.user);

          // AsyncStorage.setItem('USER', JSON.stringify(res.user));
          // navigation.replace(ScreenNames.HomeTab, {
          //   user: res.user.displayName ? res.user.displayName : 'User',
          // });
        });

      // .then(user=>{
      //   return user
      //   .user.updateProfile({
      //     displayName:username
      //   })
      // });
    } catch (error) {
      console.log(error.userInfo?.message);
      if (error.userInfo?.message) {
        Alert.alert('Sign Up', error.userInfo?.message);
      } else {
        Alert.alert('Sign Up', 'Something went wrong !');
      }
    }
  };

  return (
    <KeyboardAwareScrollView scrollEnabled={false} enableOnAndroid={true}>
      <View style={styles.mainContainer}>
        <View>
          <Image
            style={styles.img}
            source={require('../../assets/images/SignInBG.png')}
          />
          <Image
            style={styles.logo}
            source={require('../../assets/images/Logo.png')}
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
          <KeyboardAwareScrollView scrollEnabled enableOnAndroid={true}>
            <Text style={fonts.h3}>Create your account</Text>
            <View style={{height: 20}} />
            <CustomInput
              placeholder={'Enter username'}
              value={username}
              prefix={'user'}
              onChangeText={txt => {
                if (username) {
                  setusernameError('');
                }
                setusername(txt);
              }}
            />
            {usernameError && (
              <Text style={styles.errorTxt}>{usernameError}</Text>
            )}
            <CustomInput
              placeholder={'Enter e-mail address'}
              keyboardType={'email-address'}
              value={email}
              prefix={'envelope'}
              onChangeText={txt => {
                if (email) {
                  setemailError('');
                }
                setemail(txt);
              }}
            />
            {emailError && <Text style={styles.errorTxt}>{emailError}</Text>}
            <CustomInput
              placeholder={'Enter password'}
              value={password}
              prefix={'lock'}
              passwordField={true}
              onChangeText={txt => {
                if (password) {
                  setpasswordError('');
                }
                setpassword(txt);
              }}
            />
            {passwordError && (
              <Text style={styles.errorTxt}>{passwordError}</Text>
            )}
            <View style={{height: 20}} />
            <CustomButton
              title={'REGISTER'}
              onPress={async () => {
                if (
                  username.trim().length == 0 ||
                  password.trim().length == 0 ||
                  email.trim().length == 0
                ) {
                  // Alert.alert('Sign Up', 'All fields are empty !');
                  if (username.trim().length == 0) {
                    setusernameError('* Please Enter Username');
                  }
                  if (email.trim().length == 0) {
                    setemailError('* Please Enter Email');
                  }
                  if (password.trim().length == 0) {
                    setpasswordError('* Please Enter Password');
                  }
                } else if (
                  !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
                    email,
                  )
                ) {
                  setemailError('* Please Enter Proper Email');
                } else if (password.length < 8) {
                  setpasswordError('* Password length atleast 8 Character');
                } else if (
                  !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
                    password,
                  )
                ) {
                  setpasswordError('* Please Enter Proper Password');
                } else if (!isChecked) {
                  Alert.alert('Sign Up', 'Please Accept Term and Condition !');
                } else {
                  console.log('done');

                  // const temp = [
                  //   ...userList,
                  //   {
                  //     username: username,
                  //     email: email,
                  //     password: password,
                  //   },
                  // ];
                  // await AsyncStorage.setItem('USERLIST', JSON.stringify(temp));
                  // navigation.goBack();
                  createAndSignIn(email, password);
                }
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 25,
                alignItems: 'center',
                // backgroundColor: 'black',
                // flexWrap:'wrap'
              }}>
              <CheckBox
                style={{
                  marginRight: 10,
                  height: 20,
                  width: 20,
                }}
                tintColors={{true: colors.primary_color}}
                tintColor={colors.soft_grey}
                onCheckColor={colors.white}
                onFillColor={colors.primary_color}
                onTintColor={colors.primary_color}
                // animationDuration={0}
                value={isChecked}
                onValueChange={() => {
                  setisChecked(!isChecked);
                }}
                boxType={'square'}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: colors.soft_grey,
                  fontWeight: '500',
                  fontSize: 16,
                  lineHeight: 22,
                }}>
                By tapping “Sign Up” you accept our{' '}
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: colors.primary_color,
                    fontWeight: '600',
                    fontSize: 16,
                    lineHeight: 22,
                  }}>
                  terms
                </Text>{' '}
                and{' '}
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: colors.primary_color,
                    fontWeight: '600',
                    fontSize: 16,
                    lineHeight: 22,
                  }}>
                  condition
                </Text>
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 16,
                fontWeight: '400',
                lineHeight: 22,
                color: colors.soft_grey,
                alignSelf: 'center',
              }}>
              Already have account? {''}
              <Text
                onPress={() => {
                  navigation.pop();
                }}
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  fontWeight: '600',
                  lineHeight: 22,
                  color: colors.primary_color,
                }}>
                Login
              </Text>
            </Text>
          </KeyboardAwareScrollView>
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

export default SignUpScreen;
