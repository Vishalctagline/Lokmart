import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
  Platform,
} from 'react-native';
import React from 'react';
import {fonts} from '../../styles/fonts';
import CustomInput from '../../components/CustomInput';
import {useState} from 'react';
import {GlobalStyles} from '../../styles/GlobalStyle';
import CustomButton from '../../components/CustomButton';
import {colors} from '../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

import database from '@react-native-firebase/database';
import {useEffect} from 'react';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {ScreenNames} from '../../navigation/ScreenNames';
import messaging, {firebase} from '@react-native-firebase/messaging';
import strings from '../../config/Localization';


const Todo = ({item, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.todoTile}>
        <Text>{item.todo}</Text>
        <Icon
          name="close"
          color={colors.secondary_color}
          size={20}
          onPress={() => {
            console.log('removed !');
            database()
              .ref('/todos/' + item.id)
              .remove()
              .then(() => {
                Alert.alert('Todo', 'Todo removed !');
              });
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const TodoScreen = props => {

  const [lang, setlang] = useState('en');

  const [txt, settxt] = useState('');
  const [todos, settodos] = useState([]);
  const [ID, setID] = useState();

  const [isUpdate, setisUpdate] = useState(false);

  const channelId = 'fcm_fallback_notification_channel';

  PushNotification.configure({
    onRegister: ({os, token}) => {
      console.log('OS : ', os);
      console.log('TOKEN : ', token);
    },
    onNotification: notification => {
      console.log(Platform.OS);
      console.log('NOTFICATION : ', notification);

      if (notification.foreground && !notification.userInteraction) {
        console.log('notification.foreground : ', notification.foreground);
        PushNotification.localNotification({
          foreground: notification.foreground,
          userInteraction: notification.userInteraction,
          message: notification.message,
          data: notification.data,
          channelId: channelId,
        });
      } else {
        props.navigation.navigate(ScreenNames.AuthScreen);
      }
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
  });

  useEffect(() => {

    console.log( strings.getLanguage())
    strings.setLanguage(lang);
    console.log( strings.getLanguage())

    getTodos();

    requestUserPermission();
    createChannel();
    registerAppWithFCM();
    getToken();
    messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage : ', remoteMessage);
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // if (Platform.OS == 'ios') {
        PushNotificationIOS.presentLocalNotification({
          alertBody: remoteMessage.notification.body,
        });
      // }
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        // PushNotificationIOS.presentLocalNotification({
        //   alertBody: remoteMessage.notification.body,
        // });
        if (remoteMessage) {
          props.navigation.navigate(ScreenNames.AuthScreen);
        }
      });

    // messaging().onNotificationOpenedApp(remoteMessage=>{
    //   console.log('remoteMessage : ', remoteMessage);
    //     // props.navigation.navigate(ScreenNames.AuthScreen);
    // })

    // messaging().setBackgroundMessageHandler(remoteMessage=>{
    //   console.log('remoteMessage : ', remoteMessage);
    // })

  }, [lang]);

  const createChannel = () => {
    PushNotification.getChannels(function (channel_ids) {
      console.log(channel_ids);
    });
    PushNotification.channelExists(channelId, exists => {
      if (!exists) {
        PushNotification.createChannel(
          {
            channelId: channelId,
            channelName: 'My channel',
            channelDescription: 'A channel to categorise your notifications',
            playSound: true,
            soundName: 'default',
          },
          created => {
            console.log('channel created ', created);
          },
        );
      }
    });
  };

  async function registerAppWithFCM() {
    await messaging().registerDeviceForRemoteMessages();
  }
  async function getToken() {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log('Token : ', token);
  }

  async function requestUserPermission() {
    const authStatus = await firebase.messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const getTodos = () => {
    // database().ref('/todos').once('value',(snapShot)=>{
    //   console.log(snapShot.val())
    // })
    database()
      .ref('/todos')
      .on('value', snapshot => {
        // console.log('snapshot : ', snapshot);
        // console.log('item : ', snapshot.val());

        if (snapshot.exists()) {
          let list = [];
          snapshot.forEach(e => {
            // console.log('item : ', e.val());
            list.push(e.val());
            settodos(list);
          });
        } else {
          settodos([]);
        }
      });
  };

  return (
    <SafeAreaView style={GlobalStyles.mainContainer}>
      <View style={GlobalStyles.mainContainer}>
        <Text style={styles.title}>TodoScreen</Text>

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text
            onPress={() => {
              setlang('en');
            }}>
            English
          </Text>
          <Text
            onPress={() => {
              setlang('it');
            }}>
            Itailan
          </Text>
          <Text
            onPress={() => {
              setlang('hi');
            }}>
            Hindi
          </Text>
        </View>

        <CustomInput
          value={txt}
          onChangeText={val => {
            settxt(val);
          }}
          placeholder={strings.plcTxt}
        />
        <CustomButton
          title={isUpdate ? strings.updateTodo : strings.addTodo}
          onPress={() => {
            if (txt.trim() == '') {
              Alert.alert('Todo', 'Please enter some Todo !');
            } else {
              if (isUpdate) {
                const todo = {id: ID, todo: txt};
                database()
                  .ref('/todos/' + ID)
                  .set(todo)
                  .then(() => {
                    Alert.alert('Todo', 'Todo updated !');
                    settxt('');
                    setisUpdate(false);
                  });
              } else {
                const id = Math.floor(Math.random() * 100);
                const todo = {id: id, todo: txt};
                database()
                  .ref('/todos/' + id)
                  .set(todo)
                  .then(() => {
                    Alert.alert('Todo', 'Todo added !');
                    PushNotification.localNotification({
                      message: `Your New Todo ${txt} is added !`,
                      channelId: 'fcm_fallback_notification_channel',
                    });
                    settxt('');
                  });
                // settodos([...todos, todo]);
                // console.log(todos);
              }
            }
          }}
        />
        <Text
          style={{...styles.text}}
          onPress={() => {
            database()
              .ref('/todos')
              .set(null)
              .then(() => {
                Alert.alert('Todo', 'Cleared all Todos !');
              });
            // settodos([]);
          }}>
          {strings.clrTodo}
        </Text>
        <View style={{flex: 1, justifyContent: 'center'}}>
          {todos.length == 0 ? (
            <Text style={{alignSelf: 'center'}}>No Todos Found !</Text>
          ) : (
            <FlatList
              data={todos}
              renderItem={({item}) => (
                <Todo
                  item={item}
                  onPress={() => {
                    settxt(item.todo);
                    setID(item.id);
                    setisUpdate(true);
                  }}
                />
              )}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    ...fonts.h1,
    alignSelf: 'center',
  },
  text: {
    ...fonts.h6,
    alignSelf: 'center',
    color: colors.primary_color,
  },
  todoTile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
});

export default TodoScreen;
