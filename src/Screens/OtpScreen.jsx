import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '../Context/Auth_Context'

const OtpScreen = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const email = route.params?.email || ''

  const { VerifyOtp, Login } = useAuth()

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const inputRefs = Array.from({ length: 6 }, () => useRef(null))

  // focus first input
  useEffect(() => {
    setTimeout(() => {
      inputRefs[0].current?.focus()
    }, 150)
  }, [])

  // auto verify
  useEffect(() => {
    const code = otp.join('')
    if (code.length === 6 && !loading) {
      verifyOtp(code)
    }
  }, [otp])

  const verifyOtp = async (code) => {
    setLoading(true)
    try {
      const res = await VerifyOtp(email, code)
      console.log('Verify OTP Response:', res)

      if (res?.detail) {
        resetOtp()
        return
      }

      if (res?.access_token) {
        await AsyncStorage.setItem('token', res.access_token)
        navigation.reset({
          index: 0,
          routes: [{ name: 'Bottomtabs' }],
        })
      }
    } catch (err) {
      resetOtp()
    } finally {
      setLoading(false)
    }
  }

  const resetOtp = () => {
    setOtp(['','','','','',''])
    setCurrentIndex(0)
    setTimeout(() => inputRefs[0].current?.focus(), 100)
  }

  const handleChange = (value, index) => {
    const digit = value.replace(/[^0-9]/g, '')

    // prevent typing in later boxes
    if (index !== currentIndex) {
      inputRefs[currentIndex].current?.focus()
      return
    }

    let newOtp = [...otp]
    newOtp[index] = digit
    setOtp(newOtp)

    if (digit && index < 5) {
      setCurrentIndex(index + 1)

      requestAnimationFrame(() => {
        inputRefs[index + 1].current?.focus()
      })
    }
  }

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (otp[index] !== '') {
        let updated = [...otp]
        updated[index] = ''
        setOtp(updated)
        return
      }

      if (index > 0) {
        let updated = [...otp]
        updated[index - 1] = ''
        setOtp(updated)

        setCurrentIndex(index - 1)
        requestAnimationFrame(() => {
          inputRefs[index - 1].current?.focus()
        })
      }
    }
  }

  const handleFocus = (index) => {
    // prevent jump
    if (index !== currentIndex) {
      inputRefs[currentIndex].current?.focus()
    }
  }

  const resendOtp = async () => {
    setLoading(true)
    try {
      await Login(email)
      resetOtp()
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.otpContainer}>
          <Text style={styles.otpTitle}>OTP Verification</Text>
          <Text style={styles.otpText}>Enter the OTP sent to your email</Text>

          <View style={styles.otpInputContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                keyboardType="numeric"
                value={digit}
                maxLength={1}
                style={[
                  styles.otpInput,
                  index === currentIndex ? styles.activeBox : styles.inactiveBox
                ]}
                onChangeText={(val) => handleChange(val, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => handleFocus(index)}
              />
            ))}
          </View>

          <TouchableOpacity onPress={resendOtp} disabled={loading}>
            <Text style={styles.otpResendText}>
              Didn’t receive code?
              <Text style={styles.otpResendCode}> Resend</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default OtpScreen

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
  },
  otpContainer: {
    padding: responsiveWidth(5),
    marginTop: '30%',
    gap: responsiveHeight(2),
  },
  otpTitle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '700',
  },
  otpText: {
    fontSize: responsiveFontSize(1.6),
  },
  otpInputContainer: {
    flexDirection: 'row',
    gap: responsiveWidth(3),
  },
  otpInput: {
    width: responsiveWidth(12),
    height: responsiveHeight(6),
    borderWidth: 1.4,
    borderRadius: responsiveWidth(2),
    textAlign: 'center',
    fontSize: responsiveFontSize(1.6),
  },
  activeBox: {
    borderColor: '#22BF96',
    backgroundColor: '#FFFFFF',
  },
  inactiveBox: {
    borderColor: '#C8C8C8',
    backgroundColor: '#F3F3F3',
  },
  otpResendText: {
    fontSize: responsiveFontSize(1.7),
    marginTop: responsiveHeight(1.5),
  },
  otpResendCode: {
    color: '#22BF96',
    fontWeight: '700',
  }
})
