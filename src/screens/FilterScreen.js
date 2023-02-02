import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  FlatList,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors} from '../styles/colors';
import RangeSlider from 'rn-range-slider';
import {fonts} from '../styles/fonts';
import RadioButtonRN from 'radio-buttons-react-native';
import {allGrocery, categories} from '../assets/data/data';
import CheckBox from '@react-native-community/checkbox';
import CustomButton from '../components/CustomButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {heightPercentageToDP} from 'react-native-responsive-screen-hooks';
import CustomHeader from '../components/CustomHeader';
import {GlobalStyles} from '../styles/GlobalStyle';
import RNRestart from 'react-native-restart';

const Seperator = () => (
  <View
    style={{height: 1, backgroundColor: colors.grey1, marginVertical: 20}}
  />
);

const RadioBox = props => {
  const [initVal, setinitVal] = useState(-1)
  console.log('render radio');
  // console.log(props.isReset);

  useEffect(() => {
    console.log('useEffect',initVal)
    setinitVal(-1)
  }, [props.isReset])
  
  
  return (
    <RadioButtonRN
      style={{marginTop: 15}}
      box={false}
      boxStyle={{flexDirection: 'row-reverse', marginVertical: 10}}
      textStyle={fonts.h6}
      circleSize={12}
      activeColor={colors.solid_primary}
      data={props.data}
      selectedBtn={e => {
        console.log(e);
        setinitVal(e?.id);
        props.onPress(e);
      }}
      initial={initVal}
    />
  );
};

const CheckBoxContainer = props => {
  // console.log('render check');
  const [isChecked, setisChecked] = useState(false);
  // console.log(props.isReset);
  useEffect(() => {
    // console.log('setting false')
    setisChecked(false);
  }, [props.isReset]);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
      }}>
      <CheckBox
        style={{
          height: 20,
          width: 20,
        }}
        tintColors={{true: colors.solid_primary}}
        tintColor={colors.soft_grey}
        onCheckColor={colors.white}
        onFillColor={colors.solid_primary}
        onTintColor={colors.solid_primary}
        animationDuration={0}
        value={isChecked}
        onValueChange={() => {
          // console.log(!isChecked)
          setisChecked(!isChecked);
          props.onPress();
        }}
        boxType={'square'}
      />
      <View style={{width: 10}} />
      <Text numberOfLines={1} style={{...fonts.h6, flex: 1}}>
        {props.text}
      </Text>
    </View>
  );
};


