import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen } from '../Screens/HomeScreen'
import CalendarScreen from '../Screens/CalendarScreen'
import MyBookingScreen from '../Screens/MyBookingScreen'
import ProfileScreen from '../Screens/ProfileScreen'
import { Ionicons } from '@expo/vector-icons'
import Bookroom from '../components/Bookroom'

const Tab = createBottomTabNavigator()


export const Bottomtabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#00C896',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
        },
        tabBarButton: (props) => {
          const { accessibilityState, children, style, ...otherProps } = props;
          const isFocused = accessibilityState?.selected;
          
          return (
            <View
              style={[
                {
                  flex: 1,
                },
                isFocused && {
                  borderTopWidth: 3,
                  borderTopColor: '#4CAF50',
                },
              ]}
            >
              <TouchableOpacity
                {...otherProps}
                style={[
                  style,
                  {
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}
              >
                {children}
              </TouchableOpacity>
            </View>
          );
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size || 24} color={color} /> }}
      />
      <Tab.Screen 
        name="Calendar" 
        component={CalendarScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size || 24} color={color} /> }}
      />
      <Tab.Screen 
        name="MyBooking" 
        component={MyBookingScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size || 24} color={color} /> }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size || 24} color={color} /> }}
      />
    </Tab.Navigator>
  )
}
