import {View, Text, StyleSheet, Alert} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenNames} from '../navigation/ScreenNames';
import {GoogleSignin} from '@react-native-community/google-signin';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';

const ProfileScreen = props => {
  return (
    <View style={styles.mainConatiner}>
      <Text
        onPress={async () => {
          // await AsyncStorage.removeItem('USER');

          try {
            const firebaseUser=auth().currentUser
            console.log('Google Firebase User : ', firebaseUser);
            const isSignin = await GoogleSignin.isSignedIn();
            console.log('Google User : ', isSignin);
            if (firebaseUser) {
              auth().signOut();
              await GoogleSignin.revokeAccess();
              await GoogleSignin.signOut();
              console.log('Sign Out From Google Firebase');
            } 
            // else if (isSignin) {
            //   await GoogleSignin.revokeAccess();
            //   await GoogleSignin.signOut();
            //   console.log('Sign Out From Google');
            // } 
            else {
              AccessToken.getCurrentAccessToken().then(data => {
                if (data?.accessToken) {
                  console.log(data.accessToken.toString());
                  LoginManager.logOut();
                  console.log('Sign Out From Facebook');
                }
              });
            }
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
      </Text>
      <Text
        onPress={async () => {
          await AsyncStorage.setItem('CARTLIST', JSON.stringify([]));
          Alert.alert('Cart List', 'Clear Cart List');
        }}>
        Clear Cart List
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