const FilterScreen = props => {
  const [isChecked, setisChecked] = useState(false);
  const [isReset, setisReset] = useState(false);
  const [filter, setfilter] = useState({
    lowPrice: '10',
    highPrice: '500',
    minStar: '0',
    maxStar: '5',
    minDiscnt: '0',
    maxDiscnt: '100',
    discount: false,
    freeShipping: false,
    voucher: false,
    sameDayDelivery: false,
    category: '',
  });
  let category = [];
  const catList = categories.map(item => item.name);
  var i=1;
  catList.forEach(v => {
    category.push({label: v,id:i});
    i++;
  });
console.log(category)
  useEffect(() => {
    if (isReset) {
      setisReset(false);
    }
  }, [filter]);

  // console.log(category)
  return (
    <>
      <CustomHeader
        title={'Filter Options'}
        {...props}
        close
        reset
        resetOnPress={
          // resetFuc
          () => {
            console.log('reset clicked');
            setisReset(true);
            setfilter({
              lowPrice: '10',
              highPrice: '500',
              minStar: '0',
              maxStar: '5',
              minDiscnt: '0',
              maxDiscnt: '100',
              discount: false,
              freeShipping: false,
              voucher: false,
              sameDayDelivery: false,
              category: '',
            });
          }
        }
      />
      <View style={GlobalStyles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={Platform.OS === 'android' ? {marginTop: 20} : {}}>
          <Text style={fonts.h5}>SORT BY PRICE RANGE</Text>
          <RangeSlider
            style={{
              // backgroundColor:'red',
              marginTop: 40,
              // marginVertical: 20,
              paddingHorizontal: 5,
            }}
            min={10}
            max={500}
            low={filter.lowPrice}
            high={filter.highPrice}
            floatingLabel={true}
            allowLabelOverflow={true}
            step={1}
            renderThumb={() => (
              <View
                style={{
                  height: 25,
                  width: 25,
                  borderRadius: 20,
                  backgroundColor: colors.solid_primary,
                  borderColor: colors.white,
                  borderWidth: 2.5,
                  shadowColor: colors.dark,
                  shadowOpacity: 0.5,
                  shadowOffset: {height: 0, width: 0},
                  shadowRadius: 5,
                  elevation: 10,
                }}
              />
            )}
            renderRailSelected={() => (
              <View
                style={{
                  flex: 1,
                  height: 2,
                  backgroundColor: colors.solid_primary,
                }}
              />
            )}
            renderRail={() => (
              <View
                style={{flex: 1, height: 2, backgroundColor: colors.grey1}}
              />
            )}
            renderLabel={value => (
              <View>
                <Text style={{...fonts.h6, color: colors.soft_grey}}>
                  ${value}
                </Text>
              </View>
            )}
            onSliderTouchEnd={(low, high) => {
              console.log('low:' + low + 'high:' + high);
              setfilter({
                ...filter,
                lowPrice: low,
                highPrice: high,
              });
            }}
          />
          <Seperator />
          <Text style={fonts.h5}>SORT BY RATING</Text>
          <RadioBox
            isReset={isReset}
            data={[
              {label: '1-2 Stars', minStar: '1', maxStar: '2',id:1},
              {label: '2-3 Stars', minStar: '2', maxStar: '3',id:2},
              {label: '3-4 Stars', minStar: '3', maxStar: '4',id:3},
              {label: '4-5 Stars', minStar: '4', maxStar: '5',id:4},
            ]}
            onPress={e => {
              // console.log(e.minStar);
              setfilter({
                ...filter,
                minStar: e?.minStar,
                maxStar: e?.maxStar,
              });
            }}
            {...props}
          />
          <Seperator />
          <Text style={fonts.h5}>SORT BY DISCOUNTS</Text>
          <RadioBox
            isReset={isReset}
            data={[
              {label: '10-20%', minDiscnt: '10', maxDiscnt: '20',id:1},
              {label: '25-50%', minDiscnt: '25', maxDiscnt: '50',id:2},
              {label: '50-70%', minDiscnt: '50', maxDiscnt: '70',id:3},
              {label: '70% above', minDiscnt: '70', maxDiscnt: '100',id:4},
            ]}
            onPress={e => {
              // console.log('MAX : '+e.maxDiscnt+' MIN : '+e.minDiscnt)
              setfilter({
                ...filter,
                minDiscnt: e?.minDiscnt,
                maxDiscnt: e?.maxDiscnt,
              });
            }}
          />
          <Seperator />
          <Text style={fonts.h5}>SORT BY OTHERS</Text>
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <CheckBoxContainer text="Discount" />
          <CheckBoxContainer text="Free Shipping" />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <CheckBoxContainer text="Voucher" />
          <CheckBoxContainer text="Same Day Delivery" />
        </View> */}
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={{flex: 1, marginTop: 15}}
            numColumns={2}
            // horizontal
            data={[
              {text: 'Discount'},
              {text: 'Free Shipping'},
              {text: 'Voucher'},
              {text: 'Same Day Delivery'},
            ]}
            renderItem={({item, index}) => (
              <CheckBoxContainer
                isReset={isReset}
                text={item.text}
                {...props}
                onPress={() => {
                  const txt = item.text;
                  console.log(txt);
                  // if (txt == 'Discount') {
                  //   setfilter({
                  //     ...filter,
                  //     discount: !discount,
                  //   });
                  // }
                  if (txt == 'Discount') {
                    setfilter({
                      ...filter,
                      discount: !filter.discount,
                    });
                  }
                  if (txt == 'Voucher') {
                    setfilter({
                      ...filter,
                      voucher: !filter.voucher,
                    });
                  }
                  if (txt == 'Free Shipping') {
                    setfilter({
                      ...filter,
                      freeShipping: !filter.freeShipping,
                    });
                  }
                  if (txt == 'Same Day Delivery') {
                    setfilter({
                      ...filter,
                      sameDayDelivery: !filter.sameDayDelivery,
                    });
                  }
                  // setfilter({
                  //   ...filter,
                  //   txt: !isChecked,
                  // });
                  // setisChecked(!isChecked);
                }}
              />
            )}
          />
          <Seperator />
          <Text style={fonts.h5}>SORT BY CATEGORIES</Text>
          <RadioBox
            isReset={isReset}
            data={category}
            onPress={e => {
              console.log(e?.label);
              setfilter({...filter, category: e?.label});
            }}
          />
        </ScrollView>
        <View
          style={{
            bottom: 1,
            padding: 20,
            backgroundColor: colors.white,
          }}>
          <CustomButton
            title={'Apply Filter'}
            onPress={() => {
              console.log(filter);
              props.route.params.onFilterPress(filter);
              // props.navigation.navigate(ScreenNames.SearchScreen)
            }}
          />
        </View>
      </View>
    </>
  );
};

export default FilterScreen;
