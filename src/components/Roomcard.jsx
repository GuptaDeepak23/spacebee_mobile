import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

import Bookroom from './Bookroom';

export const RoomCard = ({ onRefreshUpcoming, rooms = [], roomsLoading, roomsError }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedRoomId, setSelectedRoomId] = useState(null); // Keep formatting


  const handleBookRoom = (room) => {
    setSelectedRoom(room?.name);
    setSelectedRoomId(room?.room_id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRoom(null);
    setSelectedRoomId(null);
  };

  if (roomsLoading) {
    return (
      <View style={{ padding: responsiveHeight(2), alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00C896" />
      </View>
    );
  }

  if (!rooms || rooms.length === 0) {
    return (
      <View style={{ padding: responsiveHeight(2), alignItems: 'center' }}>
        <Text style={{ color: '#666', fontSize: responsiveFontSize(1.6) }}>
          No rooms available
        </Text>
      </View>
    );
  }

  return (
    <>
      {rooms.map((room, index) => {
        const isAvailable = room?.meeting_status === 'Available';
        const displayStatus = room?.meeting_status;

        return (
          <View key={room?.id || index} style={styles.card}>

            <View style={[styles.statusContainer, { backgroundColor: isAvailable ? '#00C896' : '#EF4444' }]}>
              <Text style={styles.status}>{displayStatus}</Text>
            </View>

            <View style={styles.roomInfo}>
              <Image source={{ uri: 'https://picsum.photos/200/200' }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.name}>{room?.name}</Text>

                <View style={styles.detailRow}>
                  <Ionicons name="location-outline" size={responsiveFontSize(1.7)} color="#666" />
                  <Text style={styles.detail}>{room?.floor || 'N/A'}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons name="people-outline" size={responsiveFontSize(1.7)} color="#666" />
                  <Text style={styles.detail}>Capacity: {room?.capacity || 'N/A'}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: isAvailable ? '#00C896' : '#E0E0E0' }]}
              disabled={!isAvailable}
              onPress={() => handleBookRoom(room)}
            >
              <Text style={{ color: isAvailable ? '#fff' : '#666', fontWeight: '600', fontSize: responsiveFontSize(1.5) }}>
                {isAvailable ? 'Book a Room' : 'Not Available'}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.handleBar} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book a {selectedRoom}</Text>

              <TouchableOpacity onPress={closeModal}>
                <View style={styles.closeIconContainer}>
                  <Image source={require('../../assets/elements.png')} style={styles.closeIcon} />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Bookroom roomId={selectedRoomId} onClose={closeModal} onBookingSuccess={onRefreshUpcoming} />
            </View>

          </View>
        </View>
      </Modal>
    </>
  );
};


// ---------------- STYLES ----------------

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',

  },
  statusContainer: {
    position: 'absolute',
    top: 16,
    right: -1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  status: { fontWeight: '600', color: '#fff' },
  roomInfo: { flexDirection: 'row', marginTop: 1, marginBottom: 12 },
  image: {
    width: responsiveWidth(15),
    height: responsiveHeight(8),
    borderRadius: responsiveWidth(2),
    marginRight: responsiveWidth(3),
  },
  info: { flex: 1, justifyContent: 'flex-start' },
  name: { fontWeight: '700', fontSize: responsiveFontSize(1.7), color: '#1A1A1A' },
  detailRow: { flexDirection: 'row', alignItems: 'center' },
  detail: { color: '#666', fontSize: responsiveFontSize(1.6), marginLeft: responsiveWidth(1) },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsiveWidth(1),
    borderRadius: 8,
    width: '100%',
    height: responsiveHeight(4)
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    minHeight: 350,
    width: '100%',
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  handleBar: {
    height: 4,
    width: 40,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 12,
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  modalBody: { paddingBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A' },
  closeIconContainer: {
    backgroundColor: 'rgba(30, 30, 30, 0.50)',
    borderRadius: 30,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: { width: 25, height: 20, resizeMode: 'contain' },
});
