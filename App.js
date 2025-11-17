import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Bottomtabs } from "./src/Navigations/Bottomtabs";

export default function App() {
  return (
    <NavigationContainer>
      <Bottomtabs />
    </NavigationContainer>
  )
}