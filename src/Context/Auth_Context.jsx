import React, { createContext, useContext , useState, useEffect } from 'react'
import base_url from '../base_url'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = createContext()



export const AuthProvider = ({ children }) => {

  const [userData, setUserData] = useState(null)

  // Load userData from AsyncStorage on mount
  useEffect(() => {
    loadUserData()
  }, [])

  const loadUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem('userData')
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData)
        setUserData(parsedData)
        console.log('UserData loaded from storage:', parsedData)
      }
    } catch (error) {
      console.log('Error loading userData from storage:', error)
    }
  }

   const Login = async (email) => {
    try{
        console.log('Login API called with email:', email)
        console.log('API URL:', `${base_url}/auth/employee/request-otp`)
        const response = await axios.post(`${base_url}/auth/employee/request-otp`, { email })
        console.log('Login API response:', response.data)
        return response.data
    }catch(error){
        console.log('Login API error:', error)
        console.log('Error response:', error.response?.data)
        return error.response?.data
    }
   }

   const VerifyOtp = async (email, otp) => {
    try{
        console.log('Verify OTP API called with email:', email, 'and OTP:', otp)
        console.log('API URL:', `${base_url}/auth/employee/login`)
        const response = await axios.post(`${base_url}/auth/employee/login`, { email, otp })
        console.log('Verify OTP API response:', response.data)
        
        // Set userData in state and persist to AsyncStorage
        setUserData(response.data)
        await AsyncStorage.setItem('userData', JSON.stringify(response.data))
        console.log('UserData set in context and stored:', response.data)
        
        return response.data
    }catch(error){
        console.log('Verify OTP API error:', error)
        console.log('Error response:', error.response?.data)
        return error.response?.data
    }
   }

   const Logout = async () => {
    try {
      console.log('Logout called')
      // Clear token and userData from AsyncStorage
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('userData')
      // Clear userData from state
      setUserData(null)
      console.log('Token and userData cleared from storage')
    } catch (error) {
      console.log('Error during logout:', error)
    }
   }

   return (
    <AuthContext.Provider value={{ Login, VerifyOtp, Logout, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
   )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
export default AuthContext;