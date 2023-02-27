import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image,
  RefreshControl,
  I18nManager,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenNames} from '../navigation/ScreenNames';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {AccessToken, LoginManager, Profile} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';
import CustomButton from '../components/CustomButton';
import CustomHeader from '../components/CustomHeader';
import {colors} from '../styles/colors';
import {fonts} from '../styles/fonts';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

import firestore from '@react-native-firebase/firestore';
import CustomInput from '../components/CustomInput';
import {GlobalStyles} from '../styles/GlobalStyle';
import {sizes} from '../styles/sizes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import strings, { changeLanguage } from '../config/Localization';
import { useRtlContext } from 'react-native-easy-localization-and-rtl';

const ProfileScreen = props => {

  const { RtlStyles,isRtl,language,setLanguage }=useRtlContext()

  const [loading, setloading] = useState(true);
  const [List, setList] = useState([]);

  const [id, setid] = useState('');
  const [username, setusername] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setemail] = useState('');
  const [img, setimg] = useState('');

  // const [isrtl, setisrtl] = useState(false);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      getUserDetails();
      // getUserList();
    });
    // I18nManager.forceRTL(true)
  }, [
    // isrtl
  ]);

  const getUserDetails = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('USER'));
    firestore()
      .collection('users')
      .doc(user.id.toString())
      .get()
      .then(snapShot => {
        // console.log('snapshot : ', snapShot.data());
        const data = snapShot.data();
        // console.log('DATa : ', data);
        setemail(data.email);
        setfirstName(data.firstName);
        setlastName(data.lastName);
        setusername(data.username);
        setimg(data.image);
        setid(data.id.toString());
        setloading(false);
      })
      .catch(e => Alert.alert('Profile', e.toString()));
    // setloading(false);
  };
  const getUserList = async () => {
    // const users=await firebase.firestore().collection('users')
    // console.log('User List :',users)
    // firestore()
    //   .collection('users')
    //   .get()
    //   .then(qeurySnapshot => {
    //     console.log('Total : ', qeurySnapshot.size);
    //     let list = [];
    //     qeurySnapshot.forEach(documentSnapshot => {
    //       console.log(
    //         'User ID: ',
    //         documentSnapshot.id,
    //         documentSnapshot.data(),
    //       );
    //       list.push(documentSnapshot.data());
    //     });
    //     console.log('User List : ', list);
    //     setList(list);
    //   });
    // setloading(false);
  };

  const updateUser = id => {
    // console.log('ID : ',id)
    const data = {
      firstName: firstName,
      lastName: lastName,
      image: img,
      username: username,
      email: email,
    };
    firestore()
      .collection('users')
      .doc(id)
      .update(data)
      .then(() => Alert.alert('Profile', 'User updated !'));
  };

  const deleteUser = async id => {
    firestore()
      .collection('users')
      .doc(id.toString())
      .delete()
      .then(() => {
        Alert.alert('Delete User');
        props.navigation.replace(ScreenNames.AuthScreen);
        // getUserList();
      });
  };

  


  return (
    <>
      <CustomHeader
        title={strings.profile}
        noBack
        onMenuPress={() => {
          console.log('Menu opition pressed !!');
        }}
      />
      <View style={GlobalStyles.mainContainer}>
        {loading ? (
          <ActivityIndicator style={{alignSelf: 'center'}} />
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                margin: 10,
              }}>
              <Text
                onPress={() => {
                  // console.log(isRtl)
                  // setLanguage('en');
                  changeLanguage('en',false);
                }}>
                English
              </Text>
              <Text
                onPress={() => {
                  // console.log(isRtl)
                  // setLanguage('it')
                  changeLanguage('it', false);
                }}>
                Itailan
              </Text>
              <Text
                onPress={() => {
                  // console.log(isRtl)
                  // setLanguage('hi');
                  changeLanguage('hi', false);
                }}>
                Hindi
              </Text>
              <Text
                onPress={() => {
                  // console.log(isRtl)
                  // setLanguage('mrth');
                  changeLanguage('mrth', false);
                }}>
                Marathi
              </Text>
              <Text
                onPress={() => {
                  // console.log(isRtl)
                  // setLanguage('ar')
                  changeLanguage('ar', true);
                }}>
                Arabic
              </Text>
            </View>
            <KeyboardAwareScrollView
              scrollEnabled
              enableOnAndroid={true}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  // backgroundColor: 'red',
                  height: sizes.height / 8,
                  width: sizes.height / 8,
                  alignSelf: 'center',
                  // margin: 15,
                }}>
                {img == '' ? (
                  <ActivityIndicator />
                ) : (
                  <>
                    {console.log('IMAGE : ', img)}
                    <Image
                      style={styles.img}
                      source={{
                        uri: img
                          ? img
                          : 'https://reactnative-examples.com/wp-content/uploads/2022/02/error-image.png',
                      }}
                    />
                    <View style={styles.icon}>
                      <Icon
                        name={'pencil'}
                        size={20}
                        color={colors.white}
                        onPress={async () => {
                          console.log('opening image library');
                          try {
                            await launchImageLibrary({}, res => {
                              if (res.didCancel) {
                                console.log('User cancelled image picker');
                              } else if (res.error) {
                                console.log('ImagePicker Error: ', res.error);
                              } else {
                                console.log(res.assets[0].uri);
                                setimg(res.assets[0].uri);
                                console.log('res.assets[0].uri');
                              }
                            });
                          } catch (error) {
                            Alert.alert('Profile', error.toString());
                          }
                        }}
                      />
                    </View>
                  </>
                )}
              </View>

              <CustomInput
                value={username}
                onChangeText={val => setusername(val)}
              />
              <CustomInput
                value={firstName}
                onChangeText={val => setfirstName(val)}
              />
              <CustomInput
                value={lastName}
                onChangeText={val => setlastName(val)}
              />
              <CustomInput value={email} onChangeText={val => setemail(val)} />

              <View style={{height: 10}} />
              <CustomButton
                title={strings.updateProfile}
                onPress={() => {
                  if (
                    username.trim() == '' ||
                    firstName.trim() == '' ||
                    lastName.trim() == '' ||
                    email.trim() == ''
                  ) {
                    Alert.alert('Profile', 'Please proper information !');
                  } else {
                    updateUser(id);
                  }
                }}
              />
              <View style={{height: 10}} />
              <CustomButton
                title={strings.logout}
                onPress={async () => {
                  try {
                    //google
                    const isSignin = await GoogleSignin.isSignedIn();
                    console.log('Google User : ', isSignin);

                    //facebook
                    const fbUser = await AccessToken.getCurrentAccessToken();
                    console.log('FBUSER : ', fbUser);

                    // firebase
                    const firebaseUser = auth().currentUser;
                    console.log('Google Firebase User : ', firebaseUser);

                    if (firebaseUser) {
                      auth().signOut();
                      // await GoogleSignin.revokeAccess();
                      // await GoogleSignin.signOut();
                      // console.log('Sign Out From Google Firebase');
                    }
                    // else

                    // if (isSignin) {
                    //    auth().signOut();
                    //   await GoogleSignin.revokeAccess();
                    //   await GoogleSignin.signOut();
                    //   console.log('Sign Out From Google');
                    // }
                    // else if (fbUser) {
                    //   AccessToken.getCurrentAccessToken().then(data => {
                    //     if (data?.accessToken) {
                    //       auth().signOut();
                    //       LoginManager.logOut();
                    //       // console.log(data.accessToken.toString());
                    //       console.log('Sign Out From Facebook');
                    //     }
                    //   });
                    // }else{
                    //   auth().signOut();
                    // }
                    await AsyncStorage.setItem(
                      'USER',
                      JSON.stringify({name: 'logout'}),
                    );
                    props.navigation.replace(ScreenNames.AuthScreen);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              />
              <Text
                style={{
                  ...fonts.h6,
                  color: colors.primary_color,
                  alignSelf: 'center',
                  margin: 5,
                }}
                onPress={() => {
                  deleteUser(id);
                }}>
                {strings.delete}
              </Text>
              {/* <Text
            onPress={async () => {
          // await AsyncStorage.removeItem('USER');

          try {
            //google
            const isSignin = await GoogleSignin.isSignedIn();
            console.log('Google User : ', isSignin);

            //facebook
            const fbUser = await AccessToken.getCurrentAccessToken();
            console.log('FBUSER : ', fbUser);

            // firebase
            const firebaseUser = auth().currentUser;
            console.log('Google Firebase User : ', firebaseUser);

            if (firebaseUser) {
              auth().signOut();
              // await GoogleSignin.revokeAccess();
              // await GoogleSignin.signOut();
              // console.log('Sign Out From Google Firebase');
            }
            // else

            // if (isSignin) {
            //    auth().signOut();
            //   await GoogleSignin.revokeAccess();
            //   await GoogleSignin.signOut();
            //   console.log('Sign Out From Google');
            // }
            // else if (fbUser) {
            //   AccessToken.getCurrentAccessToken().then(data => {
            //     if (data?.accessToken) {
            //       auth().signOut();
            //       LoginManager.logOut();
            //       // console.log(data.accessToken.toString());
            //       console.log('Sign Out From Facebook');
            //     }
            //   });
            // }else{
            //   auth().signOut();
            // }
            await AsyncStorage.setItem(
              'USER',
              JSON.stringify({name: 'logout'}),
            );
            props.navigation.replace(ScreenNames.AuthScreen);
          } catch (error) {
            console.log(error);
          }
        }}>
        Log Out
      </Text> */}
              <Text
              // style={RtlStyles.text}
                onPress={async () => {
                  await AsyncStorage.setItem('CARTLIST', JSON.stringify([]));
                  Alert.alert('Cart List', strings.clrCart);
                }}>
                {strings.clrCart}
              </Text>
            </KeyboardAwareScrollView>
            {/* <FlatList
                data={List}
                renderItem={({item}) => (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      // deleteUser(item.id);
                      setopenModel(!openModel);
                    }}>
                    <Text style={fonts.h5}>{item.email}</Text>
                  </TouchableWithoutFeedback>
                )}
              /> */}
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    borderRadius: 100,
    height: sizes.height / 8,
    width: sizes.height / 8,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: colors.dark,
  },
  icon: {
    height: 30,
    width: 30,
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: colors.secondary_color,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
