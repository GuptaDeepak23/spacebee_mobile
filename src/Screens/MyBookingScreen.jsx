import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { rw, rh, rf } from '../utils/responsive';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import { useMyBookings } from '../Api/use.api';

const MyBookingScreen = () => {
  const tabs = ['All', 'Upcoming', 'Past', 'Cancelled'];
  const [activeTab, setActiveTab] = useState('All');

  const { data: upcomingData, refetch: refetchUpcoming } = useMyBookings('upcoming');
  const { data: pastData, refetch: refetchPast } = useMyBookings('previous');
  const { data: cancelledData, refetch: refetchCancelled } = useMyBookings('cancelled');

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([refetchUpcoming(), refetchPast(), refetchCancelled()]);
    setRefreshing(false);
  };

  const upcomingbookings = upcomingData?.bookings || [];
  const pastbookings = pastData?.bookings || [];
  const cancelledbookings = cancelledData?.bookings || [];

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
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              {/* Title + Status */}
              <View style={styles.cardHeader}>
                <Text style={styles.meetingTitle}>{booking.title}</Text>
                <View style={styles.statusContainer}>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{booking.status}</Text>
                  </View>
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
              {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity style={styles.cancelButton} >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.rescheduleButton}  >
                    <Text style={styles.rescheduleButtonText}>Reschedule</Text>
                  </TouchableOpacity>
                </View>
              )}
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
  statusContainer: {
    position: 'relative',
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    right: -16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#00C896'
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
  cancelButtonDisabled: {
    backgroundColor: '#BDBDBD', // grey when disabled
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
