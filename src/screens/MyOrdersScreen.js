import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {fonts} from '../styles/fonts';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import { orderList } from '../assets/data/data';
import { GlobalStyles } from '../styles/GlobalStyle';
import strings from '../config/Localization';
import { useRtlContext } from 'react-native-easy-localization-and-rtl';

const orderTab = [
  {
    id: 1,
    title: strings.all,
    color: '',
  },
  {
    id: 2,
    title: strings.onDelivery,
    color: 'orange',
  },
  {
    id: 3,
    title: strings.completed,
    color: 'green',
  },
  {
    id: 4,
    title: strings.canceled,
    color: 'red',
  },
];

const data = [
  {
    status: 'Order Placed',
    time: '9:10 PM, 19, June 2021',
    isChecked: true,
  },
  {
    status: 'Order Confirmed',
    time: '9:10 PM, 19, June 2021',
    isChecked: true,
  },
  {
    status: 'Your Order On Delivery',
    time: '9:10 PM, 19, June 2021',
    isChecked: true,
  },
  {
    status: 'Order Delivery',
    time: '9:10 PM, 19, June 2021',
    isChecked: false
  },
];

const TabCard = ({index,color, title, selectedIndex, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          ...styles.tabCard,
          borderBottomColor: selectedIndex===index ? colors.solid_primary : null,
        }}>
        {color && (
          <View
            style={{
              backgroundColor: color,
              height: 10,
              width: 10,
              borderRadius: 10,
              marginRight: 10,
            }}
          />
        )}
        <Text style={fonts.h6}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const OrderCard=({id,items,status})=>{
  
  let bgColor=''
  let color=''
  if(status==strings.onDelivery){
    bgColor = 'rgba(255, 140, 0, 0.15)';
    color='#FFA902'
  }else if(status == strings.completed){
    bgColor = 'green';
    color='white'
  }else if(status ==strings.canceled){
    bgColor = 'red';
        color = 'white';

  }
    const [isView, setisView] = useState(false);

  return (
    <>
      <View
        style={{
          // backgroundColor:'red',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: bgColor,
              padding: 15,
              borderRadius: 10,
              margin: 10,
            }}>
            <Icon name="gift" size={30} color={color} />
          </View>
          <View>
            <Text style={fonts.h7}>{strings.orderId} {id}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={fonts.h8}>{items} {strings.itms}</Text>
              <View
                style={{
                  height: 5,
                  width: 5,
                  borderRadius: 5,
                  backgroundColor: colors.soft_grey,
                  marginHorizontal: 10,
                }}
              />
              <Text style={fonts.h8}>{status}</Text>
            </View>
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            setisView(!isView);
          }}>
          <Icon
            name={isView ? 'arrow-up' : 'arrow-down'}
            size={20}
            style={{marginHorizontal: 10}}
          />
        </TouchableWithoutFeedback>
      </View>
      {isView &&
        data.map((item, index) => (
          <View style={{flexDirection: 'row', marginHorizontal: 20}}>
            <View style={{alignItems: 'center'}}>
              <Icon
                name={item.isChecked ? 'check-circle' : 'circle-thin'}
                size={30}
                color={item.isChecked ?colors.solid_primary : colors.soft_grey}
              />
              {index != data.length - 1 && (
                <View
                  style={{width: 2, backgroundColor: colors.grey, height: 25}}
                />
              )}
            </View>
            <View style={{marginHorizontal: 15}}>
              <Text style={fonts.h7}>{item.status}</Text>
              <Text style={fonts.h8}>{item.time}</Text>
            </View>
          </View>
        ))}
    </>
  );
}

const MyOrdersScreen = () => {

  // const {RtlStyles}=useRtlContext()
  // console.log(RtlStyles.containerRow)
  const [selectedIndex, setselectedIndex] = useState(0);

  const [isView, setisView] = useState(false)

  return (
    <View style={{...GlobalStyles.mainContainer, paddingHorizontal:0}}>
      <SafeAreaView
        style={{
          // height: 100,
          // borderWidth: 1,
          flexDirection: 'row',
          // ...RtlStyles.flipHorizontal,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: colors.white,
          marginTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 20,
          }}>
          <Text style={fonts.h4}>{strings.myOrders}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => {}}>
          <Icon
            name="search"
            size={25}
            color={colors.black}
            style={{marginRight: 20}}
          />
        </TouchableWithoutFeedback>
      </SafeAreaView>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {orderTab.map((item, index) => {
            return (
              <TabCard
                index={index}
                title={item.title}
                color={item.color}
                selectedIndex={selectedIndex}
                onPress={() => {
                  setselectedIndex(index);
                }}
              />
            );
          })}
        </ScrollView>
      </View>
      <ScrollView>
        {orderList.map((item, index) =>
          selectedIndex == 0 ? (
            <OrderCard
              id={item.id}
              items={item.items}
              status={item.order_status}
            />
          ) : (
            selectedIndex == item.order_status_id && (
              <OrderCard
                id={item.id}
                items={item.items}
                status={item.order_status}
              />
            )
          ),
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabCard: {
    borderWidth: 1,
    borderColor: colors.grey1,
    borderBottomWidth: 10,
    borderRadius: 10,
    margin: 10,
    height: hp('8'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // padding:10,
    paddingHorizontal: 30,
  },
});

export default MyOrdersScreen;
