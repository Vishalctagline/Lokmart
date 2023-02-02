import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MyOrdersScreen from '../screens/MyOrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WishlistScreen from '../screens/WishlistsScreen';
import ShoppingCartScreen from '../screens/ShoppingCartScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import {heightPercentageToDP} from 'react-native-responsive-screen-hooks';

import MaskedView from '@react-native-masked-view/masked-view';
import {fonts} from '../styles/fonts';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import { ScreenNames } from './ScreenNames';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = ({route}) => {
  // console.log(route.params.user)
  return (
    <Tab.Navigator
      initialRouteName={ScreenNames.HomeScreen}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.primary_color,
        tabBarStyle: {height: heightPercentageToDP('10')},
        // tabBarIconStyle: {bottom: -25},
      }}>
      <Tab.Screen
        initialParams={route.params}
        name={ScreenNames.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size, focused}) =>
            // <Icon name="home" size={size} color={color} />
            focused ? (
              <MaskedView
                style={{flex: 1, flexDirection: 'row', height: size}}
                maskElement={
                  <View
                    style={{
                      // backgroundColor: 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',
                      // borderWidth: 1,
                      // height: 60,
                    }}>
                    <View
                      style={{
                        height: 2,
                        backgroundColor: 'white',
                        width: 22,
                        marginBottom: 15,
                      }}
                    />
                    <Icon name="home" size={size + 2} color="white" />
                  </View>
                }>
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 1}}
                  colors={[colors.primary_color, colors.secondary_color]}
                  style={{
                    flex: 1,
                    height: '100%',
                  }}
                />
              </MaskedView>
            ) : (
              <Icon
                name="home"
                size={size + 2}
                color={color}
                style={{
                  // backgroundColor: 'transparent',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  marginTop: 15,
                  // borderWidth: 1,
                  // height: 40,
                  // height: size,
                  flex: 1,
                }}
              />
            ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.MyOrdersScreen}
        component={MyOrdersScreen}
        options={{
          tabBarIcon: ({color, size, focused}) =>
            // <Icon name="shopping-bag" size={size} color={color} />
            focused ? (
              <MaskedView
                style={{flex: 1, flexDirection: 'row', height: size}}
                maskElement={
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',
                      // borderWidth: 1,
                      // height: 40,
                    }}>
                    <View
                      style={{
                        height: 2,
                        backgroundColor: 'white',
                        width: 22,
                        marginBottom: 15,
                      }}
                    />
                    <Icon
                      name="shopping-bag"
                      size={size + 2}
                      color="white"
                      // style={styles.shadow}
                    />
                  </View>
                }>
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 1}}
                  colors={[colors.primary_color, colors.secondary_color]}
                  style={{
                    flex: 1,
                    height: '100%',
                  }}
                />
              </MaskedView>
            ) : (
              <Icon
                name="shopping-bag"
                size={size + 2}
                color={color}
                style={{
                  // backgroundColor: 'transparent',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  marginTop: 15,

                  // borderWidth: 1,
                  // height: 40,
                  flex: 1,
                }}
              />
            ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.ShoppingCartScreen}
        component={ShoppingCartScreen}
        initialParams={{navi: false}}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <View
              style={
                focused
                  ? {
                      flex: 1,
                      borderTopColor: colors.primary_color,
                      borderTopWidth: 2,
                      width: 25,
                      alignItems: 'center',
                    }
                  : {flex: 1}
              }>
              <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 1, y: 1}}
                colors={[colors.primary_color, colors.secondary_color]}
                style={{
                  height: 45,
                  width: 45,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15,
                  marginTop: 10,
                }}>
                <Icon name="shopping-cart" size={size} color={colors.white} />
              </LinearGradient>
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={ScreenNames.WishlistScreen}
        component={WishlistScreen}
        options={{
          tabBarIcon: ({color, size, focused}) =>
            // <Icon name="heart" size={size} color={color} />
            focused ? (
              <MaskedView
                style={{flex: 1, flexDirection: 'row', height: size}}
                maskElement={
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',
                      // borderWidth: 1,
                      // height: 40,
                    }}>
                    <View
                      style={{
                        height: 2,
                        backgroundColor: 'white',
                        width: 22,
                        marginBottom: 15,
                      }}
                    />

                    <Icon
                      name="heart"
                      size={size + 2}
                      color="white"
                      // style={styles.shadow}
                    />
                  </View>
                }>
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 1}}
                  colors={[colors.primary_color, colors.secondary_color]}
                  style={{
                    flex: 1,
                    height: '100%',
                  }}
                />
              </MaskedView>
            ) : (
              <Icon
                name="heart"
                size={size + 2}
                color={color}
                style={{
                  // backgroundColor: 'transparent',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  marginTop: 15,

                  // borderWidth: 1,
                  // height: 40,
                  flex: 1,
                }}
              />
            ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.ProfileScreen}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size, focused}) =>
            // <Icon name="user" size={size} color={color} />
            focused ? (
              <MaskedView
                style={{flex: 1, flexDirection: 'row', height: size}}
                maskElement={
                  <View
                    style={{
                      backgroundColor: 'transparent',
                      justifyContent: 'center',
                      alignItems: 'center',
                      // borderWidth: 1,
                      // height: 40,
                    }}>
                    <View
                      style={{
                        height: 2,
                        backgroundColor: 'white',
                        width: 22,
                        marginBottom: 15,
                      }}
                    />

                    <Icon
                      name="user"
                      size={size + 2}
                      color="white"
                      // style={styles.shadow}
                    />
                  </View>
                }>
                <LinearGradient
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 1}}
                  colors={[colors.primary_color, colors.secondary_color]}
                  style={{
                    flex: 1,
                    height: '100%',
                  }}
                />
              </MaskedView>
            ) : (
              <Icon
                name="user"
                size={size + 2}
                color={color}
                style={{
                  // backgroundColor: 'transparent',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  marginTop: 15,
                  // borderWidth: 1,
                  // height: 40,
                  flex: 1,
                }}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  header: {...fonts.h4, alignSelf: 'center'},
});

export default BottomTabNavigation;
