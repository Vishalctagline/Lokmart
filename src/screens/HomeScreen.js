import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
  Platform,
  I18nManager,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../styles/colors';
import {allGrocery, banners} from '../assets/data/data';
import GroceryCard from '../components/GroceryCard';
import SearchBar from '../components/SearchBar';
import {fonts} from '../styles/fonts';

import Carousel, {Pagination, ParallaxImage} from 'react-native-snap-carousel';
import {ScreenNames} from '../navigation/ScreenNames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import strings from '../config/Localization';
import {useRtlContext} from 'react-native-easy-localization-and-rtl';


const Header = ({username, img}) => {
  // const {RtlStyles} = useRtlContext();
  // console.log(RtlStyles.text)

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 20,
        flex: 1,
        // ...RtlStyles.containerRow,
      }}>
      <View style={{flex: 1}}>
        <Text style={{...fonts.h1, 
          // ...RtlStyles.text
          }} numberOfLines={1}>
          {strings.hello}, {username}
        </Text>
        <Text
          style={{
            textAlign:'left',
            fontFamily: 'Poppins-Regular',
            fontSize: 14,
            fontWeight: '400',
            lineHeight: 21,
            color: colors.soft_grey,
            // ...RtlStyles.text,
          }}>
          {strings.gm}.
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // ...RtlStyles.containerRow,
        }}>
        <View>
          <Icon name="bell-o" size={30} color={colors.black} />
          <View style={styles.IconBadge}>
            <Text style={{color: colors.white, fontSize: 10}}>5</Text>
          </View>
        </View>
        <View style={{width: 20}} />
        {img == '' ? (
          <ActivityIndicator />
        ) : (
          <Image source={{uri: img}} style={styles.profileImg} />
        )}
      </View>
    </View>
  );
};

