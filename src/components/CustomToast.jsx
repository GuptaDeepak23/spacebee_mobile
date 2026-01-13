import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

export const CustomToast = {
  success: ({ text1, text2 }) => (
    <View style={[styles.toastContainer, styles.successBackground]}>
      <View style={styles.iconContainer}>
        <AntDesign name="check" size={responsiveFontSize(2.5)} color="#FFFFFF" />
      </View>
      <View style={styles.textContainer}>
        {text1 ? <Text style={styles.text1}>{text1}</Text> : null}
        {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
      </View>
    </View>
  ),
  error: ({ text1, text2 }) => (
    <View style={[styles.toastContainer, styles.errorBackground]}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="error" size={responsiveFontSize(3)} color="#FFFFFF" />
      </View>
      <View style={styles.textContainer}>
        {text1 ? <Text style={styles.text1}>{text1}</Text> : null}
        {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
      </View>
    </View>
  ),
  warning: ({ text1, text2 }) => (
    <View style={[styles.toastContainer, styles.warningBackground]}>
      <View style={styles.iconContainer}>
        <Ionicons name="warning" size={responsiveFontSize(3)} color="#FFFFFF" />
      </View>
      <View style={styles.textContainer}>
        {text1 ? <Text style={styles.text1}>{text1}</Text> : null}
        {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
      </View>
    </View>
  ),
  info: ({ text1, text2 }) => (
    <View style={[styles.toastContainer, styles.infoBackground]}>
      <View style={styles.iconContainer}>
        <Ionicons name="information-circle" size={responsiveFontSize(3)} color="#FFFFFF" />
      </View>
      <View style={styles.textContainer}>
        {text1 ? <Text style={styles.text1}>{text1}</Text> : null}
        {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveWidth(90),
    padding: responsiveWidth(4),
    borderRadius: responsiveWidth(3),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  successBackground: {
    backgroundColor: '#22BF96', // Using the app's primary green
  },
  errorBackground: {
    backgroundColor: '#FF5252',
  },
  warningBackground: {
    backgroundColor: '#FFB300',
  },
  infoBackground: {
    backgroundColor: '#2196F3',
  },
  iconContainer: {
    marginRight: responsiveWidth(3),
  },
  textContainer: {
    flex: 1,
  },
  text1: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(1.8),
    fontWeight: '700',
  },
  text2: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(1.5),
    fontWeight: '400',
    marginTop: responsiveHeight(0.2),
  },
});

export default CustomToast;
