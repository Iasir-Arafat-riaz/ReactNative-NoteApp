import { View, Text, Pressable, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '../theme/colors'

export default function Button({title,onPress,customStyle}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button,customStyle]} >
      <Text style={{fontSize:16}}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles=StyleSheet.create({
    button:{
        borderRadius:30,
        width:130,
        height:45,
        // backgroundColor:colors.orange,
        alignItems:"center",
        justifyContent:"center"
    }
})