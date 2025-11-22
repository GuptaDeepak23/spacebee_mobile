import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { rw, rh, rf, rp, getScreenWidth } from '../utils/responsive';
import {useState, useEffect} from 'react'
import axios from 'axios'
import base_url from '../base_url'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Bookroom from './Bookroom';

export const UpcomingMeetingCard = ({ refreshTrigger }) => {
  const [upcomingMeetings, setUpcomingMeetings] = useState([])
  const [loading, setLoading] = useState(true)
  const [rescheduleModalVisible, setRescheduleModalVisible] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  useEffect(() => {
    getUpcomingMeetings()
  }, [])
  useEffect(() => {
    if (refreshTrigger !== undefined) {
      getUpcomingMeetings();
    }
  }, [refreshTrigger])

  const getUpcomingMeetings = async () => {
    try {
      setLoading(true)
      let token = await AsyncStorage.getItem('token')
      
      // Fallback: try to get token from userData if not found
      if (!token) {
        const userDataStr = await AsyncStorage.getItem('userData')
        if (userDataStr) {
          const userData = JSON.parse(userDataStr)
          token = userData?.access_token
        }
      }
      
      if (!token) {
        console.error('No token found')
        setUpcomingMeetings([])
        return
      }
      
      console.log('Fetching upcoming meetings...')
      const response = await axios.get(`${base_url}/bookings/my-bookings?booking_type=upcoming`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log('Upcoming meetings API response:', response.data)
      // API returns { bookings: [...] }
      const bookings = response.data?.bookings || response.data || []
      const meetingsArray = Array.isArray(bookings) ? bookings : []
      console.log('Setting upcoming meetings:', meetingsArray.length, 'meetings found')
      setUpcomingMeetings(meetingsArray)
    } catch (error) {
      console.error('Error fetching upcoming meetings:', error)
      console.error('Error response:', error.response?.data)
      console.error('Error message:', error.message)
      setUpcomingMeetings([])
    } finally {
      console.log('Setting loading to false for upcoming meetings')
      setLoading(false)
    }
  }

  const cancelBooking = async (bookingId) => {
    try {
      const token = await AsyncStorage.getItem('token')
      const response = await axios.delete(`${base_url}/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      console.log('Booking cancelled successfully:', response.data)
      
      // Refresh the meetings list after successful cancellation
      await getUpcomingMeetings()
    } catch (error) {
      console.error('Error canceling booking:', error)
      console.error('Error response:', error.response?.data)
      // You can add an alert or toast notification here
    }
  }

  const handleReschedulePress = (meeting) => {
    setSelectedMeeting(meeting);
    setRescheduleModalVisible(true);
  };

  const closeRescheduleModal = () => {
    setRescheduleModalVisible(false);
    setSelectedMeeting(null);
  };

  // Format date from ISO string
  const formatDate = (isoString) => {
    if (!isoString) return ''
    const date = new Date(isoString)
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  // Format time from ISO string
  const formatTime = (isoString) => {
    if (!isoString) return ''
    const date = new Date(isoString)
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12
    const minutesStr = minutes < 10 ? '0' + minutes : minutes
    return `${hours}:${minutesStr} ${ampm}`
  }

  // Format time range
  const formatTimeRange = (startTime, endTime) => {
    const start = formatTime(startTime)
    const end = formatTime(endTime)
    return `${start} - ${end}`
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#00C896" />
      </View>
    )
  }

  if (upcomingMeetings.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No upcoming meetings</Text>
      </View>
    )
  }

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {upcomingMeetings.map((meeting, index) => (
        <View key={meeting?.id || index} style={styles.card}>
          <Text style={styles.title}>{meeting?.title || 'Untitled Meeting'}</Text>
          <View style={styles.row}>
            <Feather name="calendar" size={rf(14)} color="#666" />
            <Text style={styles.text}>{formatDate(meeting?.start_time)}</Text>
          </View>
          <View style={styles.row}>
            <Feather name="clock" size={rf(14)} color="#666" />
            <Text style={styles.text}>
              {formatTimeRange(meeting?.start_time, meeting?.end_time)}
            </Text>
          </View>
          <View style={styles.row}>
            <Feather name="map-pin" size={rf(14)} color="#666" />
            <Text style={styles.text}>
              {meeting?.room?.name || 'Room N/A'} • Floor {meeting?.room?.floor || 'N/A'}
            </Text>
          </View>
          {/* {meeting?.employee?.name && (
            <View style={styles.row}>
              <Feather name="user" size={rf(14)} color="#666" />
              <Text style={styles.text}>{meeting.employee.name}</Text>
            </View>
          )} */}
          <View style={styles.row}>
            <Feather name="users" size={rf(14)} color="#666" />
            <Text style={styles.text}>{meeting?.participants || 0} participants</Text>
          </View>
          <View style={styles.line}></View>
          <View style={styles.actions}>
            <TouchableOpacity 
              style={styles.cancel} 
              onPress={() => cancelBooking(meeting?.id)}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.reschedule}
              onPress={() => handleReschedulePress(meeting)}
            >
              <Text style={styles.rescheduleText}>Reschedule</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      {/* Show Bookroom modal for rescheduling */}
      <Modal
        visible={rescheduleModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeRescheduleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.handleBar} />
            <Bookroom
              roomId={selectedMeeting?.room_id || selectedMeeting?.room?.id}
              initialMeeting={selectedMeeting}
              onClose={closeRescheduleModal}
              onBookingSuccess={getUpcomingMeetings}
              isReschedule={true}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingRight: rw(16),
  },
  loadingContainer: {
    padding: rp(20),
    alignItems: 'center',
  },
  emptyContainer: {
    padding: rp(20),
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontSize: rf(14),
  },
  card: {
    backgroundColor: '#fff',
    padding: rp(16),
    borderRadius: rw(16),
    marginRight: rw(12),
    width: rw(280),
    maxWidth: getScreenWidth() * 0.85,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    elevation: 0,
  },
  title: {
    fontWeight: '600',
    fontSize: rf(14.5),
    color: '#1A1A1A',
    marginBottom: rh(10),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rh(8),
  },
  text: {
    color: '#666',
    fontSize: rf(14),
    marginLeft: rw(6),
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    marginTop: rh(12),
  },
  cancel: {
    borderColor: '#E9ECEF',
    borderWidth: 1.5,
    borderRadius: rw(10),
    padding: rp(10),
    flex: 1,
    alignItems: 'center',
    marginRight: rw(6),
  },
  cancelText: {
    color: '#666',
    fontWeight: '600',
    fontSize: rf(12),
  },
  reschedule: {
    borderColor: '#00C896',
    borderWidth: 1.5,
    borderRadius: rw(10),
    padding: rp(10),
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F0FDF9',
    marginLeft: rw(6),
  },
  rescheduleText: {
    color: '#00C896',
    fontWeight: '600',
    fontSize: rf(12),
  },
  line: {
    height: 1,
    backgroundColor: '#E9ECEF',
    marginVertical: rh(10),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    minHeight: 350,
    width: '100%',
    alignSelf: 'center',
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
    elevation: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  handleBar: {
    height: 4,
    width: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
});
