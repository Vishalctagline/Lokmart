import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Alert,
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
  const [txt, settxt] = useState('');
  const [todos, settodos] = useState([]);
  const [ID, setID] = useState();

  const [isUpdate, setisUpdate] = useState(false);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    // database().ref('/todos').once('value',(snapShot)=>{
    //   console.log(snapShot.val())
    // })
    database()
      .ref('/todos')
      .on('value', snapshot => {
        console.log('snapshot : ', snapshot);
        // console.log('item : ', snapshot.val());

        if (snapshot.exists()) {
          let list = [];
          snapshot.forEach(e => {
            console.log('item : ', e.val());
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

        <CustomInput
          value={txt}
          onChangeText={val => {
            settxt(val);
          }}
          placeholder={'Enter your Todo...'}
        />
        <CustomButton
          title={isUpdate ? 'Update Todo' : 'Add Todo'}
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
                    setisUpdate(false)
                  });
              } else {
                const id = Math.floor(Math.random() * 100);
                const todo = {id: id, todo: txt};
                database()
                  .ref('/todos/' + id)
                  .set(todo)
                  .then(() => {
                    Alert.alert('Todo', 'Todo added !');
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
          Clear all Todos
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
