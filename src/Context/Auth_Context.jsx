import React, { createContext, useContext } from 'react'
import base_url from '../base_url'
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
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
        return response.data
    }catch(error){
        console.log('Verify OTP API error:', error)
        console.log('Error response:', error.response?.data)
        return error.response?.data
    }
   }

   return (
    <AuthContext.Provider value={{ Login, VerifyOtp }}>
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