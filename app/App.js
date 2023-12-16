import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {CartScreen, HomeScreen, OnBoardingScreen, ProductScreen} from './screens'

import { Provider, connect } from 'react-redux'
import store from './context/store'
import { BottomTab } from './components'

const Stack = createNativeStackNavigator()

const MyComponent = ({setActiveScreen}) => {
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      const currentScreen = navigation.getCurrentRoute().name
      setActiveScreen(currentScreen)
    });

    return unsubscribe
  }, [navigation])
}

const App = () => {

  const [activeScreen, setActiveScreen] = useState("")

  return (
    <NavigationContainer>
      <MyComponent setActiveScreen={setActiveScreen} />
      <Provider store={store}>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Product" component={ProductScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
        </Stack.Navigator>
      </Provider>

      {activeScreen !== "OnBoarding" && (
        <BottomTab activeScreen={activeScreen}/>
      ) }
    </NavigationContainer>
  )
}

export default App