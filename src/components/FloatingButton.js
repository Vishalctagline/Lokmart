import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { useRef } from 'react'
import AnimatedLottieView from 'lottie-react-native';
import { colors } from '../styles/colors';


const FloatingButton = ({lottieImg,onPress}) => {
  const add = useRef();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onPress();
        add.current.play();
      }}>
      <View style={styles.btn}>
        <AnimatedLottieView
          imageAssetsFolder={'lottie/logo_1'}
          ref={add}
          style={{flex: 1, alignSelf: 'center'}}
          source={lottieImg}
          // autoPlay
          loop={false}
          // speed={1.5}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles=StyleSheet.create({
    btn:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        position:'absolute',
        bottom:10,
        right:10,
        // backgroundColor:colors.white,
        // elevation:3,
        // shadowColor:colors.black,
        // shadowOpacity:1,
        // shadowOffset:{
        //   width:5,
        //   height:5
        // },
        // shadowRadius:10,
        padding:50,
        // margin:5,
        zIndex:1
    }
})

export default FloatingButton