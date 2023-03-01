import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  View,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Alert,
  I18nManager,
} from 'react-native';
import OnboardingScreen2 from './src/screens/OnboardingScreen2';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import SignInScreen from './src/screens/auth/SignInScreen';
import BottomTabNavigation from './src/navigation/BottomTabNavigation';
import CategoryScreen from './src/screens/CategoryScreen';
import ProductScreen from './src/screens/ProductScreen';
import DetailScreen from './src/screens/DetailScreen';
import SearchScreen from './src/screens/SearchScreen';
import FilterScreen from './src/screens/FilterScreen';
import ShoppingCartScreen from './src/screens/ShoppingCartScreen';
import {fonts} from './src/styles/fonts';
import ShoppingAddressScreen from './src/screens/ShoppingAddressScreen';
import AddNewCardScreen from './src/screens/AddNewCardScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenNames} from './src/navigation/ScreenNames';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
import PhoneNumSignInScreen from './src/screens/PhoneNumSignInScreen';
import TodoScreen from './src/screens/realtimeDatabase/TodoScreen';
import strings, {getLang} from './src/config/Localization';
import { RTLProvider, useRtlContext } from 'react-native-easy-localization-and-rtl';
import MapScreen from './src/screens/MapScreen';

const Stack = createNativeStackNavigator();

const AuthScreens = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={ScreenNames.OnboardingScreen2}
        component={OnboardingScreen2}
      />
      <Stack.Screen name={ScreenNames.SigninScreen} component={SignInScreen} />
      <Stack.Screen name={ScreenNames.SignupScreen} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  // const {RtlStyles,isRtl,language,setLanguage}=useRtlContext()

  const [username, setusername] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  // useEffect(async () => {
  //   const user = await AsyncStorage.getItem('USER');
  //   console.log(user)
  //   setusername(user);
  //   console.log(username)
  // },[]);

  const getCartListOfuser = async id => {
    console.log('ID of User : ', id);
    await fetch(`https://dummyjson.com/carts/user/${id}`)
      .then(res => res.json())
      .then(async json => {
        await AsyncStorage.setItem('CARTLIST', JSON.stringify(json.carts[0]));
      })
      .catch(e => Alert.alert('Lokmart', `Error : ${e}`));
  };

  useEffect(() => {
    getinitLanguage();

    GoogleSignin.configure({
      webClientId:
        '625967762187-89g50n94paickqdk6oi5rsq8vsmdhvo3.apps.googleusercontent.com',
      iosClientId:
        '625967762187-rrid1u5qfc85k49n3lq265bujm3dbli3.apps.googleusercontent.com',
      offlineAccess: true,
    });
    // (async () => {
    //   const user = await AsyncStorage.getItem('USER');
    //   console.log(user);
    //   setusername(user);
    //   console.log(username);
    // })();

    getUser();

    // isSignedIn();
  }, []);

  const getinitLanguage = async () => {
    // console.log('isrtl : : : ',isRtl)
    console.log('I18nManager.isRTL ; ', I18nManager.isRTL);
    console.log(strings.getLanguage())
    const language = await getLang();
    // if (language.isRTL) {
    //   // I18nManager.allowRTL(true);
    //   I18nManager.forceRTL(true);
    // } else {
    //   // I18nManager.allowRTL(false);
    //   I18nManager.forceRTL(false);
    // }
    strings.setLanguage(language.lang);
    console.log('lang : ', language.lang);
    console.log('isRTL : ', language.isRtl);
    // setLanguage(language.lang);
    // console.log( strings.getLanguage())
  };

  const getUser = async () => {
    // let user = JSON.parse(await AsyncStorage.getItem('USER'));
    // setusername(user.username);
    // console.log('USER : '+ user.username +" ID : " +user.id);
    // if(user.id){
    //   getCartListOfuser(user.id);
    // }

    let user = JSON.parse(await AsyncStorage.getItem('USER'));
    console.log('async get item : ', user);
    if (user == null) {
      await AsyncStorage.setItem('USER', JSON.stringify({name: 'logout'}));
      user = JSON.parse(await AsyncStorage.getItem('USER'));
    }
    if (user.name || user.username || user.phoneNumber) {
      if (user.phoneNumber) {
        setusername(user.phoneNumber);
      } else {
        setusername(user.name ? user.name : user.username);
      }
    } else {
      setusername('User');
    }

    // isSignedIn();
  };

  const isSignedIn = async () => {
    const isSignIn = await GoogleSignin.isSignedIn();
    console.log('Google issignin', isSignIn);
    if (isSignIn) {
      getCurrentUserInfo();
    } else {
      console.log('Please Login (for Google)!!');
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setusername(userInfo.user.name);
      await AsyncStorage.setItem('USER', JSON.stringify(userInfo.user));
      // console.log(userInfo.user.name);
    } catch (error) {
      console.log('getCurrentUserInfo ERROR : ', error.code);
      // getUser();
    }
  };

  if (!username) {
    // console.log('render...');
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    // <RTLProvider>
    <Provider store={store}>
      <View style={{flex: 1}}>
        {/* {console.log('render----')} */}
        {/* <StatusBar
          translucent
          backgroundColor="transparent"
          // barStyle="light-content"
        /> */}
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            // initialRouteName={username == 'logout' ? 'AuthScreen' : 'Home'}
            initialRouteName={ScreenNames.MapScreen}
            // initialRouteName={ScreenNames.TodoScreen}
          >
            <Stack.Screen
              name={ScreenNames.AuthScreen}
              component={AuthScreens}
            />

            <Stack.Screen
              initialParams={{user: username}}
              name={ScreenNames.HomeTab}
              component={BottomTabNavigation}
            />
            <Stack.Screen
              name={ScreenNames.CategoryScreen}
              component={CategoryScreen}
            />
            <Stack.Screen
              name={ScreenNames.ProductScreen}
              component={ProductScreen}
            />
            <Stack.Screen
              name={ScreenNames.DetailScreen}
              component={DetailScreen}
            />
            <Stack.Screen
              name={ScreenNames.SearchScreen}
              component={SearchScreen}
            />
            <Stack.Screen
              name={ScreenNames.FilterScreen}
              component={FilterScreen}
            />
            <Stack.Screen
              name={ScreenNames.ShoppingCartScreen}
              component={ShoppingCartScreen}
            />
            <Stack.Screen
              name={ScreenNames.ShoppingAddressScreen}
              component={ShoppingAddressScreen}
            />
            <Stack.Screen
              name={ScreenNames.AddNewCardScreen}
              component={AddNewCardScreen}
            />
            <Stack.Screen
              name={ScreenNames.PhoneNumSignInScreen}
              component={PhoneNumSignInScreen}
            />

            <Stack.Screen
              name={ScreenNames.TodoScreen}
              component={TodoScreen}
            />

            <Stack.Screen name={ScreenNames.MapScreen} component={MapScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
    // </RTLProvider>
  );
};

export default App;
