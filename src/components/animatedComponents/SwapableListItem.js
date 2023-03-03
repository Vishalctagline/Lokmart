// import {View, Text, ScrollView, Animated} from 'react-native';
// import React from 'react';
// import {CotegoryCard} from '../../screens/CategoryScreen';
// import {widthPercentageToDP as wp} from 'react-native-responsive-screen-hooks';

// const SwapableListItem = ({item}) => {
//   const swipeX = new Animated.Value(0);

//   const swapRightHandler = swipeX.interpolate({
//     inputRange: [0, 100,],
//     outputRange: [-100, 0],
//     extrapolateLeft:'clamp',
//     extrapolateRight:'clamp'
//   });

//   return (
//     <Animated.View style={{flexDirection: 'row',
//     // left:-100
//     }}>
//       <Animated.View
//         style={{
//           backgroundColor: 'red',
//           width: 100,
//         //   transform: [
//         //     {
//         //       translateX: swipeX,
//         //     },
//         //   ],
//         }}
//       />
//       <Animated.View
//         // onMoveShouldSetResponder={() => true}
//         // onStartShouldSetResponder={() => true}
//         // onResponderMove={event => {
//         //   console.log(event.nativeEvent);
//         //   if (event.nativeEvent.locationX<200) {
//         //       swipeX.setValue(event.nativeEvent.locationX);
//         //   }
//         // }}
        
//         // onTouchMove={
//         //   //   e=>console.log(e.nativeEvent)
//         //   Animated.event(
//         //     [
//         //       {
//         //         nativeEvent: {
//         //           locationX: swipeX,
//         //         },
//         //       },
//         //     ],
//         //     {
//         //       useNativeDriver: false,
//         //     },
//         //   )
//         // }
//         style={{
//           // backgroundColor:'red',
//           width: wp(100),
//         //   transform: [
//         //     {
//         //       translateX: swipeX,
//         //     },
//         //   ],
//         }}>
//         <CotegoryCard item={item} />
//       </Animated.View>
//       <View style={{backgroundColor: 'red', width: 100}} />
//     </Animated.View>
//   );
// };

// export default SwapableListItem;

import { View, Text } from 'react-native'
import React from 'react'
import { CotegoryCard } from '../../screens/CategoryScreen';
import { Swipeable } from 'react-native-gesture-handler';

const leftAction=()=>{
    return(
        <View style={{backgroundColor:'red',padding:10,justifyContent:'center'}}>
            <Text >Edit</Text>
        </View>
    )
}
const rightAction = () => {
  return (
    <View
      style={{backgroundColor: 'red', padding: 10, justifyContent: 'center'}}>
      <Text>Delete</Text>
    </View>
  );
};

const SwapableListItem = ({item}) => {
  return (
    <Swipeable useNativeAnimations={true} overshootLeft={false} overshootRight={false} renderLeftActions={leftAction} renderRightActions={rightAction}>
      <CotegoryCard item={item} />
     </Swipeable>
  );
}

export default SwapableListItem
