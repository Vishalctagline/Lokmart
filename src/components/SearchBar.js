import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../styles/colors';
import {ScreenNames} from '../navigation/ScreenNames';

const SearchBar = props => {
  const [isFocus, setisFocus] = useState(false);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        // backgroundColor: 'blue',
      }}>
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 1,
          width: wp('70'),
          height: 54,
          borderRadius: 10,
          borderColor: isFocus ? colors.primary_color : colors.grey,
          // backgroundColor: 'red',
          alignItems: 'center',
        }}>
        <Icon
          name="search"
          size={25}
          color={colors.soft_grey}
          style={{padding: 10}}
        />
        <TextInput
          onFocus={() => {
            setisFocus(true);
          }}
          onBlur={() => {
            setisFocus(false);
          }}
          onPressIn={props.onPress}
          placeholder="Search..."
          placeholderTextColor={colors.soft_grey}
          returnKeyType={'search'}
          style={styles.input}
          value={props.txt}
          onChangeText={props.onSearch}
          onSubmitEditing={props.onSubmit}
        />
      </View>
      <TouchableWithoutFeedback
        onPress={() => {
          {
            props.home ?
            props.navigation.navigate(ScreenNames.SearchScreen):
            
            props.navigation.navigate(ScreenNames.FilterScreen, {
              onFilterPress: props.onFilter ? props.onFilter : () => {},
            });
          }
          
        }}>
        <View
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 10,
            borderColor: colors.grey,
            height: 54,
            width: 54,
            alignItems: 'center',
          }}>
          <Icon name="filter" size={30} color={colors.soft_grey} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    //   flex: 1,
    margin: 10,
    height: 50,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: colors.soft_grey,
    width: wp('53'),
  },
});

export default SearchBar;
