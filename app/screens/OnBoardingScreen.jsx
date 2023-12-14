import { Text, View, StyleSheet, Image } from 'react-native'
import React from 'react'
import Swiper from 'react-native-swiper'
import { Brand, Screen1, Screen2 } from '../assets';
import tw from 'twrnc'



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
      lineContainer: {
        width: 180,
        height: 150, // You can omit this line if you want the height to be determined by content
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        position: 'absolute',
        left: 20,
        top: 120,
      },
      brandImage: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    description: {
        fontSize: 20,
        fontWeight: 'semibold',
        color: '#555',
        textAlign: 'center',
        marginTop: 20,
    },
    
  });

const OnBoardingScreen = () => {
  return (
    <View style={styles.container}>
      <Swiper>
        <ScreenOne />
        <ScreenTwo />
        <ScreenThree />
      </Swiper>
    </View>
  )
}

export const ScreenOne = () => {
    return (
        <View style={styles.container}>
            <Image source={Screen1} style={styles.image} />
            <View style={styles.lineContainer}>
                <Image source={Brand} style={styles.brandImage} />
                <Text style={styles.description}>Enchant Beauty</Text>
            </View>
        </View>
    )
}

export const ScreenTwo = () => {
    return (
        <View style={tw`flex-1 sapce-y-6 items-center justify-start`}>
            <Image source={Screen2} style={tw`w-full h-[65%]`} resizeMode='cover'/>
            <View style={tw`flex items-center justify-center px-6 py-3`}>
              <Text style={tw`text-xl tracking-wider text-[#555]`}>
                Find your beauty products
              </Text>
              <Text style={tw`text-l tracking-wider text-[#777] text-center py-2`}>
                Beauty begins the moment you decide to be yourself
              </Text>
            </View>
        </View>
    )
}

export const ScreenThree = () => {
    return (
        <View style={styles.container}>
            <Text>Screen Three</Text>
        </View>
    )
}

export default OnBoardingScreen;

