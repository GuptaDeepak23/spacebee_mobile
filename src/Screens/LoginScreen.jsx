import { View, Image, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { useAuth } from '../Context/Auth_Context'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const { Login } = useAuth()
  const navigation = useNavigation()

  const handleLogin = async () => {
    console.log('Login button pressed')
    console.log('Email entered:', email)

    if (!email || !email.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Email is required',
        position: 'top',
        topOffset: 60,
      })
      console.log('Email is empty, validation failed')
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Invalid email format',
        position: 'top',
        topOffset: 60,
      })
      console.log('Invalid email format')
      return
    }

    setLoading(true)
    console.log('Calling Login API...')

    try {
      const response = await Login(email)

      // Show success toast message
      const message = response?.message

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: message,
        position: 'top',
        topOffset: 60,
      })

      navigation.navigate('OtpScreen')



    } catch (error) {
      console.log('Login failed:', error)
      const errorMsg = error?.response?.data?.detail
        ? (typeof error.response.data.detail === 'string'
          ? error.response.data.detail
          : (Array.isArray(error.response.data.detail)
            ? error.response.data.detail[0]?.msg || JSON.stringify(error.response.data.detail)
            : JSON.stringify(error.response.data.detail)))
        : error.message

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMsg,
        position: 'top',
        topOffset: 60,
      })

    } finally {
      setLoading(false)
      console.log('Login process completed')
    }
  }

  return (
    <SafeAreaView>
      <View className="flex w-full h-full">
        {/* Top logo side */}
        <View className="relative">
          <Image
            source={require('../../assets/spaceback_logo.jpg')}
            className="w-full h-[30vh]"
            resizeMode="cover"
          />
          <View className="absolute inset-x-0 top-0 h-[30vh] bg-black/70 z-10"></View>
          <View className="flex-col items-start absolute top-[5vh] left-[4vw]  gap-y-[2vh]">
            <View className="flex-row items-center gap-x-[2vw]">
              <Image
                source={require('../../assets/Spacebee logo.png')}
                className="w-[10vw] h-[5vh] z-20"
                resizeMode="contain"
              />
              <Image
                source={require('../../assets/spacebee-Text.png')}
                className="z-20"
              />
            </View>
            <View>
              <Text className="text-[3.1vh] font-semibold text-[#EEEEEE] z-20">
                Manage <Text className="font-[900]">Meetings</Text> Smarter.
              </Text>
            </View>
            <View>
              <Text className="text-[1.4vh] text-[#EEEEEE] z-20">
                Book rooms, track schedules & stay organized effortlessly.
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom login side */}
        <View className="flex-1 mt-[-4vh] bg-white rounded-t-[6vw] p-[8vw] z-30">
          <Text className="text-[3vh] font-bold mb-[2vh]">Login</Text>
          <View>
            <Text className="text-[#6B7280] font-normal mb-[1vh]">Email</Text>
            <TextInput
              className="border border-[#EDF1F3] rounded-[2vw] p-[4vw] mb-[2vh]"
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
          </View>
          <TouchableOpacity
            className={`bg-[#22BF96] justify-center items-center p-[4vw] rounded-[2vw] mb-[2vh] ${loading ? 'opacity-60' : ''}`}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text className="text-white font-semibold text-[1.7vh]">
              {loading ? 'Logging in...' : 'Log In'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

