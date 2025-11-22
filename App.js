import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, ActivityIndicator, AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProvider } from "./src/Context/Auth_Context";
import { AuthStack } from "./src/Navigations/AuthStack";
import { Bottomtabs } from "./src/Navigations/Bottomtabs";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkToken();
    
    // Listen for app state changes to re-check token
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkToken();
      }
    });

    // Check token periodically to catch logout events
    // This helps detect when token is removed from AsyncStorage
    const interval = setInterval(() => {
      checkToken();
    }, 500);

    return () => {
      subscription?.remove();
      clearInterval(interval);
    };
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const newAuthState = !!token;
      if (isAuthenticated !== newAuthState) {
        setIsAuthenticated(newAuthState);
      }
    } catch (error) {
      console.log('Error checking token:', error);
      setIsAuthenticated(false);
    } finally {
      if (isLoading) {
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#22BF96" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <NavigationContainer>
          {isAuthenticated ? <Bottomtabs /> : <AuthStack />}
        </NavigationContainer>
      </AuthProvider>
    </GestureHandlerRootView>
  )
}