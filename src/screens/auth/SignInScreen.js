import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../styles/colors';
import CheckBox from '@react-native-community/checkbox';
import {fonts} from '../../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenNames} from '../../navigation/ScreenNames';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {sizes} from '../../styles/sizes';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  AccessToken,
  LoginButton,
  LoginManager,
  Profile,
} from 'react-native-fbsdk-next';
// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignInScreen = ({navigation}) => {
  const [userList, setuserList] = useState([]);

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [isChecked, setisChecked] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const [user, setuser] = useState({});

  const authUser = async () => {
    setisLoading(true);
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      console.log('response : ', response);
      console.log('status : ', response.status);
      const jsonData = await response.json();
      console.log('jsondata : ', jsonData.id);

      if (response.status == 200) {
        // firestore
        const usersDocument = await firestore()
          .collection('users')
          .doc(jsonData.id.toString())
          .get();
        console.log('usersDocument GET ; ', usersDocument);
        // usersCollection.add(jsonData).then(()=>{
        //   console.log('Added !')
        // }).catch(e=>console.log(e));
        if (usersDocument.exists) {
          const data=usersDocument.data()
          console.log('DATA exists : ', data);
          await AsyncStorage.setItem('USER', JSON.stringify(data));
          navigation.replace(ScreenNames.HomeTab, );
        } else {
          firestore()
            .collection('users')
            .doc(jsonData.id.toString())
            .set(jsonData)
            .then(() => {
              console.log('setted !!');
            })
            .catch(e => {
              console.log(e);
            });
          setisLoading(false);
          await AsyncStorage.setItem('USER', JSON.stringify(jsonData));
          navigation.replace(ScreenNames.HomeTab);
        }
      } else if (response.status == 400) {
        auth()
          .signInWithEmailAndPassword(username, password)
          .then(res => {
            console.log('User : ', res.user);
            setisLoading(false);
            if (res.user.emailVerified) {
              console.log('Result user : ', res.user);
              const data = {
                id: res.user?.uid,
                firstName: res.user?.givenName,
                lastName: res.user?.familyName,
                image: res.user?.photoURL,
                username: res.user?.name,
                email: res.user?.email,
              };
              // firestore
              const usersCollection = firestore().collection('users');
              console.log('usersCollection GET ; ', usersCollection);
              usersCollection
                .doc(data.id)
                .set(data)
                .then(() => {
                  console.log('setted !!');
                })
                .catch(e => {
                  console.log(e);
                });
              setisLoading(false);
              // AsyncStorage.setItem('USER', JSON.stringify(res.user));
              AsyncStorage.setItem('USER', JSON.stringify(data));
              // navigation.replace(ScreenNames.HomeTab, {
              //   user: res.user.displayName ? res.user.displayName : 'User',
              // });
              navigation.replace(ScreenNames.HomeTab, {
                user: data.username,
              });
            } else {
              setisLoading(false);
              Alert.alert('Sign In', 'Please verify your Email.');
            }
          })
          .catch(err => {
            setisLoading(false);
            Alert.alert('Sign In', err.toString());
          });
      } else {
        Alert.alert('SignIn', jsonData.message);
      }
    } catch (error) {
      setisLoading(false);
      console.log(error);
      const errorMsg = 'Something went wrong(' + error.toString() + ')';
      Alert.alert('SignIn', errorMsg);
    }
    // try {
    //   auth()
    //     .signInWithEmailAndPassword(username, password)
    //     .then(res => {
    //       setisLoading(false);
    //       navigation.replace(ScreenNames.HomeTab, {
    //         user: res.user.displayName ? res.user.displayName : 'User',
    //       });
    //     });
    // } catch (error) {
    //   Alert.alert('Sign In', error.toString());
    // }
  };

  // console.log('list',userList)

  // const setUserDetails = async () => {
  //   await AsyncStorage.setItem('USERLIST', JSON.stringify(userList));
  //   console.log('user set');
  // };

  // const getUserDetails = async () => {
  //   var users = JSON.parse(await AsyncStorage.getItem('USERLIST'));
  //   if(users==null){
  //     users=[];
  //   }
  //   setuserList(users);
  //   console.log('users : ', users);
  // };

  useEffect(() => {
    // setUserDetails();
    // getUserDetails();
    console.log('useEffect');

    GoogleSignin.configure({
      webClientId:
        '625967762187-89g50n94paickqdk6oi5rsq8vsmdhvo3.apps.googleusercontent.com',
      iosClientId:
        '625967762187-rrid1u5qfc85k49n3lq265bujm3dbli3.apps.googleusercontent.com',
      // offlineAccess: true,
    });

    return () => {
      setusername('');
      setpassword('');
    };
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User : ', userInfo);

      const data = {
        id: userInfo.user.id,
        firstName: userInfo.user.givenName,
        lastName: userInfo.user.familyName,
        image: userInfo.user.photo,
        username: userInfo.user.name,
        email: userInfo.user.email,
      };
      // firestore
      const usersCollection = firestore().collection('users');
      console.log('usersCollection  ; ', usersCollection);
      usersCollection
        .doc(data.id)
        .set(data)
        .then(() => {
          console.log('setted !!');
        })
        .catch(e => {
          console.log(e);
        });

      // await AsyncStorage.setItem('USER', JSON.stringify(userInfo.user));
      await AsyncStorage.setItem('USER', JSON.stringify(data));
      // setuser(userInfo)

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );

      // Sign-in the user with the credential
      auth().signInWithCredential(googleCredential);
      // navigation.replace(ScreenNames.HomeTab, {
      //   user: userInfo.user.name,
      // });
      navigation.replace(ScreenNames.HomeTab, {
        user: data.username,
      });
    } catch (error) {
      console.log('SignIn ERROR : ', error.code);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  const signInFB = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          const currentProfile = Profile.getCurrentProfile().then(
            async function (currentProfile) {
              console.log('Current User :: ', currentProfile);
              if (currentProfile) {
                console.log(
                  'The current logged user is: ' + currentProfile.name,
                );
                const Data = {
                  id: currentProfile.userID,
                  firstName: currentProfile.firstName,
                  lastName: currentProfile.lastName,
                  image: currentProfile.imageURL,
                  username: currentProfile.name,
                  email: currentProfile.email,
                };
                // firestore
                const usersCollection = firestore().collection('users');
                console.log('usersCollection  ; ', usersCollection);
                usersCollection
                  .doc(Data.id)
                  .set(Data)
                  .then(() => {
                    console.log('setted !!');
                  })
                  .catch(e => {
                    console.log(e);
                  });

                // AsyncStorage.setItem('USER', JSON.stringify(currentProfile));
                AsyncStorage.setItem('USER', JSON.stringify(Data));

                // Once signed in, get the users AccesToken
                const data = await AccessToken.getCurrentAccessToken();
                console.log('data:,', data);
                // Create a Firebase credential with the AccessToken
                const facebookCredential = auth.FacebookAuthProvider.credential(
                  data.accessToken,
                );

                // Sign-in the user with the credential
                auth()
                  .signInWithCredential(facebookCredential)
                  .then(
                    navigation.replace(ScreenNames.HomeTab, {
                      user: currentProfile.name,
                    }),
                  )
                  .catch(e => Alert.alert('Sign In', e.toString()));
              }
            },
          );
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  // const isSignedIn=async()=>{
  //   const isSignIn=await GoogleSignin.isSignedIn();
  //   // console.log('issignin',isSignIn)
  //   if(isSignIn){
  //     getCurrentUserInfo()
  //   }else{
  //     console.log('Please Login !!')
  //   }
  // }

  // const getCurrentUserInfo=async()=>{
  //   try {
  //     const userInfo=await GoogleSignin.signInSilently();
  //     setuser(userInfo)
  //      navigation.replace(ScreenNames.HomeTab, {
  //         user: userInfo.user.name,
  //       });

  //   } catch (error) {
  //     console.log(error.code)
  //   }
  // }

  // const signOut=async()=>{
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     setuser({})
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
            top: hp('32'),
            alignSelf: 'center',
            position: 'absolute',
          }}>
          <KeyboardAwareScrollView scrollEnabled enableOnAndroid={true}>
            <Text style={fonts.h3}>Welcome back</Text>
            <View style={{height: 10}} />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontWeight: '400',
                fontSize: 14,
                lineHeight: 22,
                color: colors.soft_grey,
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </Text>
            <View style={{height: 20}} />
            <CustomInput
              keyboardType={'email-address'}
              placeholder={'Enter username / e-mail address'}
              value={username}
              prefix={'user'}
              onChangeText={txt => {
                setusername(txt);
              }}
            />

            <CustomInput
              placeholder={'Enter password'}
              value={password}
              prefix={'lock'}
              passwordField={true}
              onChangeText={txt => {
                setpassword(txt);
              }}
            />
            <View style={{height: 20}} />
            {isLoading ? (
              <ActivityIndicator
                style={{flex: 1, height: 60, width: sizes.width / 1.1}}
              />
            ) : (
              <CustomButton
                title={'SIGN IN'}
                onPress={async () => {
                  if (username == '' && password == '') {
                    Alert.alert('Sign In', 'Both fields are empty !');
                  } else if (username == '') {
                    Alert.alert('Sign In', 'Username field is empty !');
                  } else if (password == '') {
                    Alert.alert('Sign In', 'Password field is empty !');
                  } else if (password.length < 5) {
                    Alert.alert(
                      'Sign In',
                      'Password length must have 5 character !',
                    );
                  } else {
                    console.log('done');

                    authUser();

                    // const users = JSON.parse(
                    //   await AsyncStorage.getItem('USERLIST'),
                    // );
                    // console.log('USERS : ', users);
                    // const user = users.find(user => {
                    //   return (
                    //     user.username == username && user.password == password
                    //   );
                    // });
                    // console.log('finded user :', user);
                    // if (!user) {
                    //   Alert.alert('Sign In', 'Invalid User !!');
                    // } else {
                    //   console.log('matched');
                    //   {
                    //     isChecked &&
                    //       (await AsyncStorage.setItem('USER', username));
                    //   }
                    //   navigation.replace(ScreenNames.HomeTab, {
                    //     user: username,
                    //   });
                    // }
                  }
                }}
              />
            )}

            {/* <GoogleSigninButton onPress={signIn} /> */}
            {/* <LoginButton
              onLoginFinished={(error, result) => {
                if (error) {
                  console.log('login has error : ', error);
                } else if (result.isCancelled) {
                  console.log('login cancelled');
                } else {
                  AccessToken.getCurrentAccessToken().then(data => {
                    console.log(data.accessToken.toString());
                  });
                }
              }}
            /> */}
            <Text style={{alignSelf: 'center', ...fonts.h6, marginVertical: 2}}>
              OR
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                ...fonts.h6,
                color: colors.soft_grey,
                marginVertical: 2,
              }}>
              Signin with{' '}
              <Text
                style={{...fonts.h7, color: colors.primary_color}}
                onPress={() => {
                  navigation.navigate(ScreenNames.PhoneNumSignInScreen);
                }}>
                Phone Number
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginVertical: 2,
              }}>
              <TouchableWithoutFeedback onPress={signIn}>
                <Image
                  source={{
                    uri: 'https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png',
                  }}
                  style={{
                    height: 35,
                    width: 35,
                    resizeMode: 'cover',
                    borderRadius: 50,
                  }}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={signInFB}>
                <Image
                  source={{
                    uri: 'https://cdn-icons-png.flaticon.com/512/124/124010.png',
                  }}
                  style={{
                    height: 35,
                    width: 35,
                    resizeMode: 'cover',
                    borderRadius: 50,
                  }}
                />
              </TouchableWithoutFeedback>
              {Platform.OS == 'ios' && (
                <TouchableWithoutFeedback>
                  <Image
                    source={{
                      uri: 'https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.png',
                    }}
                    style={{
                      height: 35,
                      width: 35,
                      resizeMode: 'cover',
                      borderRadius: 50,
                    }}
                  />
                </TouchableWithoutFeedback>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 20,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  // backgroundColor:'black'
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
                  animationDuration={0}
                  value={isChecked}
                  onValueChange={() => {
                    setisChecked(!isChecked);
                  }}
                  boxType={'square'}
                />
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    color: colors.dark,
                    fontWeight: '600',
                    fontSize: 16,
                    lineHeight: 22,
                  }}>
                  Keep Sign In
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  fontWeight: '600',
                  lineHeight: 22,
                  textDecorationLine: 'underline',
                  color: colors.primary_color,
                }}>
                Forgot Password?
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
              Don’t have an account? {''}
              <Text
                onPress={() => {
                  navigation.navigate(ScreenNames.SignupScreen);
                }}
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  fontWeight: '600',
                  lineHeight: 22,
                  color: colors.primary_color,
                }}>
                Sign Up
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
});

export default SignInScreen;
