import {
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Button,
  RefreshControl,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {allGrocery} from '../assets/data/data';
import {colors} from '../styles/colors';
import GroceryCard from '../components/GroceryCard';
import SearchBar from '../components/SearchBar';
import CustomHeader from '../components/CustomHeader';
import {fonts} from '../styles/fonts';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  emptySearchList,
  getInitProducts,
  getProducts,
  getProductsAsync,
  getSearchedProducts,
  loader,
} from '../redux/slices/productSlice';
import {store} from '../redux/store/store';

const ProductScreen = props => {
  // console.log('PROPS.searchList : ', props.searchList.products);

  // console.log(props.route.params.item.name);
  // console.log(allGrocery.filter(item =>( item.category == props.route.params.title)))

  // const [productList, setproductList] = useState(
  //   allGrocery.filter(item => item.category == props.route.params.item.name),
  // );

  const dispatch = useDispatch();
  const loading = useSelector(state => state.products.isLoading);
  // console.log(loading)
  const tot = useSelector(state => state.products.total);
  const products = useSelector(state => state.products.productList);
  console.log('products :: ', products.products);
  const searchedProducts = useSelector(state => state.products.searchList);
  console.log('searchedProducts :: ', searchedProducts.products);
  // const listOfSearched=searchedProducts.products

  // const storeVal=store.getState();
  // console.log('Serachlist from Store Value : ',storeVal.products.searchList)

  const [productList, setproductList] = useState([]);
  const [txt, settxt] = useState('');
  const [searchedList, setsearchedList] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [skip, setskip] = useState(1);
  const [footerLoader, setfooterLoader] = useState(true);
  const [total, settotal] = useState(0);
  const [refresh, setrefresh] = useState(false);

  const initProductList = async () => {
    // dispatch(getProducts(0));
    dispatch(getInitProducts());
    dispatch(emptySearchList());
    setisLoading(false);
    setrefresh(false);
    setskip(10);
    // setproductList(products.products);
    // settotal(products.total);
    // console.log('Length of Product list : ',products.products.length)
    // console.log('TOTAL :: ',products.total);

    // await fetch(`https://dummyjson.com/products?limit=10&skip=0`)
    //   .then(res => res.json())
    //   .then(json => {
    //     setproductList(json.products);
    //     setisLoading(false);
    //     setrefresh(false);
    //     settotal(json.total);
    //     setskip(10);
    //   });
  };

  const getProductList = async () => {
    dispatch(loader());
    dispatch(getProducts([skip, txt]));
    // setfooterLoader(true);
    console.log('func : ', skip);

    // setfooterLoader(false);
    console.log('skip occour');
    // setskip(skip + 10);
    setisLoading(false);
    setrefresh(false);
    // setproductList(products.products);
    // console.log('New Products : ',products)
    // settotal(products.total);

    // await fetch(
    //   txt
    //     ? `https://dummyjson.com/products/search?limit=10&skip=${skip}&q=${txt}`
    //     : `https://dummyjson.com/products?limit=10&skip=${skip}`,
    // )
    //   .then(res => res.json())
    //   .then(json => {
    //     if (searchedList.length != 0) {
    //       console.log('searchlist not 0 skip : ', skip);
    //       setsearchedList([...searchedList, ...json.products]);
    //     } else {
    //       setproductList([...productList, ...json.products]);
    //     }
    //     setskip(skip + 10);
    //     settotal(products.total);
    //     setfooterLoader(false);
    //     setisLoading(false);
    //     setrefresh(false);
    //   });
  };

  const searchProductList = async text => {
    // console.log('text ::', text);
    setisLoading(true);

    dispatch(getSearchedProducts(text));
    // setsearchedList(searchedProducts.products);
    setisLoading(false);
    setskip(10);
    // console.log('Searchlist : ', searchedList);

    // fetch(`https://dummyjson.com/products/search?limit=10&q=${text}`)
    //   .then(res => res.json())
    //   .then(json => {
    //     console.log('search list : ', json.products);
    //     if (json.products.length != 0) {
    //       setsearchedList(json.products);
    //       // setproductList(json.products);
    //       settotal(json.total);
    //       setskip(10);
    //       setisLoading(false);
    //     } else {
    //       Alert.alert('Search Product', 'No product found!');
    //     }
    //   });
  };

  useEffect(
    () => {
      props.navigation.addListener('focus', async () => {
        // setproductList(
        //   allGrocery.filter(
        //     item => item.category == props.route.params.item.name,
        //   ),
        // );
        initProductList();
        // getProductList();
      });
      // if (txt !== '') {
      //   console.log('searched');

      //   // setsearchedList(
      //   //   productList.filter(item =>
      //   //     item.title.toLowerCase().includes(txt.toLowerCase()),
      //   //   ),
      //   //   console.log(searchedList)
      //   // );

      //   // setsearchedList(
      //   //   productList.filter(
      //   //     item => item.name.toLowerCase().includes(txt.toLowerCase()),
      //   //     // Object.values(item)
      //   //     // .toString()
      //   //     // .toLowerCase()
      //   //     // .includes(txt.toLowerCase()),
      //   //   ),
      //   //   // console.log(searchedList),
      //   // );

      //   // searchProductList(txt);
      //   console.log(txt);
      // }
      // setskip(10)

      //   console.log('searchlist hook : ',searchedList)
      //   console.log('state searchlist : ', searchedProducts.products);
      // setsearchedList(searchedProducts.products);
      // console.log('useEffect searchlist : ',searchedList)
      //   console.log('after set searchlist hook : ', searchedList);
    },
    [
      // txt,
      // searchedProducts.products,
    ],
  );

  return (
    <>
      <CustomHeader {...props} />
      <View style={{flex: 1, backgroundColor: colors.white}}>
        <View style={{marginVertical: 10}}>
          <SearchBar
            {...props}
            value={txt}
            onSearch={async text => {
              settxt(text);
              // console.log('searched text : ', text);
            }}
            onFilter={data => {
              if (searchedList.length == 0 || txt == '') {
                setsearchedList(
                  productList.filter(
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
              } else {
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
              props.navigation.goBack();
            }}
          />
          <Button
            title="Search"
            onPress={() => {
              if (txt == '') {
                initProductList();
                setsearchedList([]);
              } else {
                searchProductList(txt);
              }
            }}
          />
        </View>
        {/* <Text>
          {searchedProducts.products.length !== 0
            ? searchedProducts.products[0]?.title
            : products.products[0].title}
        </Text> */}
        {
          // productList.length !==0 ? (
          isLoading ? (
            <ActivityIndicator style={{flex: 1, alignSelf: 'center'}} />
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => {
                    initProductList();
                    settxt('');
                  }}
                />
              }
              onEndReached={() => {
                console.log('end occurs');
                if (skip <= tot) {
                  // setfooterLoader(true);
                  console.log('end : ', skip);
                  setskip(skip + 10);
                  // console.log(footerLoader);
                  getProductList();
                }
              }}
              ListFooterComponent={() =>
                // footerLoader
                loading && <ActivityIndicator size={'large'} />
              }
              onEndReachedThreshold={0}
              refreshing={true}
              showsVerticalScrollIndicator={false}
              style={{marginHorizontal: 20}}
              // data={
              //   searchedProducts.products.length === 0
              //     ? products.products
              //     : searchedProducts.products
              // }
              data={
                searchedProducts.products.length !== 0
                  ? searchedProducts.products
                  : products.products
              }
              // data={searchedProducts.products}
              // data={
              //   searchedList.length !== 0 ? searchedList : products.products
              // }
              extraData={searchedProducts.products}
              keyExtractor={(item, index) => item + index}
              renderItem={({item, index}) => {
                return (
                  <GroceryCard
                    item={item}
                    {...props}
                    onPress={() => {
                      console.log('clicked');
                      let data = [...productList];
                      console.log(data);
                      data[index].isFavorite = data[index].isFavorite
                        ? false
                        : true;
                      setproductList(data);
                    }}
                  />
                );
              }}
            />
          )
          // )
          // : (
          //   <View style={{justifyContent: 'center', flex: 1}}>
          //     <Text style={{...fonts.h6, alignSelf: 'center'}}>
          //       Products not Found.
          //     </Text>
          //   </View>
          // )
        }
      </View>
    </>
  );
};

// function mapStateToProps(state) {
//   console.log('mapStateToProps : ', state);
//   return {searchList:state.products.searchList};
// }

// export default connect(mapStateToProps)(ProductScreen)

export default ProductScreen;
