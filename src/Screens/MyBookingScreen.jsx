import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { rw, rh, rf, rp } from '../utils/responsive'
import {responsiveFontSize,responsiveWidth,responsiveHeight} from 'react-native-responsive-dimensions'

const MyBookingScreen = () => {
  const tabs = ['All', 'Upcoming', 'Past', 'Cancelled']
  const [activeTab, setActiveTab] = useState('All')

  const allBookings = [
    {
      id: 1,
      title: 'Product Roadmap Q1 Review',
      status: 'Upcoming',
      date: 'Thursday, Nov 6, 2025',
      time: '10:00 AM - 11:30 AM',
      location: 'Conference Room A • 3rd Floor',
      host: 'Riya Sharma',
      hostInitials: 'RS',
    },
    // Add more bookings as needed
  ]

  // Filter bookings based on active tab
  const filteredBookings = activeTab === 'All' 
    ? allBookings 
    : allBookings.filter(booking => booking.status === activeTab)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
      
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => {
          return (
            <TouchableOpacity 
              key={index} 
              onPress={() => setActiveTab(tab)} 
              style={[
                styles.tab,
                activeTab === tab && styles.activeTab,
                index < tabs.length - 1 && styles.tabSpacing,
              ]}
            >
              <Text style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}>{tab}</Text>
            </TouchableOpacity>
          )
        })}
      </View>

      {/* Booking Cards */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
          <View key={booking.id} style={styles.bookingCard}>
            {/* Title and Status */}
            <View style={styles.cardHeader}>
              <Text style={styles.meetingTitle}>{booking.title}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{booking.status}</Text>
              </View>
            </View>

            {/* Meeting Details */}
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Ionicons name="calendar-outline" size={rf(16)} color="#666" />
                <Text style={styles.detailText}>{booking.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="time-outline" size={rf(16)} color="#666" />
                <Text style={styles.detailText}>{booking.time}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="location-outline" size={rf(16)} color="#666" />
                <Text style={styles.detailText}>{booking.location}</Text>
              </View>
              <View style={styles.hostContainer}>
              <View style={styles.hostAvatar}>
                <Text style={styles.hostInitials}>{booking.hostInitials}</Text>
              </View>
              <Text style={styles.hostText}>Hosted by {booking.host}</Text>
            </View>
            </View>

            {/* Host Information */}
           

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.rescheduleButton}>
                <Text style={styles.rescheduleButtonText}>Reschedule</Text>
              </TouchableOpacity>
            </View>
          </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No {activeTab.toLowerCase()} bookings found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: responsiveWidth(4),
    paddingTop: responsiveHeight(5),
    backgroundColor: '#fff',
  },
  title: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: responsiveHeight(2),
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: responsiveHeight(2),
  },
  tabSpacing: {
    marginRight: responsiveWidth(2),
  },
  tab: {
    
    paddingHorizontal: responsiveWidth(3.5),
    paddingVertical: responsiveHeight(1),
    borderRadius: responsiveWidth(5),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: responsiveHeight(3),
  },
  activeTab: {
    backgroundColor: '#22BF96',
    borderColor: '#00C896',
  },
  tabText: {
    fontSize: responsiveFontSize(1.7),
    color: '#6B7280',
    fontWeight: '400',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: responsiveHeight(2),
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: responsiveWidth(4),
    padding: responsiveWidth(4),
    marginBottom: responsiveHeight(2),
    borderWidth: 1,
    borderColor: '#E9ECEF',
    
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: responsiveHeight(1),
  },
  meetingTitle: {
    fontWeight: '700',
    fontSize: responsiveFontSize(2),
    color: '#1A1A1A',
    flex: 1,
    marginRight: responsiveWidth(3),
    lineHeight: responsiveHeight(2.5),
  },
  statusBadge: {
    backgroundColor: '#00C896',
    paddingHorizontal: responsiveWidth(3.5),
    paddingVertical: responsiveHeight(0.7),
    left: responsiveWidth(4.2),
    
    alignSelf: 'flex-start',
    borderTopLeftRadius: rw(20),
    borderBottomLeftRadius: rw(20),
  },
  statusText: {
    color: '#fff',
    fontSize: rf(12),
    fontWeight: '600',
  },
  detailsContainer: {
    marginBottom: rh(16),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rh(10),
  },
  detailText: {
    fontSize: rf(14),
    color: '#666',
    marginLeft: rw(8),
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
   
    borderBottomColor: '#E9ECEF',
    borderBottomWidth: 1,
    paddingBottom: rh(12),
   
  },
  hostAvatar: {
    width: rw(32),
    height: rh(32),
    borderRadius: rw(16),
    backgroundColor: '#00C896',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rw(8),
  },
  hostInitials: {
    color: '#fff',
    fontSize: rf(12),
    fontWeight: 'bold',
  },
  hostText: {
    fontSize: rf(14),
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
   
   
  },
  cancelButton: {
    flex: 1,
    paddingVertical: rh(10),
    borderRadius: rw(15),
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: rw(12),
  },
  cancelButtonText: {
    color: '#666',
    fontSize: rf(14),
    fontWeight: '600',
  },
  rescheduleButton: {
    flex: 1,
    paddingVertical: rh(10),
    borderRadius: rw(15),
    borderWidth: 1,
    borderColor: '#22BF96',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rescheduleButtonText: {
    color: '#00C896',
    fontSize: rf(14),
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: rh(40),
    minHeight: rh(200),
  },
  emptyText: {
    fontSize: rf(16),
    color: '#999',
    textAlign: 'center',
  },
})

export default MyBookingScreen