import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const FeedDetail = ({data}) => {

  const screenWidth = Math.round(Dimensions.get('window').width)
  const cardWidth = screenWidth/2 - 20

  const navigation = useNavigation()
  
  const handleClick = () => {
    navigation.navigate('Product', {_id : data._id})
  }

  return (
    <TouchableOpacity onPress={handleClick} style={[tw`p-2 m-2 rounded-xl bg-white flex items-center justify-center`,
    {width : cardWidth}]}>
      <Image
        source={{uri : data?.mainImage?.asset?.url}}
        resizeMode='contain'
        style={tw`w-32 h-52`}
        />
      
      <View style={tw`flex items-start justify-start w-full`}>
        <Text style={tw`text-sm font-semibold text-gray-500`}>{data?.title}</Text>
        <Text style={tw`text-xs text-gray-500`}>{data?.shortDscription?.substring(0, 20)}...</Text>
        
      </View>

      <View style={tw`flex-row items-center justify-between w-full`}>
        <Text style={tw`text-sm font-semibold text-center text-gray-500`}>$ {data?.price}</Text>
        <TouchableOpacity style={tw`bg-black w-8 h-8 rounded-full flex items-center justify-center`}>
          <AntDesign name="heart" size={16} color="#fbfbfb" />
        </TouchableOpacity>
      </View>
      

    </TouchableOpacity>
  )
}

export default FeedDetail

