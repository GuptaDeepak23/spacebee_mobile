import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { rw, rh, rf, rp } from '../utils/responsive'

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
    padding: rp(16),
    paddingTop: rh(45),
    backgroundColor: '#fff',
  },
  title: {
    fontSize: rf(16),
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: rh(20),
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: rh(20),
  },
  tabSpacing: {
    marginRight: rw(8),
  },
  tab: {
    
    paddingHorizontal: rp(14),
    paddingVertical: rh(10),
    borderRadius: rw(20),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: rh(30),
  },
  activeTab: {
    backgroundColor: '#22BF96',
    borderColor: '#00C896',
  },
  tabText: {
    fontSize: rf(14),
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
    paddingBottom: rh(20),
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: rw(16),
    padding: rp(16),
    marginBottom: rh(16),
    borderWidth: 1,
    borderColor: '#E9ECEF',
    
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: rh(5),
  },
  meetingTitle: {
    fontWeight: '700',
    fontSize: rf(14),
    color: '#1A1A1A',
    flex: 1,
    marginRight: rw(12),
    lineHeight: rf(24),
  },
  statusBadge: {
    backgroundColor: '#00C896',
    paddingHorizontal: rp(14),
    paddingVertical: rh(6),
    left: rw(17),
    
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