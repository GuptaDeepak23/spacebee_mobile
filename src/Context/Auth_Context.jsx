import React, { createContext, useContext, useState, useEffect } from 'react'
import base_url from '../base_url'
import { useRequestOtp, useVerifyOtp } from '../Api/use.api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import apiClient from '../apiClient'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)

  // Load userData from AsyncStorage on mount
  useEffect(() => {
    loadUserData()

    // Global 401 interceptor setup
    const responseInterceptor = apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          console.log('Unauthorized (401) detected. Logging out...')
          await Logout()
        }
        return Promise.reject(error)
      }
    )

    return () => {
      apiClient.interceptors.response.eject(responseInterceptor)
    }
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

  const { mutateAsync: requestOtpMutation } = useRequestOtp()
  const { mutateAsync: verifyOtpMutation } = useVerifyOtp()

  const Login = async (email) => {
    console.log('Login API called with email:', email)
    const data = await requestOtpMutation(email)
    console.log('Login API response:', data)
    return data
  }

  const VerifyOtp = async (email, otp) => {
    console.log('Verify OTP API called with email:', email, 'and OTP:', otp)
    const data = await verifyOtpMutation({ email, otp })
    console.log('Verify OTP API response:', data)

    // Set userData in state and persist to AsyncStorage
    setUserData(data)
    await AsyncStorage.setItem('userData', JSON.stringify(data))
    console.log('UserData set in context and stored:', data)

    return data
  }

  const Logout = async () => {
    try {
      console.log('Logout called')
      // Clear token and userData from AsyncStorage
      await AsyncStorage.removeItem('token')
      await AsyncStorage.removeItem('userData')
      // Clear userData from state
      setUserData(null)
      // App.js will automatically detect the userData/token removal and switch to AuthStack
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

export default AuthContext