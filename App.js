import "./global.css"
import React, { useState, useEffect } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthProvider, useAuth } from "./src/Context/Auth_Context";
import { AuthStack } from "./src/Navigations/AuthStack";
import { Bottomtabs } from "./src/Navigations/Bottomtabs";
import Toast from 'react-native-toast-message';
import CustomToast from './src/components/CustomToast';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

// Create a wrapper component that uses the auth context
function AppNavigator() {
  const { userData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Give time for userData to load from AsyncStorage
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#22BF96" />
      </View>
    );
  }

  // Check if user is authenticated based on userData
  const isAuthenticated = userData && userData.access_token;

  return isAuthenticated ? <Bottomtabs /> : <AuthStack />;
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </NavigationContainer>
      </QueryClientProvider>
      <Toast config={CustomToast} />
    </GestureHandlerRootView>
  );
}
