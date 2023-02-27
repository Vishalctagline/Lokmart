import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../styles/colors';
import SearchBar from '../components/SearchBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {allGrocery} from '../assets/data/data';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {fonts} from '../styles/fonts';
import {ScreenNames} from '../navigation/ScreenNames';
import { useRtlContext } from 'react-native-easy-localization-and-rtl';
import strings from '../config/Localization';

const RecentItem = ({itemName, onPress}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
    }}>
    <Text
      style={{
        fontFamily: 'Poppins-Regular',
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 27,
        color: colors.dark,
      }}>
      {itemName}
    </Text>
    <Icon
      onPress={onPress}
      name="arrow-right"
      size={20}
      color={colors.soft_grey}
      style={{transform: [{rotateZ: '320deg'}]}}
    />
  </View>
);

const SearchResultItem = props => {

  // const {RtlStyles} = useRtlContext();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        props.navigation.navigate(ScreenNames.DetailScreen, {item: props.item});
      }}>
      <View
        style={{
          flex: 1,
          // backgroundColor: 'blue',
          marginVertical: 15,
          flexDirection: 'row',
          // ...RtlStyles.containerRow,
        }}>
        <Image
          style={{
            height: hp('15'),
            width: wp('32'),
            borderRadius: 20,
          }}
          source={props.item.image}
        />
        <View
          style={{
            flex: 1,
            // backgroundColor: 'yellow',
            marginHorizontal: 20,
            justifyContent: 'space-evenly',
          }}>
          <Text
            // numberOfLines={1}
            style={[
              // RtlStyles.text, 
              fonts.h5]}>
            {props.item.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // ...RtlStyles.containerRow,
            }}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                width: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                borderColor: '#B8BBC6',
                // ...RtlStyles.containerRow,
              }}>
              <Icon name="star" color={colors.ratingStart} />
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 10,
                  fontWeight: '600',
                  lineHeight: 18,
                  color: colors.dark,
                }}>
                {props.item.rate}
              </Text>
            </View>
            <View style={{width: 10}} />
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                fontWeight: '500',
                lineHeight: 18,
                color: colors.primary_color,
              }}>
              {props.item.rating} Ratings
            </Text>
          </View>
          <Text style={[
            // RtlStyles.text,
            fonts.h7]}>${props.item.price}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const SearchScreen = props => {

  // const {RtlStyles}=useRtlContext()

  const [txt, settxt] = useState('');
  const [searchedList, setsearchedList] = useState([]);
  const [filterList, setfilterList] = useState([]);
  const [recentSearch, setrecentSearch] = useState([]);

  useEffect(() => {
    if (!txt == '') {
      setsearchedList(
        allGrocery.filter(item =>
          // item.name.toLowerCase().includes(txt.toLowerCase())
          Object.values(item)
            .toString()
            .toLowerCase()
            .includes(txt.toLowerCase()),
        ),
      );
    } else {
      console.log('list empty')
      setsearchedList([]);
    }
  }, [txt]);

  return (
    <>
      <SafeAreaView
        style={{
          // paddingHorizontal: 30,
          backgroundColor: colors.white,
          // height: heightPercentageToDP('10'),
          marginTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
          flexDirection:'row',
          // ...RtlStyles.containerRow

        }}>
        <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Icon
            name="close"
            size={25}
            color={colors.black}
            style={{margin: 20}}
          />
        </TouchableWithoutFeedback>
      </SafeAreaView>
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 22,
            fontWeight: '600',
            color: colors.dark,
            marginHorizontal: 20,
            textAlign:'left',
            // ...RtlStyles.text,
          }}>
          {strings.search}
        </Text>
        <View style={{marginVertical: 10}}>
          <SearchBar
            {...props}
            txt={txt}
            onSearch={val => {
              settxt(val);
            }}
            onSubmit={() => {
              setrecentSearch([...recentSearch, txt]);
            }}
            onFilter={data => {
              console.log('onFilter called');
              if (searchedList.length == 0 || txt == '') {
                console.log(' txt empty ');
                setsearchedList(
                  allGrocery.filter(
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
                    // {
                    //   console.log(
                    //     'freeShppping: ',
                    //     data.freeShipping &&
                    //       item.freeShipping === data.freeShipping,
                    //   );
                    //   console.log(
                    //     'voucher: ',
                    //     data.voucher && item.voucher === data.voucher,
                    //   );
                    //   console.log(
                    //     'sameDayDelivery: ',
                    //     data.sameDayDelivery
                    //       && item.sameDayDelivery === data.sameDayDelivery

                    //   );
                    //   // &&
                    //   //     (data.voucher !== null
                    //   //       ? item.voucher === data.voucher
                    //   //       : true) &&
                    //   //     (data.sameDayDelivery !== null
                    //   //       ? item.sameDayDelivery === data.sameDayDelivery
                    //   //       : true),
                    //   // );
                    // }
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
              props.navigation.navigate(ScreenNames.SearchScreen);
            }}
          />
        </View>
        <View style={{marginHorizontal: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between',
          // ...RtlStyles.containerRow
          }}>
            <Text style={fonts.h5}>Recent Search</Text>
            <Text
              style={{...fonts.h8, color: colors.primary_color}}
              onPress={() => {
                setrecentSearch([]);
              }}>
              Clear All
            </Text>
          </View>
          <FlatList
            data={recentSearch}
            renderItem={({item, index}) => (
              <RecentItem
                itemName={item}
                onPress={() => {
                  settxt(item);
                }}
              />
            )}
          />
        </View>
        <View
          style={{height: 5, backgroundColor: colors.grey1, marginVertical: 10}}
        />
        <View style={{flex: 1, marginHorizontal: 20}}>
          <Text style={[fonts.h5,
            RtlStyles.text
            ]}>Search Result</Text>
          {searchedList.length == 0 ? (
            <Text style={{...fonts.h6, alignSelf: 'center'}}>
              No data Found
            </Text>
          ) : (
            <FlatList
              // ItemSeparatorComponent={() => (
              //   <View style={{height: 1, backgroundColor: colors.grey1}} />
              // )}
              showsHorizontalScrollIndicator={false}
              data={searchedList}
              renderItem={({item, index}) => (
                <>
                  <SearchResultItem item={item} {...props} />
                  <View style={{height: 1.5, backgroundColor: colors.grey1}} />
                </>
              )}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default SearchScreen;
