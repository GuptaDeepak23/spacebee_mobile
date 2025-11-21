import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../Screens/LoginScreen'
import OtpScreen from '../Screens/OtpScreen'
import { Bottomtabs } from './Bottomtabs'

const Stack = createNativeStackNavigator()

export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="Bottomtabs" component={Bottomtabs} />
    </Stack.Navigator>
  )
}

