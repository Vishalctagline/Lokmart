import {View, Text, StyleSheet, Alert} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScreenNames} from '../navigation/ScreenNames';
import {GoogleSignin} from '@react-native-community/google-signin';
import {AccessToken, LoginManager, Profile} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';

const ProfileScreen = props => {
  return (
    <View style={styles.mainConatiner}>
      <Text
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
