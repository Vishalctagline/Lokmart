import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  SafeAreaView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../styles/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen-hooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import {fonts} from '../styles/fonts';
import CustomButton from '../components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {ScreenNames} from '../navigation/ScreenNames';
import CustomHeader from '../components/CustomHeader';
import {GlobalStyles} from '../styles/GlobalStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';
import strings from '../config/Localization';

const ProductCard = props => {
  // const [cnt, setcnt] = useState(props.item.cnt);
  const [cnt, setcnt] = useState(props.item.quantity);
  useEffect(() => {
    if (props.item.cnt) {
      setcnt(props.item.cnt);
    }
  }, [props.item.cnt]);

  const increment = async () => {
    setcnt(c => c + 1);

    // const list = JSON.parse(await AsyncStorage.getItem('CARTLIST'));
    // list.map(i => {
    //   if (i.id === props.item.id) {
    //     i.cnt = i.cnt + 1;
    //   }
    // });
    // await AsyncStorage.setItem('CARTLIST', JSON.stringify([...list]));
    // props.getCartList();
    // setcnt(cnt + 1);
  };

  const decrement = async () => {
    cnt > 1 && setcnt(c => c - 1);

    // if (cnt > 1) {
    //   const list = JSON.parse(await AsyncStorage.getItem('CARTLIST'));
    //   list.map(i => {
    //     if (i.id === props.item.id) {
    //       i.cnt = i.cnt - 1;
    //     }
    //   });
    //   await AsyncStorage.setItem('CARTLIST', JSON.stringify([...list]));
    //   props.getCartList();
    //   setcnt(cnt - 1);
    // }
  };

  return (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: colors.grey1,
        flexDirection: 'row',
        padding: 20,
        marginVertical: 10,
        // backgroundColor: 'red',
      }}>
      <View>
        <Image
          style={{height: wp('20'), width: wp('20'), borderRadius: 20}}
          source={props.item.image}
        />
      </View>
      <View style={{width: 15}} />
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text
              numberOfLines={1}
              style={{
                overflow: 'visible',
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                fontWeight: '600',
                color: colors.dark,
              }}>
              {/* {props.item.name} */}
              {props.item.title}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
                fontWeight: '500',
                color: colors.soft_grey,
              }}>
              {/* {props.item.category} */}
            </Text>
          </View>
          <Text
            onPress={props.onDelete}
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              fontWeight: '800',
              color: colors.primary_color,
            }}>
            X
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            // backgroundColor:'blue',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                fontWeight: '600',
                color: colors.dark,
              }}>
              {/* ${props.item.price * cnt} */}$ {props.item.price * cnt}
            </Text>
            <View style={{width: 8}} />
            {/* <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 10,
                fontWeight: '400',
                color: colors.soft_grey,
                textDecorationLine: 'line-through',
              }}>
              ${props.item.price}
            </Text> */}
          </View>

          {/* ---Counter---- */}
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableWithoutFeedback onPress={decrement}>
              <View style={styles.qtyBtn}>
                <Icon name="minus" size={15} color={colors.dark} />
              </View>
            </TouchableWithoutFeedback>
            <Text
              style={{
                marginHorizontal: 15,
                fontFamily: 'Poppins-Regular',
                fontSize: 18,
                fontWeight: '500',
                color: colors.dark,
                alignSelf: 'center',
                textAlign: 'center',
              }}>
              {cnt}
              {/* {props.item.total} */}
            </Text>
            <TouchableWithoutFeedback onPress={increment}>
              <View
                style={{
                  ...styles.qtyBtn,
                  backgroundColor: 'rgba(255,140,0, 0.15)',
                }}>
                <Icon name="plus" size={15} color={colors.primary_color} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </View>
  );
};

const DetailView = ({detail, amount, color}) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 5,
    }}>
    <Text style={{...fonts.h6, color}}>{detail}</Text>
    <Text style={fonts.h6}>{`$ ${amount}`}</Text>
  </View>
);

// const getCartList = async (props) => {
//   const list = JSON.parse(await AsyncStorage.getItem('CARTLIST'));
//   if (list == null) {
//     console.log('empty', []);
//     // return [];
//     props.setcartList([]);
//   } else {
//     console.log('list form local', list);
//     // return list;
//     props.setcartList(list);
//   }
// };

