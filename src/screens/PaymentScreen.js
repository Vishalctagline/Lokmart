import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {fonts} from '../styles/fonts';
import {colors} from '../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GlobalStyles} from '../styles/GlobalStyle';
import { ScreenNames } from '../navigation/ScreenNames';

const paymentMethods = [
  {
    id: 1,
    name: 'Cash Payment',
    image: require('../assets/images/cashPayment.png'),
  },
  {
    id: 2,
    name: 'Paypal',
    image: require('../assets/images/paypal.png'),
  },
  {
    id: 3,
    name: 'G-Pay',
    image: require('../assets/images/gpay.png'),
  },
];

const CardView = props => (
  <LinearGradient
    start={{x: 0, y: 0}}
    end={{x: 0, y: 1}}
    colors={['#3887FC', '#024FC7']}
    style={{
      height: hp('25'),
      width: wp('85'),
      borderRadius: 20,
      padding: 22,
      // alignItems:'center',
      // justifyContent: 'center',
      marginVertical: 25,
      marginHorizontal: 5,
    }}>
    <Image
      source={require('../assets/images/visa.png')}
      style={{resizeMode: 'contain', width: 70, height: 60}}
    />
    <Text style={{...fonts.h3, fontSize: 26, color: colors.white}}>
      **** **** **** {props.cardNum.substring(15)}
    </Text>
    <View style={{flex: 1}} />
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View>
        <Text style={{...fonts.h2, color: colors.white}}>VALID THRU</Text>
        {props.date ? (
          <Text style={{...fonts.h6, color: colors.white}}>{props.date}</Text>
        ) : (
          <View style={{height: 25}} />
        )}
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <Text style={{...fonts.h2, color: colors.white}}>CARD HOLDER</Text>
        {props.name ? (
          <Text style={{...fonts.h6, color: colors.white}}>{props.name}</Text>
        ) : (
          <View style={{height: 25}} />
        )}
      </View>
    </View>
  </LinearGradient>
);

const PaymentCard = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.grey1,
        borderRadius: 15,
        height: 60,
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal:20
      }}>
      <Image
        source={props.item.image}
        style={{height: 40, width: 40, resizeMode: 'contain', margin: 10}}
      />
      <View style={{...GlobalStyles.rowContainer, marginHorizontal: 5}}>
        <Text style={fonts.h5}>{props.item.name}</Text>
        <TouchableWithoutFeedback onPress={props.onPress}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 20,
              height: 25,
              width: 25,
              borderColor:
                props.index === props.selectedIndex
                  ? colors.primary_color
                  : colors.soft_grey,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor:
                props.index === props.selectedIndex
                  ? colors.primary_color
                  : null,
            }}>
            <Icon
              name={'check'}
              color={
                props.index === props.selectedIndex
                  ? colors.white
                  : 'transparent'
              }
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const PaymentScreen = props => {
  const [cardList, setcardList] = useState([]);
  const [index, setindex] = useState(0);
  const [selectedIndex, setselectedIndex] = useState(0);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal:20
        }}>
        <Text style={fonts.h5}>Saved Cards</Text>
        <Text
          onPress={() => {
            props.navigation.navigate(ScreenNames.AddNewCardScreen, {
              onBack: data => {
                setcardList([...cardList, data]);
              },
            });
          }}
          style={{...fonts.h7, color: colors.secondary_color}}>
          + Add Card
        </Text>
      </View>
      {/* card swiper */}
      <View>
        <Carousel
          data={cardList}
          sliderWidth={wp('100')}
          itemWidth={wp('85')}
          onSnapToItem={i => setindex(i)}
          renderItem={({item}) => (
            <CardView
              name={item.name}
              date={item.date}
              cardNum={item.cardNum}
            />
          )}
        />
        <Pagination
          containerStyle={{paddingVertical: 10, bottom: 20}}
          dotStyle={styles.activeIndicator}
          inactiveDotStyle={styles.indicator}
          dotsLength={cardList.length}
          activeDotIndex={index}
        />
      </View>

      {/* <ScrollView horizontal>
        {cardList.map(item => (
          <CardView name={item.name} date={item.date} cardNum={item.cardNum} />
        ))}
      </ScrollView> */}
      {paymentMethods.map((item, index) => (
        <PaymentCard
          item={item}
          index={index}
          selectedIndex={selectedIndex}
          onPress={() => {
            setselectedIndex(index);
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  indicator: {
    borderRadius: 20,
    height: 5,
    width: 18,
    backgroundColor: colors.grey,
    // top: hp('-4'),
  },
  activeIndicator: {
    borderRadius: 20,
    height: 5,
    width: 30,
    backgroundColor: colors.solid_primary,
    // top: hp('-4'),
  },
});

export default PaymentScreen;
