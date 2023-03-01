import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const NormalButton = ({title,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{padding: 10, margin: 5,borderWidth:1,borderRadius:20}}>
        <Text >{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default NormalButton