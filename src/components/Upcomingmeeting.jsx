import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Image, ScrollView, ActivityIndicator, Modal
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { rw, rh, rf, rp, getScreenWidth } from '../utils/responsive';
import axios from 'axios';
import base_url from '../base_url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Bookroom from './Bookroom';
import { useQuery } from '@tanstack/react-query';

export const UpcomingMeetingCard = () => {

  const [rescheduleModalVisible, setRescheduleModalVisible] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  // 🔥 FINAL React Query version (no refreshTrigger, no useEffect)
  const getUpcomingMeetings = async () => {
    let token = await AsyncStorage.getItem('token');

    if (!token) {
      const userDataStr = await AsyncStorage.getItem('userData');
      if (userDataStr) {
        token = JSON.parse(userDataStr)?.access_token;
      }
    }

    if (!token) return [];

    const response = await axios.get(
      `${base_url}/bookings/my-bookings?booking_type=upcoming`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const bookings = response.data?.bookings || response.data || [];
    
    return Array.isArray(bookings) ? bookings : [];
  };

  const {
    data: upcomingMeetings,
    isLoading: upcomingMeetingsLoading,
    isError: upcomingMeetingsError,
    refetch: refetchUpcomingMeetings
  } = useQuery({
    queryKey: ["upcoming-meetings"],
    queryFn: getUpcomingMeetings,
    refetchInterval: 60000,    
    placeholderData: prev => prev,
    keepPreviousData: true,    
  });

  // 🔥 Cancel Booking + Refresh
  const cancelBooking = async (bookingId) => {
    try {
      const token = await AsyncStorage.getItem('token');

      await axios.delete(`${base_url}/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Refresh UI
      refetchUpcomingMeetings();

    } catch (error) {
      console.error("Cancel error:", error);
    }
  };

  // Modal Handlers
  const handleReschedulePress = (meeting) => {
    setSelectedMeeting(meeting);
    setRescheduleModalVisible(true);
  };

  const closeRescheduleModal = () => {
    setRescheduleModalVisible(false);
    setSelectedMeeting(null);
  };

  // Format Date & Time
  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toDateString();
  };
  const formatTime = (iso) => {
    const d = new Date(iso);
    let h = d.getHours();
    let m = d.getMinutes().toString().padStart(2, "0");
    let ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  };
  const formatTimeRange = (s, e) => `${formatTime(s)} - ${formatTime(e)}`;

  // UI conditions
  if (upcomingMeetingsLoading) {
    return <ActivityIndicator size="small" color="#00C896" />;
  }

  if (!upcomingMeetings || upcomingMeetings.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No upcoming meetings</Text>
      </View>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      {upcomingMeetings.map((meeting, index) => (
        <View key={meeting?.id || index} style={styles.card}>
          <Text style={styles.title}>{meeting?.title || "Untitled Meeting"}</Text>

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
              {meeting?.room?.name} • Floor {meeting?.room?.floor}
            </Text>
          </View>

          <View style={styles.row}>
            <Feather name="users" size={rf(14)} color="#666" />
            <Text style={styles.text}>{meeting?.participants || 0} participants</Text>
          </View>

          <View style={styles.line}></View>

          {/* Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => cancelBooking(meeting.id)}
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

      {/* Reschedule Modal */}
      <Modal visible={rescheduleModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Bookroom
              roomId={selectedMeeting?.room?.id}
              initialMeeting={selectedMeeting}
              onClose={closeRescheduleModal}
              onBookingSuccess={refetchUpcomingMeetings}
              isReschedule={true}
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  emptyContainer: { padding: 20, alignItems: "center" },
  emptyText: { color: "#666" },
  scrollContent: { paddingRight: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    width: 280,
    maxWidth: getScreenWidth() * 0.85,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  title: { fontWeight: "600", fontSize: 15, marginBottom: 10 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  text: { marginLeft: 6, color: "#666", flex: 1 },
  line: { height: 1, backgroundColor: "#E9ECEF", marginVertical: 10 },
  actions: { flexDirection: "row" },
  cancel: {
    borderColor: "#E9ECEF",
    borderWidth: 1.5,
    padding: 10,
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
    marginRight: 6,
  },
  cancelText: { color: "#666", fontWeight: "600" },
  reschedule: {
    borderColor: "#00C896",
    borderWidth: 1.5,
    padding: 10,
    flex: 1,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#F0FDF9",
  },
  rescheduleText: { color: "#00C896", fontWeight: "600" },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 24,
  },
});
