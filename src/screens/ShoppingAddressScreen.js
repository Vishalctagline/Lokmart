import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {fonts} from '../styles/fonts';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import CustomInput from '../components/CustomInput';
import CheckBox from '@react-native-community/checkbox';
import {Dropdown} from 'react-native-element-dropdown';
import CustomButton from '../components/CustomButton';
import PaymentScreen from './PaymentScreen';
import CustomHeader from '../components/CustomHeader';
import { GlobalStyles } from '../styles/GlobalStyle';

const dropDownData = [
  {label: 'India', value: '1'},
  {label: 'UK', value: '2'},
  {label: 'US', value: '3'},
  {label: 'Italy', value: '4'},
];

const FormField = props => {
  const [value, setValue] = useState('')
  return (
    <View style={{...props.style, margin: 5}}>
      <Text style={fonts.h6}>{props.title}</Text>
      {props.title == 'Country' ? (
        <Dropdown
          data={dropDownData}
          labelField="label"
          value="value"
          onChange={item => {
            setValue(item.value);
          }}
          valueField="value"
          placeholder="Choose your country"
          placeholderStyle={{...fonts.h6, color: colors.soft_grey}}
          style={{
            marginVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
            backgroundColor: colors.grey1,
            height: 60,
          }}
          iconColor={colors.solid_primary}
        />
      ) : (
        <CustomInput placeholder={props.placeholder} />
      )}
    </View>
  );
};

const CheckoutStep = ({isNext}) => {
  return (
    <>
      <View
        style={{
          margin: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 25,
        }}>
        <View
          style={{
            padding: 8,
            backgroundColor: colors.solid_primary,
            borderRadius: 15,
          }}>
          <Icon name="check" size={25} color={colors.white} />
        </View>
        <View
          style={{flex: 1, backgroundColor: colors.solid_primary, height: 2}}
        />
        <View
          style={{
            padding: 8,
            backgroundColor: isNext ? colors.solid_primary : colors.white,
            borderRadius: 15,
            borderWidth: !isNext ? 3 : 0,
            borderColor: !isNext ? colors.solid_primary : colors.white,
          }}>
          {isNext ? (
            <Icon name="check" size={25} color={colors.white} />
          ) : (
            <Icon name="circle" size={25} color={colors.solid_primary} />
          )}
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: isNext ? colors.solid_primary : colors.grey,
            height: 2,
          }}
        />
        <View
          style={{
            padding: 10,
            backgroundColor: isNext ? colors.white : colors.grey,
            borderRadius: 15,
            borderWidth: isNext ? 3 : 0,
            borderColor: isNext ? colors.solid_primary : colors.white,
          }}>
          {isNext ? (
            <Icon name="circle" size={25} color={colors.solid_primary} />
          ) : (
            <Icon name="check" size={25} color={colors.grey} />
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: 15,
          marginBottom: 25,
        }}>
        <Text style={{...fonts.h8, color: colors.dark}}>Delivery</Text>
        <Text style={{...fonts.h8, color: colors.dark}}>Address</Text>
        <Text style={fonts.h8}>Payment</Text>
      </View>
    </>
  );
};

const AddressFormScreen = ({isChecked, onPress}) => (
  <View style={{marginHorizontal:20}}>
    <FormField title={'Full Name'} placeholder={'Enter Full Name'} />
    <FormField title={'Email Address'} placeholder={'Enter Email Address'} />
    <FormField title={'Phone Number'} placeholder={'Enter Phone Number'} />
    <FormField title={'Address'} placeholder={'Enter Your Home Address'} />
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <FormField
        style={{flex: 1}}
        title={'Zip Code'}
        placeholder={'Zip Code'}
      />
      <View style={{width: 20}} />
      <FormField style={{flex: 1}} title={'City'} placeholder={'City'} />
    </View>
    <FormField title={'Country'} />
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 10,
        // backgroundColor:'black'
      }}>
      <CheckBox
        style={{
          marginRight: 10,
          height: 20,
          width: 20,
        }}
        tintColors={{true: colors.solid_primary}}
        tintColor={colors.soft_grey}
        onCheckColor={colors.white}
        onFillColor={colors.solid_primary}
        onTintColor={colors.solid_primary}
        // animationDuration={0}
        value={isChecked}
        onValueChange={onPress}
        boxType={'square'}
      />
      <Text style={fonts.h6}>Save shipping address</Text>
    </View>
  </View>
);

const ShoppingAddressScreen = props => {
  const [isChecked, setisChecked] = useState(false);
  const [isNext, setisNext] = useState(false);

  // console.log(props.route.params.cardDetail)

  return (
    <>
      <CustomHeader {...props} title={'Checkout'} />
      <View style={{...GlobalStyles.mainContainer,paddingHorizontal:0}}>
        {/* <SafeAreaView
        style={{
          // height: 100,
          // borderWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: colors.white,
          marginTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
          marginHorizontal:20
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Icon name="arrow-left" size={25} color={colors.black} />
          </TouchableWithoutFeedback>
          <View style={{width: 20}} />
          <Text style={fonts.h4}>Checkout</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => {}}>
          <Icon name="ellipsis-v" size={25} color={colors.black} />
        </TouchableWithoutFeedback>
      </SafeAreaView> */}
        <CheckoutStep isNext={isNext} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {isNext ? (
            <PaymentScreen {...props} />
          ) : (
            <AddressFormScreen
              isChecked={isChecked}
              onPress={() => {
                setisChecked(!isChecked);
              }}
            />
          )}
        </ScrollView>
        <View
          style={{
            bottom: 1,
            padding: 20,
            backgroundColor: colors.white,
          }}>
          <CustomButton
            title={isNext ? 'MAKE PAYMENT' : 'NEXT'}
            onPress={() => {
              if (isNext) {
                Alert.alert('Payment', 'Payment Done..!');
              }
              setisNext(true);
            }}
          />
        </View>
      </View>
    </>
  );
};



export default ShoppingAddressScreen;
