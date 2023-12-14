import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect }  from 'react'
import tw from 'twrnc'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { Screen3 } from '../assets'
import { fetchFeeds } from '../sanity'

import "react-native-url-polyfill/auto"

const HomeScreen = () => {

  const [searchTerm, setsearchTerm] = useState("")
  const [isLoading, setisLoading] = useState(false)

  const handleSearchTerm = (text) => {
    setsearchTerm(text)
  }

  useEffect(() => {
    setisLoading(true)
    
    try{
      fetchFeeds().then(res => {
        console.log(res)
        setInterval(() => {
          setisLoading(false)
        }, 200);
      })
    } catch (error) {
      console.log(error)
      setisLoading(false)
    }
    
  }, [])
  

  return (
    <SafeAreaView style={tw`flex-1 items-center justify-start py-10 bg-[#EBEAEF]`}>
      <View style={tw`flex-row w-full items-center justify-between px-4 py-2`}>
        <MaterialIcons name="chevron-left" size={32} color="#555" />

        <Image source={Screen3} style={tw`w-12 h-12 rounded-xl`} resizeMode='cover'/>
      </View>

      <View style={tw`flex-row items-center justify-between px-7 py-2 w-full mr-6`}>
        <View style={tw`px-4 py-2 bg-white rounded-xl flex-row items-center justify-center mr-2 w-73`}>
          <MaterialIcons name="search" size={24} color="#7f7f7f" />
          <TextInput
            style={tw`text-lg font-semibold flex-1 px-2 py-1 -mt-1`}
            placeholderTextColor="#555"
            placeholder='Search Here...'
            value={searchTerm}
            onChange={handleSearchTerm}/>
        </View>

        <TouchableOpacity style={tw`w-12 h-12 rounded-xl flex items-center justify-center bg-white`}>
          <FontAwesome name="filter" size={24} color="#7f7f7f"/>

        </TouchableOpacity>

      </View>


      {/* Scrollable container start */}

      <ScrollView style={tw`flex-1 w-full`}>
        {isLoading ? <View style={tw`flex-1 h-80 items-center justify-center`}><ActivityIndicator size={'large'} color={"teal"}/></View> : <Text>Loaded</Text>}


      </ScrollView>


    </SafeAreaView>
  )
}

export default HomeScreen

