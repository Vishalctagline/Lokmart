import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../styles/colors';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/FontAwesome';
import {allGrocery} from '../assets/data/data';
import GroceryCard from '../components/GroceryCard';
import {GlobalStyles} from '../styles/GlobalStyle';
import SearchBar from '../components/SearchBar';
import {ScreenNames} from '../navigation/ScreenNames';
import { fonts } from '../styles/fonts';

const WishlistsScreen = props => {
  // console.log(favList)

  const [wishlistItemList, setwishlist] = useState([]);
  const [isSearch, setisSearch] = useState(false);
  const [txt, settxt] = useState('');
  const [searchedList, setsearchedList] = useState([]);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      console.log('on focus')
      // settxt('')
      setwishlist(allGrocery.filter(item => item.isFavorite));
      // console.log('render on focus');
    });
    props.navigation.addListener('tabPress', () => {
      settxt('');
      setisSearch(false)
      setwishlist(allGrocery.filter(item => item.isFavorite));
      console.log('render on tabpress');
    });
    if (txt != '') {
      console.log('txt isn\'t empty')
      setsearchedList(
        wishlistItemList.filter(
          item => item.name.toLowerCase().includes(txt.toLowerCase()),
          // Object.values(item)
          // .toString()
          // .toLowerCase()
          // .includes(txt.toLowerCase()),
        ),
        // console.log(searchedList),
      );
      // console.log(searchedList);
    } else {
      console.log("txt is empty");
      setsearchedList([]);
    }
    
  }, [props.navigation, txt]);

  return (
    <View
      style={{...GlobalStyles.mainContainer, paddingTop: getStatusBarHeight()}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 22,
            fontWeight: '600',
            lineHeight: 33,
            color: colors.dark,
          }}>
          Wishlists
        </Text>
        <Icon
          name="search"
          size={20}
          onPress={() => {
            setisSearch(!isSearch);
          }}
        />
      </View>
      {isSearch && (
        <View style={{marginVertical: 10, marginHorizontal: -20}}>
          <SearchBar
            {...props}
            txt={txt}
            onSearch={val => {
              settxt(val);
            }}
            onFilter={data => {
              console.log('onFilter called');
              if (searchedList.length == 0 || txt == '') {
                console.log(' txt empty ');
                setsearchedList(
                  wishlistItemList.filter(
                    item =>
                      parseFloat(item.price) >= parseFloat(data.lowPrice) &&
                      parseFloat(item.price) <= parseFloat(data.highPrice) &&
                      parseInt(item.rate) >= parseFloat(data.minStar) &&
                      parseFloat(item.rate) <= parseFloat(data.maxStar) &&
                      parseFloat(item.discount ? item.discount : '0') >=
                        parseFloat(data.minDiscnt) &&
                      parseFloat(item.discount ? item.discount : '0') <=
                        parseFloat(data.maxDiscnt) &&
                      (data.discount
                        ? item.discount
                        : true) &&
                      (data.freeShipping
                        ? item.freeShipping === data.freeShipping
                        : true) &&
                      (data.voucher ? item.voucher === data.voucher : true) &&
                      (data.sameDayDelivery
                        ? item.sameDayDelivery === data.sameDayDelivery
                        : true) &&
                      (data.category
                        ? item.category === data.category
                        : item.category !== data.category),
                  ),
                );
              } else {
                console.log(' txt NOT empty ');
                setsearchedList(
                  searchedList.filter(
                    item =>
                      parseFloat(item.price) >= parseFloat(data.lowPrice) &&
                      parseFloat(item.price) <= parseFloat(data.highPrice) &&
                      parseInt(item.rate) >= parseFloat(data.minStar) &&
                      parseFloat(item.rate) <= parseFloat(data.maxStar) &&
                      parseFloat(item.discount ? item.discount : '0') >=
                        parseFloat(data.minDiscnt) &&
                      parseFloat(item.discount ? item.discount : '0') <=
                        parseFloat(data.maxDiscnt) &&
                      (data.discount ? item.discount : true) &&
                      (data.freeShipping
                        ? item.freeShipping === data.freeShipping
                        : true) &&
                      (data.voucher ? item.voucher === data.voucher : true) &&
                      (data.sameDayDelivery
                        ? item.sameDayDelivery === data.sameDayDelivery
                        : true) &&
                      (data.category
                        ? item.category === data.category
                        : item.category !== data.category),
                  ),
                );
              }
              // props.navigation.goBack();
              props.navigation.navigate(ScreenNames.WishlistScreen);
              console.log('goback');
            }}
          />
        </View>
      )}
      {wishlistItemList.length == 0 ? (
        <View style={{justifyContent: 'center', flex: 1}}>
            <Text style={{...fonts.h6, alignSelf: 'center'}}>
              No Wishlist Found.
            </Text>
          </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={searchedList.length == 0 ? wishlistItemList : searchedList}
          renderItem={({item, index}) => (
            <GroceryCard
              item={item}
              {...props}
              onPress={() => {
                let data = [...wishlistItemList];
                data[index].isFavorite = data[index].isFavorite ? false : true;
                setwishlist(data.filter(item => item.isFavorite));
              }}
            />
          )}
        />
      )}
    </View>
  );
};

export default WishlistsScreen;
