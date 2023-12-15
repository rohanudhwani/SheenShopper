import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'

const BottomTab = () => {
  return (
    <View style={tw`absolute bottom-6`}>
      <Text>BottomTab</Text>
    </View>
  )
}

export default BottomTab

const styles = StyleSheet.create({})