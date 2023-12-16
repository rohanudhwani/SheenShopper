import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { EmptyCart } from '../assets'

const CartScreen = () => {

    const navigation = useNavigation()
    
    const cartItems = useSelector((state) => state.cartItems.cart)


  return (
    <SafeAreaView style={tw`flex-1 w-full items-start justify-start bg-[#EBEAEF] py-7`}>
        <View style={tw`flex-row items-center justify-between w-full px-4 py-2`}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Entypo name="chevron-left" size={32} color={"#555"} />
            </TouchableOpacity>
            
            <Text style={tw`text-xl font-semibold text-[#555]`}>Shopping Bag</Text>

            <View style={tw`w-10 h-10 rounded-xl bg-white flex items-center justify-center relative`}>
                <FontAwesome5 name="shopping-bag" size={16} color="black" />
                <View style={tw`w-4 h-4 rounded-full bg-black absolute top-0 right-0 flex items-center justify-center`}>
                    <Text style={tw`text-white text-xs font-semibold`}> {cartItems?.length} </Text>
                </View>
            </View>
        </View>

        {cartItems.length === 0 || !cartItems ? (
            <View style={tw`w-full flex-1 h-full items-center justify-center`}>
                <Image source={EmptyCart} style={tw`w-64 h-64`} resizeMode='contain' />
            </View>
        
        ) : (
            <ScrollView style={tw`w-full flex-1`}>
                <View style={tw`py-4 flex`}>
                    <FlatList
                        data={cartItems}
                        keyExtractor={item => item.data._id}
                        renderItem={({item}) => (
                            <CartItemCard item={item.data} qty={item.qty} />)
                        } />
                </View>

                {/* Promocode */}

                


            </ScrollView>
        )}
    </SafeAreaView>
  )
}

export const CartItemCard = ({item, qty}) => {
    return (
        <View style={tw`flex-row px-6 w-full items-center my-1`}>
            <View style={tw`bg-white rounded-xl flex p-2 w-16 h-16 items-center justify-center relative`}>
                <Image source={{uri : item?.bgImage?.asset?.url}} resizeMode='cover' style={tw`w-full h-full opacity-30`} />
                <View style={tw`inset-0 absolute flex items-center justify-center`}>
                    <Image source={{uri : item?.mainImage?.asset?.url}} resizeMode='contain' style={tw`w-12 h-12`} />
                </View>
            </View>


            {/* Text Section */}

            <View style={tw`flex items-center py-2 ml-3`}>
                <View style={tw`flex items-start justify-center`}>
                    <Text style={tw`w-50 text-sm text-[#555]`}>{item?.title}</Text>
                    <Text style={tw`w-50 text-xs text-[#777]`}>{item?.shortDscription?.substring(0, 20)}...</Text>
                    {/* <View style={tw`flex-row items-center justify-center`}>
                        <Text>$ {item?.price * qty}</Text>
                        <Text style={tw`left-3`}>(Qty : {qty})</Text>
                    </View> */}

                    <Text style={tw`text-lg font-bold text-black`}>
                        $ {item?.price * qty}
                    </Text>
                    
                </View>
            </View>

            {/* Quantity section  */}

            <View style={tw`flex-row items-center justify-center rounded-xl border border-gray-300 ml-auto px-2`}>
                    <Text style={tw`text-base font-bold text-black`}>(Qty : {qty})</Text>
                </View>
        </View>
    )
}
export default CartScreen

const styles = StyleSheet.create({})