const ShoppingCartScreen = props => {
  // const {RtlStyles}=useRtlContext()

  // console.log("NEW ITEM",props.route.params.newItem)
  const [user, setuser] = useState({});
  const [cartList, setcartList] = useState([]);
  const [total, settotal] = useState(0);
  const deliveryFee = 10.08;
  const taxes = 15.02;

  const newCart = props.route.params.newCart
    ? props.route.params.newCart
    : null;
  console.log('newcart : ', newCart);

  const getCartList = async () => {
    let user = JSON.parse(await AsyncStorage.getItem('USER'));
    setuser(user);
    const id = user.id;
    console.log('ID : ', id);

    const oldCart = JSON.parse(await AsyncStorage.getItem('CARTLIST'));
    console.log('oldCart : ', oldCart);
    if (oldCart == null) {
      await AsyncStorage.setItem('CARTLIST', JSON.stringify(newCart));
      setcartList(newCart?.products);
      settotal(newCart?.total);
    } else {
      setcartList(oldCart.products);
      settotal(oldCart.total);

      // console.log('NEW CART :: ', newCart);
      // console.log('OLD CART :: ', oldCart);
      // console.log('NEW PRODUCT LIST :: ',newCart?.products)
      // console.log('OLD PRODUCT LIST :: ', oldCart.products);
      if (newCart !== null) {
        const updatedProductList = [...oldCart.products, ...newCart?.products];
        console.log('updatedProductList', updatedProductList);
        const updatedCart = {
          ...newCart,
          products: updatedProductList,
        };
        console.log(updatedCart);
        await AsyncStorage.setItem('CARTLIST', JSON.stringify(updatedCart));
        setcartList(updatedProductList);
        settotal(updatedCart.total);
      }
    }

    // const list = JSON.parse(await AsyncStorage.getItem('CARTLIST'));
    // // settotal( list.map(i => i.price * i.cnt).reduce((prev, cur) => prev + cur, 0));
    // // console.log(list);
    // if (list == null) {
    //   setcartList([]);
    // } else {
    //   settotal( list.map(i => i.price * i.cnt).reduce((prev, cur) => prev + cur, 0))
    //   setcartList(list);
    // }
  };

  // useEffect(() => {
  //   if (cartList) {
  //     getCartList();
  //   }
  // }, [cartList]);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      console.log('cartList length : ', cartList.length);
      if (cartList.length == 0) {
        getCartList();
      }
    });
    // props.navigation.addListener('tabPress', () => {
    //    getCartList();
    // });
  }, []);

  return (
    <>
      {/* <CustomHeader {...props} title={'Shopping Cart'} /> */}
      <View style={GlobalStyles.mainContainer}>
        <SafeAreaView
          style={{
            height: heightPercentageToDP('10'),
            // borderWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: colors.white,
            marginTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
            // ...RtlStyles.containerRow
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {props.route.params.navi && (
              <>
                <TouchableWithoutFeedback
                  onPress={() => {
                    props.navigation.goBack();
                  }}>
                  <Icon name="arrow-left" size={25} color={colors.black} />
                </TouchableWithoutFeedback>
                <View style={{width: 20}} />
              </>
            )}

            <Text style={fonts.h4}>{strings.shoppingCart}</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => {}}>
            <Icon name="ellipsis-v" size={25} color={colors.black} />
          </TouchableWithoutFeedback>
        </SafeAreaView>
        {cartList === undefined || cartList.length == 0 ? (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Cart List is Empty !</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {cartList.map(item => (
              <ProductCard
                {...props}
                item={item}
                onDelete={async () => {
                  console.log(item.id);
                  const updatedProductList = cartList.filter(
                    i => i.id !== item.id,
                  );
                  console.log(updatedProductList);
                  const updatedCart = {
                    ...newCart,
                    products: updatedProductList,
                  };
                  console.log(updatedCart);
                  await AsyncStorage.setItem(
                    'CARTLIST',
                    JSON.stringify(updatedCart),
                  );
                  setcartList(updatedProductList);
                  settotal(updatedCart.total);
                  // await AsyncStorage.setItem('CARTLIST', JSON.stringify(list));
                }}
              />
            ))}
            {cartList.map(item => (
              <DetailView
                detail={item.title}
                amount={item.price * item.quantity}
              />
            ))}
            <Text style={{...fonts.h5, marginVertical: 15}}>Bill Details</Text>
            <DetailView
              detail={'Item Total'}
              amount={total}
              color={colors.soft_grey}
            />
            <DetailView
              detail={'Delivery Fee for 9.71 kms'}
              amount={`+ ${deliveryFee}`}
              color={colors.soft_grey}
            />
            <DetailView
              detail={'Taxes and Charge'}
              amount={`+ ${taxes}`}
              color={colors.soft_grey}
            />
            <View
              style={{
                height: 1,
                backgroundColor: colors.grey1,
                marginVertical: 20,
              }}
            />
            <DetailView
              detail={'Order Total'}
              amount={`$${deliveryFee + taxes + total}`}
              color={colors.dark}
            />
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.grey1,
                borderRadius: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 20,
                marginVertical: 25,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="ticket" color={colors.soft_grey} size={25} />
                <View style={{width: 10}} />
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 17,
                    fontWeight: '400',
                    color: colors.soft_grey,
                  }}>
                  Promo Code
                </Text>
              </View>
              <TouchableOpacity>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 0.5, y: 2.5}}
                  colors={[colors.primary_color, colors.secondary_color]}
                  style={{
                    borderRadius: 25,
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 14,
                      fontWeight: '600',
                      color: colors.white,
                    }}>
                    Apply
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <CustomButton
              title={'CHECKOUT'}
              onPress={() => {
                props.navigation.navigate(ScreenNames.ShoppingAddressScreen);
              }}
            />
            <View style={{height: 15}} />
          </ScrollView>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  qtyBtn: {
    height: 25,
    width: 25,
    borderWidth: 1,
    borderColor: colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});

export default ShoppingCartScreen;
