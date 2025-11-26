import React from 'react'
import { useEffect, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '../Context/Auth_Context'
import { rw, rh, rf, rp } from '../utils/responsive'
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import base_url from '../base_url'
import axios from 'axios'



const ProfileScreen = () => {
  const { Logout, userData } = useAuth()

  const [profilestats, setProfilestats] = useState(null)

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    let token = await AsyncStorage.getItem('token')
    try {
      const response = await axios.get(`${base_url}/employee/statistics`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProfilestats(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleLogout = async () => {
    console.log('Logout button pressed')
    await Logout()
    // App.js will automatically detect the token removal and switch to AuthStack
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header - Green Section */}
      <View style={styles.profileHeader}>
        <View style={styles.profileTop}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userData?.employee_name?.charAt(0)}</Text>
            </View>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>{userData?.employee_name}</Text>
            <Text style={styles.role}>{userData?.employee_role}</Text>
          </View>


        </View>

        {/* Contact Information */}
        <View style={styles.contactInfo}>
          <View style={styles.contactRow}>
            <Ionicons name="mail-outline" size={responsiveFontSize(1.8)} color="#fff" />
            <Text style={styles.contactText}>{userData?.employee_email}</Text>

          </View>

          <View style={styles.contactRow}>
            <Ionicons name="briefcase-outline" size={responsiveFontSize(1.8)} color="#fff" />
            <Text style={styles.contactText}>{userData?.employee_role}</Text>
          </View>
        </View>
      </View>

      {/* Booking Statistics Section */}
      <View style={styles.statsCard}>
        <Text style={styles.sectionTitle}>Booking Statistics</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValueGreen}>{profilestats?.total_bookings}</Text>
            <Text style={styles.statLabel}>Total Bookings</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValueGreen}>{profilestats?.hours_booked}</Text>
            <Text style={styles.statLabel}>Hours Booked</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValueRed}>{profilestats?.cancelled_bookings}</Text>
            <Text style={styles.statLabel}>Cancelled</Text>
          </View>
        </View>
      </View>

      {/* My Activity Section */}
      <Text style={styles.sectionactivity}>My Activity</Text>
      <View style={styles.sectionCard}>

        <TouchableOpacity style={styles.listItem}>
          <View style={styles.listItemLeft}>
            <Ionicons name="checkbox-outline" size={rf(20)} color="#666" />
            <Text style={styles.listItemText}>My Bookings</Text>
          </View>
          <Ionicons name="chevron-forward" size={rf(20)} color="#999" />
        </TouchableOpacity>
        <View style={styles.listDivider} />
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.listItemLeft}>
            <Ionicons name="bar-chart-outline" size={rf(20)} color="#666" />
            <Text style={styles.listItemText}>Meetings Insights</Text>
          </View>
          <Ionicons name="chevron-forward" size={rf(20)} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Support & Assistance Section - Highlighted with Blue Border */}
      <Text style={styles.sectionactivity}>Support & Assistance</Text>
      <View style={[styles.sectionCard, styles.supportCard]}>

        <TouchableOpacity style={styles.listItem}>
          <View style={styles.listItemLeft}>
            <Ionicons name="help-circle-outline" size={rf(20)} color="#666" />
            <Text style={styles.listItemText}>Help & FAQ</Text>
          </View>
          <Ionicons name="chevron-forward" size={rf(20)} color="#999" />
        </TouchableOpacity>
        <View style={styles.listDivider} />
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.listItemLeft}>
            <Ionicons name="headset-outline" size={rf(20)} color="#666" />
            <Text style={styles.listItemText}>Contact Support</Text>
          </View>
          <Ionicons name="chevron-forward" size={rf(20)} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Legal & Account Info Section */}
      <Text style={styles.sectionactivity}>Legal & Account Info</Text>
      <View style={styles.sectionCard}>

        <TouchableOpacity style={styles.listItem}>
          <View style={styles.listItemLeft}>
            <Ionicons name="document-text-outline" size={rf(20)} color="#666" />
            <Text style={styles.listItemText}>Terms & Conditions</Text>
          </View>
          <Ionicons name="chevron-forward" size={rf(20)} color="#999" />
        </TouchableOpacity>
        <View style={styles.listDivider} />
        <TouchableOpacity style={styles.listItem}>
          <View style={styles.listItemLeft}>
            <Ionicons name="lock-closed-outline" size={rf(20)} color="#666" />
            <Text style={styles.listItemText}>Privacy Policy</Text>
          </View>
          <Ionicons name="chevron-forward" size={rf(20)} color="#999" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Log</Text>
        <Text style={styles.logoutButtonText}>Out</Text>
      </TouchableOpacity>
      {/* Bottom padding for scroll */}
      <View style={styles.bottomPadding} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {


    backgroundColor: '#F5F5F5',
  },
  profileHeader: {
    backgroundColor: '#22BF96',
    height: responsiveHeight(30),
    paddingTop: responsiveHeight(5),
    paddingBottom: responsiveHeight(3),
    paddingHorizontal: responsiveWidth(4.5),
  },
  profileTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',

    marginBottom: responsiveHeight(1),
  },
  avatarContainer: {
    marginRight: responsiveWidth(3),
  },
  avatar: {
    width: responsiveWidth(15.5),
    height: responsiveHeight(6),
    borderRadius: responsiveWidth(15.5),
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#90EE90',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: '#00C896',
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: responsiveHeight(0.1),
  },
  role: {
    fontSize: responsiveFontSize(1.7),
    color: '#fff',
    opacity: 0.9,
  },
  editButton: {
    paddingHorizontal: responsiveWidth(4),
    paddingVertical: responsiveHeight(1),
    borderRadius: responsiveWidth(2),
    borderWidth: 1,
    borderColor: '#B8E6D3',
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: '#fff',
  },
  contactInfo: {
    marginTop: responsiveHeight(0.8),
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rh(10),
  },
  contactText: {
    fontSize: responsiveFontSize(1.8),
    color: '#fff',
    marginLeft: responsiveWidth(1),
  },
  statsCard: {
    backgroundColor: '#fff',
    marginTop: '-15%',
    borderRadius: rw(20),
    padding: responsiveWidth(3),
    marginHorizontal: rp(16),
    marginBottom: rh(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: '600',
    color: '#1E1E1E',

    marginBottom: '3%',
  },
  sectionactivity: {
    fontSize: responsiveFontSize(1.4),
    fontWeight: '400',
    color: '#757575',
    paddingLeft: rp(16),
    marginBottom: rh(16),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: rh(40),
    backgroundColor: '#E0E0E0',
  },
  statValueGreen: {
    fontSize: rf(24),
    fontWeight: 'bold',
    color: '#00C896',
    marginBottom: rh(4),
  },
  statValueRed: {
    fontSize: rf(24),
    fontWeight: 'bold',
    color: '#EF4444',
    marginBottom: rh(4),
  },
  statLabel: {
    fontSize: responsiveFontSize(1.4),
    color: '#666',
  },
  sectionCard: {
    backgroundColor: '#fff',
    marginHorizontal: rp(16),
    marginBottom: rh(16),
    borderRadius: rw(12),
    padding: rp(16),

  },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: rh(12),
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  listItemText: {
    fontSize: rf(14),
    color: '#1A1A1A',
    marginLeft: rw(12),
  },
  listDivider: {
    height: 1,
    width: '100%',
    backgroundColor: '#E9ECEF',

  },
  bottomPadding: {
    height: rh(20),
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: responsiveWidth(0.5),
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingVertical: rh(12),
    marginHorizontal: rp(16),
    marginBottom: rh(16),
    borderRadius: rw(12),
  },
  logoutButtonText: {
    fontSize: responsiveFontSize(1.7),
    color: '#fff',
    fontWeight: '600',
  },
})

export default ProfileScreen
