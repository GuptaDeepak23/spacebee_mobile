import { View, Image,Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import { TextInput } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const LoginScreen = () => {
  return (
    <SafeAreaView >
        <View style={styles.container}>
        {/* Top logo side */}
      <View style={styles.topLogoContainer}>
        <Image source={require('../../assets/spaceback_logo.jpg')} style={styles.logo} />
        <View style={styles.Overlay}></View>
        <View style={styles.spacebeeContainer}>
            <View style={styles.spacebeelogoContainer}>
            <Image source={require('../../assets/Spacebee logo.png') } style={styles.spacebeelogo}/>
            {/* <Text style={styles.spacebeelogoText}>Spacebee</Text> */}
            <Image source={require('../../assets/spacebee-Text.png') } style={styles.spacebeeTextImage}/>
            </View>
            <View>
            <Text style={styles.spacebeeText}>Manage <Text style={styles.spacebeeTextBold}>Meetings</Text> Smarter.</Text>
            </View>
            <View>
            <Text style={styles.spacebeeText2}>Book rooms, track schedules & stay organized effortlessly.</Text>
            </View>
            
        </View>
      </View>

      {/* Bottom login side */}
      <View style={styles.bottomLoginContainer}>
        <View style={styles.bottomLoginContainerInner}>
            <Text style={styles.loginTitle}>Login</Text>
            <View>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} placeholder='Email' />
            </View>
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
        </View>
      </View>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        width: responsiveWidth(100),
        height: responsiveHeight(100),
        // backgroundColor: 'black',
    },
    logo: {
        width: responsiveWidth(100),
        height: responsiveHeight(30),
        resizeMode: 'cover',
    
    },
    Overlay: {
        width: responsiveWidth(100),
        height: responsiveHeight(30),
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    spacebeelogoContainer:{
   flexDirection: 'row',
   alignItems: 'center',
  

   gap: responsiveWidth(2),
    },
    spacebeelogo: {
        width: responsiveWidth(10),
        height: responsiveHeight(5),
        resizeMode: 'contain',
        zIndex: 2,
    },
    spacebeelogoText: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: 'green',
    },
    spacebeeTextImage:{
         zIndex: 2,
    },
    spacebeeContainer:{
        flexDirection: 'column',
        alignItems: 'start',
        
        gap: responsiveHeight(2),
        position: 'absolute',
        bottom: responsiveHeight(1),
      left: responsiveWidth(4),

        top: responsiveHeight(7),
      
    },
    topLogoContainer:{
        position: 'relative',
    },
    spacebeeText: {
        fontSize: responsiveFontSize(3),
        fontStyle: 'Arial, Helvetica, sans-serif',
        fontWeight: '600',
        color: '#EEEEEE',
        zIndex: 2,
    },
    spacebeeText2:{
        fontSize: responsiveFontSize(1.5),
        color: '#EEEEEE',
        zIndex: 2,
    },
    spacebeeTextBold:{
        fontWeight: '900',
    },
    bottomLoginContainer:{
       height: '100%',
    },
    bottomLoginContainerInner:{
        position: 'absolute',
        bottom:'4%',
        backgroundColor:'white',
        borderTopLeftRadius: responsiveWidth(6),
        borderTopRightRadius: responsiveWidth(6),
        padding: responsiveWidth(8),
        paddingTop: responsiveWidth(8),
       
        zIndex: 3,
        width: responsiveWidth(100),
        height: responsiveHeight(100),
    },
    loginTitle:{
        fontSize: responsiveFontSize(3),
        fontWeight:'700',
        marginBottom:responsiveHeight(2),

    },
    label:{
        color:'#6B7280',
        fontWeight:'400',
        marginBottom:responsiveHeight(1),
    },
    input:{
        borderWidth:1,
        borderColor:'#EDF1F3',
        borderRadius:responsiveWidth(2),
        padding:responsiveWidth(4),
        marginBottom:responsiveHeight(2),
        
    },
    loginButton:{
        backgroundColor:'#22BF96',
        justifyContent:'center',
        alignItems:'center',
        padding:responsiveWidth(4),
        borderRadius:responsiveWidth(2),
        marginBottom:responsiveHeight(2),
    },
    loginButtonText:{
        color:'#FFFFFF',
        fontWeight:'600',
        fontSize:responsiveFontSize(1.7),
    },
})