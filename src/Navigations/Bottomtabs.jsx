import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from '../Screens/HomeScreen'
import CalendarScreen from '../Screens/CalendarScreen'
import MyBookingScreen from '../Screens/MyBookingScreen'
import ProfileScreen from '../Screens/ProfileScreen'
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()


export const Bottomtabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#00C896',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="MyBooking" 
        component={MyBookingScreen}
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="Calendar" 
        component={CalendarScreen}
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={24} color={color} />
          )
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={24} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}
