import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Bottomtabs } from "./src/Navigations/Bottomtabs";
import LoginScreen from "./src/Screens/LoginScreen";

export default function App() {
  return (
   
    <NavigationContainer>
       <LoginScreen />
      {/* <Bottomtabs /> */}
    </NavigationContainer>
  )
}