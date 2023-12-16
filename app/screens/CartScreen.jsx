import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { EmptyCart } from '../assets'

import Swipeable from 'react-native-gesture-handler/Swipeable'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { removeFromCart } from '../context/actions/cartActions'

import { ScrollView } from 'react-native-virtualized-view'

const CartScreen = () => {

    const navigation = useNavigation()

    const [total, setTotal] = useState(0)
    
    const cartItems = useSelector((state) => state.cartItems.cart)

    useEffect(() => {
        let mainTotal=0
        if(cartItems?.length > 0){
            cartItems.map((item) => {
                mainTotal += item.data.price * item.qty
                setTotal(mainTotal)
            })
        }
    }, [cartItems])


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
        
        ) : (<GestureHandlerRootView style={tw`flex-1 w-full items-start justify-start bg-[#EBEAEF] py-7`}>
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

                <View style={tw`w-full p-8`}>
                    <View style={tw`w-full px-2 h-16 rounded-xl bg-white flex-row items-center justify-between`}>
                        <TextInput placeholder='Promo Code' style={tw`text-base px-4 font-semibold text-[#555] flex-1 py-1`} />
                        <TouchableOpacity style={tw`bg-black px-3 py-2 rounded-xl flex items-center justify-center`}>
                            <Text style={tw`text-white text-lg`}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Total Calculation */}


                <View style={tw`px-8 w-full flex py-2`}>
                    <View style={tw`flex-row items-center justify-between`}>
                        <Text style={tw`text-lg font-semibold text-[#555]`}>Subtotal</Text>
                        <View style={tw`flex-row items-center justify-center`}>
                            <Text style={tw`text-xl font-semibold text-black`}>₹{parseFloat(total).toFixed(2)}</Text>
                            <Text style={tw`text-sm text-gray-500 ml-2 py-1`}>USD</Text>
                        </View>
                    </View>

                    <View style={tw` w-full h-[2px] bg-white`}>

                    </View>

                </View>

                <View style={tw`px-8 w-full flex py-2`}>
                    <View style={tw`flex-row items-center justify-between`}>
                        <Text style={tw`text-lg font-semibold text-[#555]`}>Shipping Cost</Text>
                        <View style={tw`flex-row items-center justify-center`}>
                            <Text style={tw`text-xl font-semibold text-black`}>₹5.0</Text>
                            <Text style={tw`text-sm text-gray-500 ml-2 py-1`}>USD</Text>
                        </View>
                    </View>

                    <View style={tw` w-full h-[2px] bg-white`}>

                    </View>

                </View>

                <View style={tw`px-8 w-full flex py-2`}>
                    <View style={tw`flex-row items-center justify-between`}>
                        <Text style={tw`text-xl font-bold text-[#666]`}>Grand Total</Text>
                        <View style={tw`flex-row items-center justify-center`}>
                            <Text style={tw`text-sm text-gray-500 ml-2 py-1 mr-4`}>({cartItems?.length}) items</Text>
                            <Text style={tw`text-xl font-semibold text-black`}>₹{parseFloat(total + 5.0).toFixed(2)}</Text>
                            <Text style={tw`text-sm text-gray-500 ml-2 py-1`}>USD</Text>
                        </View>
                    </View>

                </View>

                <View style={tw`w-full px-8 my-4`}>
                    <TouchableOpacity style={tw`bg-black p-2 w-full rounded-xl flex items-center justify-center`}>
                        <Text style={tw`text-white text-lg font-semibold`}>Proceed to Checkout</Text>
                    </TouchableOpacity>
                </View>

            
            </ScrollView>
        </GestureHandlerRootView>
        )}
        
    </SafeAreaView>
  )
}

const rightSwipeActions = () => {
    return (
      <View style={tw`h-full w-24 flex items-center justify-center bg-white`}>
        <TouchableOpacity>
          <FontAwesome5 name="trash" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

export const CartItemCard = ({item, qty}) => {
    
    const dispatch = useDispatch();

    const swipeFromRightOpen = (_id) => {
        dispatch(removeFromCart(_id));
    };
    return (
        <Swipeable
      renderRightActions={rightSwipeActions}
      onSwipeableRightOpen={() => swipeFromRightOpen(item._id)}
    >
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
                        <Text>₹ {item?.price * qty}</Text>
                        <Text style={tw`left-3`}>(Qty : {qty})</Text>
                    </View> */}

                    <Text style={tw`text-lg font-bold text-black`}>
                        ₹ {parseFloat(item?.price * qty).toFixed(2)}
                    </Text>
                    
                </View>
            </View>

            {/* Quantity section  */}

            <View style={tw`flex-row items-center justify-center rounded-xl border border-gray-300 ml-auto px-2`}>
                    <Text style={tw`text-base font-bold text-black`}>(Qty : {qty})</Text>
                </View>
        </View>
        </Swipeable>
    )
}
export default CartScreen

const styles = StyleSheet.create({})