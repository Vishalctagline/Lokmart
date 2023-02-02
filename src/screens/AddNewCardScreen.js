import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {colors} from '../styles/colors';
import {fonts} from '../styles/fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import LinearGradient from 'react-native-linear-gradient';
import {TextInputMask} from 'react-native-masked-text';
import CustomHeader from '../components/CustomHeader';


const FormField = props => {
  return (
    <View style={{...props.style, margin: 5}}>
      <Text style={fonts.h6}>{props.title}</Text>
      <CustomInput
        value={props.value}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        maxLength={props.maxLength}
        passwordField={props.passwordField}
      />
    </View>
  );
};

const CardView = props => (
  <LinearGradient
    start={{x: 0, y: 0}}
    end={{x: 0, y: 1}}
    colors={['#3887FC', '#024FC7']}
    style={{
      height: hp('25'),
      width: wp('90'),
      borderRadius: 20,
      padding: 22,
      // alignItems:'center',
      // justifyContent: 'center',
      marginVertical: 25,
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

const AddNewCardScreen = props => {
  const [cardNum, setcardNum] = useState('');
  const [name, setname] = useState('');
  const [date, setdate] = useState('');
  const [cvv, setcvv] = useState('');
  const [cardDetail, setcardDetail] = useState({
    name: name,
    cardNum: cardNum,
    date: date,
  });

  var dateField=null
  return (
    <>
      <CustomHeader title={'Add New Card'} {...props} />
      <View
        style={{flex: 1, backgroundColor: colors.white, paddingHorizontal: 20}}>
        <ScrollView>
          <CardView cardNum={cardNum} name={name} date={date} />
          <FormField
            title={'Card Holder Name'}
            placeholder={'Enter Card Holder Name'}
            onChangeText={val => {
              setname(val);
            }}
          />
          <FormField
            title={'Card Number'}
            placeholder={'Enter Card Number'}
            onChangeText={val => {
              if (val.length == 4 || val.length == 9 || val.length == 14) {
                setcardNum((val += '/'));
              }
              setcardNum(val);
            }}
            keyboardType={'numeric'}
            maxLength={19}
            value={cardNum}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 1, margin: 5}}>
              <Text style={fonts.h6}>Month/Year</Text>
              <TextInputMask
                ref={ref => (dateField = ref)}
                style={{...styles.input, ...fonts.h6, flex: 1}}
                type="datetime"
                options={{
                  format: 'MM/YYYY',
                }}
                value={date}
                onChangeText={val => {
                  setdate(val);
                  console.log(dateField.isValid());
                }}
                placeholder={'MM/YYYY'}
                placeholderTextColor={colors.soft_grey}
              />
            </View>
            {/* <FormField
            style={{flex: 1}}
            value={date}
            title={'Month/Year'}
            placeholder={'MM/YYYY'}
            onChangeText={val => {
              if (val.length == 2) {
                setdate((val += '/'));
              } else {
                setdate(val);
              }
            }}
            keyboardType={'numeric'}
            maxLength={7}
          /> */}
            <FormField
              style={{flex: 1}}
              title={'CVV'}
              placeholder={'Enter CVV'}
              keyboardType={'numeric'}
              passwordField={true}
              onChangeText={val => {
                setcvv(val);
              }}
            />
          </View>

          <CustomButton
            title={'ADD CARD'}
            onPress={() => {
              if (name == '' || date == '' || cardNum == '' || cvv == '') {
                Alert.alert('Add Card', 'Enter Proper Details !');
              } else {
                if (cardNum.length !== 19) {
                  Alert.alert('Add Card', 'Enter Proper Card Number !');
                } else if (!dateField.isValid()) {
                  Alert.alert('Add Card', 'Date Invalid !!');
                }
                // if (
                //   !(0 > date.substring(0, 2) || date.substring(0, 2) <= 12) ||
                //   !(2000 > date.substring(3) || date.substring(3) <= 2030)
                // ) {
                //   Alert.alert('Add Card', 'Date Invalid !!');
                // } else
                else if (cvv.length !== 4) {
                  Alert.alert('Add Card', 'Enter Proper CVV !');
                } else {
                  cardDetail.name = name;
                  cardDetail.date = date;
                  cardDetail.cardNum = cardNum;
                  // console.log('add card screen:',cardDetail);
                  // props.navigation.navigate('ShoppingAddressScreen',{cardDetail:cardDetail}) ;
                  props.route.params.onBack(cardDetail);
                  props.navigation.goBack();
                }
              }
            }}
          />
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: colors.grey1,
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default AddNewCardScreen;
