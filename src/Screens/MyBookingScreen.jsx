import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { rw, rh, rf } from '../utils/responsive';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base_url from '../base_url';
import axios from 'axios';

const MyBookingScreen = () => {
  const tabs = ['All', 'Upcoming', 'Past', 'Cancelled'];
  const [activeTab, setActiveTab] = useState('All');

  const [upcomingbookings, setUpcomingbookings] = useState([]);
  const [pastbookings, setPastbookings] = useState([]);
  const [cancelledbookings, setCancelledbookings] = useState([]);

  useEffect(() => {
    getUpcomingbookings();
    getPastbookings();
    getCancelledbookings();
  }, []);

  // 🔥 FIXED FUNCTION — ALWAYS TAKE response.data.bookings
  const getUpcomingbookings = async () => {
    let token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(
        `${base_url}/bookings/my-bookings?booking_type=upcoming`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const bookings = response.data.bookings;
      setUpcomingbookings(Array.isArray(bookings) ? bookings : []);
    } catch (error) {
      console.log(error);
      setUpcomingbookings([]);
    }
  };

  const getPastbookings = async () => {
    let token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(
        `${base_url}/bookings/my-bookings?booking_type=previous`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const bookings = response.data.bookings;
      setPastbookings(Array.isArray(bookings) ? bookings : []);
    } catch (error) {
      console.log(error);
      setPastbookings([]);
    }
  };

  const getCancelledbookings = async () => {
    let token = await AsyncStorage.getItem('token');
    try {
      const response = await axios.get(
        `${base_url}/bookings/my-bookings?booking_type=cancelled`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const bookings = response.data.bookings;
      setCancelledbookings(Array.isArray(bookings) ? bookings : []);
    } catch (error) {
      console.log(error);
      setCancelledbookings([]);
    }
  };

  // FILTERING FIXED
  const filteredBookings =
    activeTab === 'All'
      ? [...upcomingbookings, ...pastbookings, ...cancelledbookings]
      : activeTab === 'Upcoming'
      ? upcomingbookings
      : activeTab === 'Past'
      ? pastbookings
      : cancelledbookings;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toDateString();
  };

  const formatTime = (start, end) => {
    if (!start || !end) return '';
    return (
      new Date(start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) +
      ' - ' +
      new Date(end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveTab(tab)}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
              index < tabs.length - 1 && styles.tabSpacing,
            ]}
          >
            <Text
              style={[styles.tabText, activeTab === tab && styles.activeTabText]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
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
              {/* Title + Status */}
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
                  <Text style={styles.detailText}>
                    {formatDate(booking.start_time)}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={rf(16)} color="#666" />
                  <Text style={styles.detailText}>
                    {formatTime(booking.start_time, booking.end_time)}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons name="location-outline" size={rf(16)} color="#666" />
                  <Text style={styles.detailText}>
                    {booking.room?.name || 'Unknown Room'}
                  </Text>
                </View>
              </View>

              {/* Buttons */}
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
            <Text style={styles.emptyText}>
              No {activeTab.toLowerCase()} bookings found
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

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
  },
  activeTab: {
    backgroundColor: '#22BF96',
    borderColor: '#00C896',
  },
  tabText: {
    fontSize: responsiveFontSize(1.7),
    color: '#6B7280',
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
    marginBottom: responsiveHeight(1),
  },
  meetingTitle: {
    fontWeight: '700',
    fontSize: responsiveFontSize(2),
    color: '#1A1A1A',
    flex: 1,
  },
  statusBadge: {
    backgroundColor: '#00C896',
    paddingHorizontal: responsiveWidth(3.5),
    paddingVertical: responsiveHeight(0.7),
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
    marginBottom: rh(7),
  },
  detailText: {
    fontSize: rf(14),
    color: '#666',
    marginLeft: rw(8),
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
    marginRight: rw(12),
    alignItems: 'center',
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
    alignItems: 'center',
  },
  rescheduleButtonText: {
    color: '#00C896',
    fontSize: rf(14),
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: rh(40),
  },
  emptyText: {
    fontSize: rf(16),
    color: '#999',
  },
});

export default MyBookingScreen;
