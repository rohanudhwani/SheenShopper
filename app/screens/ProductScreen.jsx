import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twrnc'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { addtocart } from '../context/actions/cartActions'

const ProductScreen = ({route}) => {

    const { _id } = route.params

    const cartItems = useSelector(state => state.cartItems)
    const feeds = useSelector(state => state.feeds)
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const [qty, setQty] = useState(1)

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const screenHeight = Math.round(Dimensions.get('window').height)

    useEffect(() => {
        setIsLoading(true)
        if(feeds){
            setData( feeds?.feeds.filter((item) => item._id === _id)[0] )
            setInterval(() => {
                setIsLoading(false)
            }, 2000);
        }
    }, [])

    const handleQty = (action) => {
        const newQty = qty + action
        setQty(newQty >= 1 ? newQty : 1)
    }

    const handlePressCart = () => {
        dispatch(addtocart({data: data, qty: qty}))
    }


  return (
    <View style={tw`flex-1 items-start justify-start bg-[#EBEAEF]`}>
      {isLoading ? (
        <View style={tw`w-full flex-1 h-full items-center justify-center`}>
            <ActivityIndicator size="large" color="teal" />
        </View>
        )
        : (
            <>
                <SafeAreaView style={tw`w-full`}>
                    <View style={tw`flex-row items-center justify-between px-4 py-2 w-full`}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Entypo name="chevron-left" size={32} color={"#555"} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate("CartScreen")}>
                            <MaterialIcons name="shopping-cart" size={32} color={"#555"} />
                        </TouchableOpacity>
                    </View>


                    {/* Image Section */}

                    <View style={[tw`w-full flex items-center justify-center relative`, {height : screenHeight/2} ] } >
                        <Image source={{uri : data?.bgImage?.asset?.url}} resizeMode='cover' style={tw`w-full h-full opacity-30`} />
                        <View style={tw`w-full h-full absolute top-0 left-0 flex items-center justify-center`}>
                            <Image source={{uri : data?.mainImage?.asset?.url}} resizeMode='contain' style={tw`w-80 h-80`} />
                        </View>
                    </View>


                    {/* Category Section */}
                    <View style={tw`w-full flex-row items-center justify-evenly mb-4`}>
                        {data?.categories && data?.categories?.length > 0 && data?.categories.map((value) => (
                            <View key={value._id} style={tw`p-2 w-24 rounded-xl bg-white flex items-center justify-center mr-2`}>
                                <Image 
                                    source={{ uri : value?.mainImage?.asset?.url }}
                                    resizeMode='contain'
                                    style={tw`w-10 h-10 opacity-70`}
                                />
                                <Text style={tw`font-semibold text-[#555]`}> {value.title} </Text>
                            </View>
                        ))}
                    </View>


                </SafeAreaView>

                <View style={tw`w-full flex-1 h-full bg-white rounded-t-[36px] py-6 px-12 mr-4 `}>
                    <View style={tw`flex-row items-center justify-between w-full`}>
                        <View style={tw`flex items-start justify-start w-full`}>
                            <Text style={tw`text-base font-semibold text-gray-500`}>{data?.title}</Text>
                            <Text style={tw`text-xs text-gray-500`}>{data?.shortDscription?.substring(0, 150)}...</Text>
                        </View>

                        <View style={tw`flex-row items-center justify-between w-full`}>
                            <TouchableOpacity style={tw`bg-black w-8 h-8 rounded-full flex items-center justify-center`}>
                            <AntDesign name="heart" size={16} color="#fbfbfb" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Bottom Section */}
                    <View style={tw`flex-row items-center justify-between w-full top-1 `}>
                        <Text style={tw`text-lg font-bold text-center text-black`}>$ {data?.price}</Text>

                        <View style={tw`flex-row items-center justify-center rounded-xl border border-gray-200 px-6 py-1`}>
                            <TouchableOpacity onPress={() => handleQty(-1)} style={tw`right-4`}>
                                <Text style={tw`text-xl font-bold text-[#555]`}>-</Text>
                            </TouchableOpacity>
                            <Text style={tw`text-xl font-bold text-black`}>{qty}</Text>
                            <TouchableOpacity onPress={() => handleQty(1)} style={tw`left-4`}>
                                <Text style={tw`text-xl font-bold text-[#555]`}>+</Text>
                            </TouchableOpacity>

                        </View>

                        {cartItems?.cart?.filter((item) => item?.data?._id === data?._id).length > 0 ? (
                            <TouchableOpacity style={tw`bg-black px-4 py-2 rounded-xl`}>
                                <Text style={tw`text-base font-semibold text-gray-50`}>
                                    Added
                                </Text>
                            </TouchableOpacity>) : (
                            <TouchableOpacity onPress={handlePressCart} style={tw`bg-black px-4 py-2 rounded-xl`}>
                                <Text style={tw`text-base font-semibold text-gray-50`}>
                                    Add to Cart
                                </Text>
                            </TouchableOpacity>)
                        }
                        
                    </View>

                </View>
            </>
        )}
    </View>
  )
}

export default ProductScreen

const styles = StyleSheet.create({})