const PopularCard = ({item, onPress = () => {}}) => {
  const [Item, setitem] = useState(item);
  const [isFav, setisFav] = useState(item.isFavorite);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{marginHorizontal: 10}}>
        <Image
          style={{
            borderRadius: 20,
            height: hp('25'),
            width: wp('80'),
            resizeMode: 'cover',
          }}
          source={Item.image}
        />
        <Text
          style={{
            ...fonts.h5,
            lineHeight: 22,
            marginVertical: 10,
          }}>
          {Item.name}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                width: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                borderColor: '#B8BBC6',
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
                {Item.rate}
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
              {Item.rating} Ratings
            </Text>
          </View>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 16,
              fontWeight: '600',
              lineHeight: 18,
              color: colors.dark,
            }}>
            ${Item.price}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            top: 20,
            width: wp('80'),
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          }}>
          <View
            style={{
              backgroundColor: colors.solid_primary,
              padding: 8,
              borderRadius: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                fontWeight: '500',
                lineHeight: 18,
                color: colors.white,
              }}>
              {Item.discount}% OFF
            </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              Item.isFavorite = Item.isFavorite ? false : true;
              console.log(Item.isFavorite);
              setisFav(Item.isFavorite);
            }}>
            <Icon
              name="heart"
              backgroundColor={'transparent'}
              size={25}
              color={isFav ? 'red' : 'rgba(45, 45, 45, 0.5)'}
              // color={'rgba(45, 45, 45, 0.5)'}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const CategoryCard = ({item, onPress = () => {}}) => {
  const [isLoading, setisLoading] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{marginLeft: 20}}>
        <View
          style={{
            borderColor: colors.grey1,
            borderWidth: 1,
            borderRadius: 20,
            height: 100,
            width: 100,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          {/* <Image source={item.image} style={styles.categoryImg} /> */}
          {isLoading && <ActivityIndicator style={{top: 50}} />}
          <Image
            onLoadStart={() => {
              setisLoading(true);
            }}
            onLoadEnd={() => {
              setisLoading(false);
            }}
            source={{uri: item.thumbnail}}
            style={{...styles.categoryImg}}
          />
        </View>
        <Text
          // ellipsizeMode='tail'
          numberOfLines={1}
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 16,
            fontWeight: '600',
            color: colors.dark,
            width: 100,
          }}>
          {/* {item.name} */}
          {item.title}
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Regular',
            fontSize: 12,
            fontWeight: '400',
            color: colors.soft_grey,
          }}>
          {/* {item.items} Items */}
          {item.stock} Items
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const HomeScreen = props => {
  // const {RtlStyles} = useRtlContext();

  // console.log(allGrocery[1])
  // console.log(getStatusBarHeight(), props.route.params.user);
  // const username = props.route.params.user;
  const [items, setitems] = useState(allGrocery);
  const [index, setindex] = useState(0);
  const [categoryList, setcategoryList] = useState([]);
  const [productList, setproductList] = useState([]);


  const [username, setusername] = useState('');
  const [img, setimg] = useState('');

  const getCategoryList = async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    const jsonData = await response.json();
    // console.log('CATEGORIES : ', jsonData);
    setcategoryList(jsonData);
  };

  const getProductList = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const jsonData = await response.json();
    // console.log('PRODUCTS : ', jsonData.products);
    setproductList(jsonData.products);
  };

  const getUserDetails = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('USER'));
    firestore()
      .collection('users')
      .doc(user.id.toString())
      .get()
      .then(snapShot => {
        const data = snapShot.data();

        setusername(data.username);
        setimg(data.image);
      })
      .catch(e => Alert.alert('Profile', e));
  };

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      getUserDetails();
      // getUserList();
    });
    getCategoryList();
    getProductList();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header username={username} img={img} />
        <SearchBar
          {...props}
          onPress={() => {
            props.navigation.navigate(ScreenNames.SearchScreen);
          }}
          home
        />
        <View style={{...styles.bannerContainer}}>
          <Carousel
            autoplay
            loop
            hasParallaxImages={true}
            data={banners}
            sliderWidth={wp('100')}
            itemWidth={wp('80')}
            onSnapToItem={i => setindex(i)}
            renderItem={({item}, parallaxProps) => (
              <View
                style={{
                  flex: 1,
                }}>
                <ParallaxImage
                  containerStyle={{
                    flex: 1,
                    borderRadius: 25,
                    marginVertical: 20,
                  }}
                  source={item.image}
                  style={{
                    resizeMode: 'contain',
                  }}
                  {...parallaxProps}
                />
              </View>
            )}
          />
          <Pagination
            containerStyle={{marginTop: -40}}
            dotStyle={styles.activeIndicator}
            inactiveDotStyle={styles.indicator}
            dotsLength={banners.length}
            activeDotIndex={index}
          />
        </View>
        <View style={styles.categoriesContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 20,
              // ...RtlStyles.containerRow,
            }}>
            <Text style={fonts.h1}>{strings.categories}</Text>
            <TouchableWithoutFeedback
              onPress={() => {
                props.navigation.navigate(ScreenNames.CategoryScreen);
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // ...RtlStyles.containerRow,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 16,
                    fontWeight: '600',
                    color: colors.solid_primary,
                  }}>
                  {strings.showAll}
                </Text>
                <View style={{width: 5}} />
                <Icon
                  name="play"
                  color={colors.solid_primary}
                  // style={RtlStyles.flipHorizontal}
                  style={{transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{margin: 15}}>
            {categoryList.length == 0 ? (
              <ActivityIndicator />
            ) : (
              <>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {categoryList.map((item, index) =>
                    index > 4 ? null : (
                      <Text
                        style={{
                          margin: 5,
                          padding: 20,
                          backgroundColor: colors.grey,
                        }}>
                        {item}
                      </Text>
                    ),
                  )}
                </ScrollView>
              </>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 20,
            // ...RtlStyles.containerRow,
          }}>
          <Text style={fonts.h1}>{strings.products}</Text>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.navigate(ScreenNames.ProductScreen);
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // ...RtlStyles.containerRow,
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  fontWeight: '600',
                  color: colors.solid_primary,
                }}>
                {strings.showAll}
              </Text>
              <View style={{width: 5}} />
              <Icon
                name="play"
                color={colors.solid_primary}
                // style={RtlStyles.flipHorizontal}
                style={{transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        {productList.length == 0 ? (
          <ActivityIndicator />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {productList.map((item, index) =>
              index > 5 ? null : (
                <CategoryCard
                  item={item}
                  onPress={() => {
                    props.navigation.navigate(ScreenNames.DetailScreen, {item});
                  }}
                />
              ),
            )}
          </ScrollView>
        )}
        <View style={{height: 15}} />
        <View style={styles.popularDealsContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 20,
              // ...RtlStyles.containerRow,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 22,
                fontWeight: '700',
                color: colors.dark,
              }}>
              {strings.popularDeals}
            </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                // navigation.navigate('');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // ...RtlStyles.containerRow,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Regular',
                    fontSize: 16,
                    fontWeight: '600',
                    color: colors.solid_primary,
                  }}>
                  {strings.showAll}
                </Text>
                <View style={{width: 5}} />
                <Icon
                  name="play"
                  color={colors.solid_primary}
                  // style={RtlStyles.flipHorizontal}
                  style={{transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{margin: 15}}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {allGrocery.map(
                (item, index) =>
                  (index == 7 || index == 3 || index == 5) && (
                    <PopularCard
                      item={item}
                      onPress={() => {
                        props.navigation.navigate(ScreenNames.DetailScreen, {
                          item,
                        });
                      }}
                    />
                  ),
              )}
            </ScrollView>
          </View>
        </View>
        <View style={{marginHorizontal: 20}}>
          <Text
            style={[
              fonts.h1,
              // RtlStyles.text
            ]}>
            {strings.allGrocery}
          </Text>
          {items.map((item, index) =>
            index > 2 ? null : (
              <GroceryCard
                item={item}
                {...props}
                onPress={() => {
                  let data = [...items];
                  data[index].isFavorite = data[index].isFavorite
                    ? false
                    : true;
                  setitems(data);
                }}
              />
            ),
          )}
        </View>
        <View style={{height: 50}}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.OS == 'ios' ? getStatusBarHeight() : 0,
  },
  profileImg: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  IconBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 15,
    height: 15,
    borderRadius: 15,
    backgroundColor: colors.primary_color,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerContainer: {
    flex: 1,
    height: hp('25'),
    width: wp('100'),
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    margin: 10,
  },
  indicator: {
    borderRadius: 20,
    height: 5,
    width: 18,
    backgroundColor: colors.grey,
  },
  activeIndicator: {
    borderRadius: 20,
    height: 5,
    width: 30,
    backgroundColor: colors.solid_primary,
  },
  categoryImg: {
    height: 80,
    width: 80,
    margin: 10,
    resizeMode: 'cover',
  },
});

export default HomeScreen;
