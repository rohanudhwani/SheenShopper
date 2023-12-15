import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'



const BottomTab = ({activeScreen}) => {

    const navigation = useNavigation()
  return (
    <View style={tw`absolute bottom-0 w-full px-7`}>
      <View style={tw`bg-[#130d2d] rounded-xl px-4 py-5 w-full items-center flex-row justify-around`}>
        <TouchableOpacity>
            <FontAwesome name="user" size={32} color="#5C5576" />
        </TouchableOpacity>
        <TouchableOpacity>
            <MaterialIcons name="format-list-bulleted" size={32} color="#5C5576" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <FontAwesome name="home" size={32} color={activeScreen === "Home" ? "#fff" : "#5C5576"} />
        </TouchableOpacity>


        <TouchableOpacity>
            <MaterialIcons name="collections" size={32} color="#5C5576" />
        </TouchableOpacity>

        <TouchableOpacity>
            <MaterialIcons name="shopping-cart" size={32} color="#5C5576" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default BottomTab

const styles = StyleSheet.create({})