import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import {colors} from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {relatedProduct} from '../assets/data/data';
import CustomButton from '../components/CustomButton';
import {fonts} from '../styles/fonts';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {ScreenNames} from '../navigation/ScreenNames';
import CustomHeader from '../components/CustomHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductCard = ({item}) => (
  <View style={{marginRight: 20}}>
    <View
      style={{
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
      }}>
      <Image source={item.image} style={{height: 100, width: 100}} />
    </View>
    <Text
      style={{
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        fontWeight: '600',
        color: colors.dark,
      }}>
      {item.name}
    </Text>
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 12,
          fontWeight: '600',
          color: colors.dark,
        }}>
        ${item.price}
      </Text>
      <View style={{width: 8}} />
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 10,
          fontWeight: '400',
          color: colors.soft_grey,
          textDecorationLine: 'line-through',
        }}>
        ${item.price}
      </Text>
    </View>
  </View>
);

const DetailScreen = props => {
  // console.log(props.route.params.item)
  const [cnt, setcnt] = useState(1);
  const [index, setindex] = useState(0);
  const [item, setItem] = useState(props.route.params.item);
  const [isFav, setisFav] = useState(props.route.params.item.isFavorite);
  const [cartList, setcartList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const addItemToCart = async () => {
    let user = JSON.parse(await AsyncStorage.getItem('USER'));
    let id=user.id
    console.log('ID : ',id)
    let list = [
      {
        'id': item.id,
        'quantity': cnt,
      }
    ];
    console.log(list)
    const response = await fetch('https://dummyjson.com/carts/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: id,
        products: list,
      })
    });
    const json= await response.json()
    console.log('JSON :', json)
    if(response.status==200){
      Alert.alert('Add to Cart', 'Product added to Cart.');
      props.navigation.navigate(ScreenNames.ShoppingCartScreen, {
        navi: true,
        newCart: json
      });
    }else{
      Alert.alert('Add to Cart', json.message);
    }



    // const itm = cartList.find(i => i.id === item.id);
    // if (itm) {
    //   console.log('item available');
    //   cartList.map(i => {
    //     if (i.id == item.id) {
    //       i.cnt += item.cnt;
    //     }
    //   });
    //   // console.log(cartList);
    //   await AsyncStorage.setItem('CARTLIST', JSON.stringify([...cartList]));
    // } else {
    //   console.log('item not available');
    //   await AsyncStorage.setItem(
    //     'CARTLIST',
    //     JSON.stringify([...cartList, item]),
    //   );
    // }
  };

  const getCartList = async () => {
    const list = JSON.parse(await AsyncStorage.getItem('CARTLIST'));
    if (list == null) {
      setcartList([]);
    } else {
      setcartList(list);
    }
  };

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      getCartList();
    });
  }, []);

  return (
    <>
      <CustomHeader
        {...props}
        fav
        isFav={isFav}
        onFav={() => {
          item.isFavorite = item.isFavorite ? false : true;
          setisFav(item.isFavorite);
          setItem(item);
          console.log('after fav clicked : ' + item.isFavorite);
        }}
      />
      <ScrollView>
        <View style={{flex: 1, backgroundColor: colors.white}}>
          <Carousel
            sliderWidth={wp('100')}
            itemWidth={wp('100')}
            onSnapToItem={i => {
              setindex(i);
            }}
            // data={[item.image, item.image, item.image]}
            data={
              item.images ? item.images : [item.image, item.image, item.image]
            }
            renderItem={({item}) => {
              return (
                <>
                  {isLoading && <ActivityIndicator style={{top: 100}} />}
                  <Image
                    onLoadStart={() => {
                      setisLoading(true);
                    }}
                    onLoadEnd={() => {
                      setisLoading(false);
                    }}
                    style={{
                      flex: 1,
                      borderRadius: 20,
                      height: hp('25'),
                      width: wp('90'),
                      resizeMode: 'stretch',
                      alignSelf: 'center',
                      marginVertical: 20,
                    }}
                    // source={item}
                    source={ {uri: item}}
                  />
                </>
              );
            }}
          />
          <Pagination
            dotsLength={item.images.length}
            activeDotIndex={index}
            dotStyle={styles.activeDot}
            inactiveDotStyle={styles.dot}
            containerStyle={{marginTop: -40}}
          />
          <View style={{flex: 1, marginHorizontal: 25}}>
            <Text style={{...fonts.h7, color: colors.primary_color}}>
              {item.category}
            </Text>
            <Text
              style={{
                ...fonts.h9,
                color: colors.dark,
              }}>
              {/* {item.name} */}
              {item.title}
            </Text>
            {/* price and counter */}
            <View
              style={{
                //   backgroundColor:'red',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={fonts.h11}>${item.price}</Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    cnt > 1 && setcnt(c => c - 1);
                  }}>
                  <View style={styles.qtyBtn}>
                    <Icon name="minus" size={25} color={colors.dark} />
                  </View>
                </TouchableWithoutFeedback>
                <Text
                  style={{
                    ...fonts.h12,
                    marginHorizontal: 15,
                    alignSelf: 'center',
                    textAlign: 'center',
                  }}>
                  {cnt}
                </Text>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setcnt(c => c + 1);
                  }}>
                  <View
                    style={{
                      ...styles.qtyBtn,
                      backgroundColor: 'rgba(255,140,0, 0.15)',
                    }}>
                    <Icon name="plus" size={25} color={colors.primary_color} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            {/* card (rate,review,delivery) */}
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.grey1,
                borderRadius: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: 10,
                paddingVertical: 20,
                marginVertical: 25,
              }}>
              <Icon name="star" color={colors.ratingStart} size={25} />
              <Text
                style={{
                  ...fonts.h10,
                  color: colors.dark,
                }}>
                {item.rate} ({item.rating} reviews)
              </Text>
              {item.freeShipping && (
                <>
                  <View
                    style={{
                      height: 18,
                      width: 2,
                      backgroundColor: colors.grey1,
                    }}
                  />

                  <Icon name="truck" color={colors.green} size={22} />
                  <Text
                    style={{
                      ...fonts.h10,
                      color: colors.green,
                    }}>
                    FREE DELIVERY
                  </Text>
                </>
              )}
            </View>
            {/* details */}
            <Text
              style={{
                ...fonts.h2,
              }}>
              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. */}
              {item.description}
            </Text>
            {/* related product header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 15,
              }}>
              <Text style={fonts.h1}>Related product</Text>
              <TouchableWithoutFeedback
                onPress={() => {
                  // navigation.navigate('');
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      ...fonts.h7,
                      color: colors.solid_primary,
                      lineHeight: 20,
                    }}>
                    Show all
                  </Text>
                  <View style={{width: 5}} />
                  <Icon name="play" color={colors.solid_primary} />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <FlatList
              style={{marginVertical: 10}}
              horizontal
              showsHorizontalScrollIndicator={false}
              data={relatedProduct}
              renderItem={({item}) => <ProductCard item={item} />}
            />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          bottom: 1,
          padding: 20,
          backgroundColor: colors.white,
          borderWidth: 1,
          borderColor: colors.grey1,
        }}>
        <CustomButton
          title={'Add To Cart'}
          icon={'shopping-cart'}
          onPress={
            addItemToCart
            //   () => {
            //   // console.log({...item,cnt:cnt})
            //   const data = {...item, cnt: cnt};
            //   addItemToCart(data);
            //   props.navigation.navigate(ScreenNames.ShoppingCartScreen, {
            //     navi: true,
            //   });
            // }
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  qtyBtn: {
    height: 40,
    width: 40,
    borderWidth: 1,
    borderColor: colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  activeDot: {
    borderRadius: 20,
    height: 5,
    width: 30,
    backgroundColor: colors.solid_primary,
  },
  dot: {
    borderRadius: 20,
    height: 5,
    width: 18,
    backgroundColor: colors.grey,
  },
});

export default DetailScreen;
