import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const MyBookingScreen = () => {
  const tabs = ['All', 'Upcoming', 'Past', 'Cancelled']
  const [activeTab, setActiveTab] = useState('All')

  const bookings = [
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
      
      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScrollContainer}
        contentContainerStyle={styles.tabsContainer}
      >
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
      </ScrollView>

      {/* Booking Cards */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {bookings.map((booking) => (
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
                <Ionicons name="calendar-outline" size={16} color="#666" />
                <Text style={styles.detailText}>{booking.date}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.detailText}>{booking.time}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="business-outline" size={16} color="#666" />
                <Text style={styles.detailText}>{booking.location}</Text>
              </View>
            </View>

            {/* Host Information */}
            <View style={styles.hostContainer}>
              <View style={styles.hostAvatar}>
                <Text style={styles.hostInitials}>{booking.hostInitials}</Text>
              </View>
              <Text style={styles.hostText}>Hosted by {booking.host}</Text>
            </View>

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
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
   
    padding: 16,
    paddingTop: 45,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  tabsScrollContainer: {
    marginBottom: 20,
  },
  tabsContainer: {
    // flexDirection: 'row',
    paddingRight: 16,
  },
  tabSpacing: {
    marginRight: 8,
  },
  tab: {
    
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeTab: {
    backgroundColor: '#00C896',
    borderColor: '#00C896',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  meetingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    backgroundColor: '#00C896',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  hostContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  hostAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#00C896',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  hostInitials: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  hostText: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  rescheduleButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#00C896',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rescheduleButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
})

export default MyBookingScreen