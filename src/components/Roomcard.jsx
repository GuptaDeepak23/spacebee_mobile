import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { rw, rh, rf, rp } from '../utils/responsive';
import {responsiveFontSize,responsiveWidth,responsiveHeight} from 'react-native-responsive-dimensions'
import axios from 'axios'
import base_url from '../base_url'
import { useState , useEffect  } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Bookroom from './Bookroom'


export const RoomCard = ({ onRefreshUpcoming }) => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [selectedRoomId, setSelectedRoomId] = useState(null)

  useEffect(() => {
    getRooms()
  }, [])

  const getRooms = async () => {
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
        setRooms([])
        return
      }
      
      console.log('Fetching rooms...')
      const response = await axios.get(`${base_url}/bookings/rooms/status`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('Rooms API response:', response.data)
      const roomsData = Array.isArray(response.data) ? response.data : []
      console.log('Setting rooms:', roomsData.length, 'rooms found')
      setRooms(roomsData)
    } catch (error) {
      console.error('Error fetching rooms:', error)
      console.error('Error response:', error.response?.data)
      console.error('Error message:', error.message)
      setRooms([])
    } finally {
      console.log('Setting loading to false')
      setLoading(false)
    }
  }

  const handleBookRoom = (room) => {
    setSelectedRoom(room?.name)
    setSelectedRoomId(room?.room_id)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setSelectedRoom(null)
    setSelectedRoomId(null)
  }

  if (loading) {
    return (
      <View style={{ padding: responsiveHeight(2), alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#00C896" />
      </View>
    )
  }

  if (rooms.length === 0) {
    return (
      <View style={{ padding: responsiveHeight(2), alignItems: 'center' }}>
        <Text style={{ color: '#666', fontSize: responsiveFontSize(1.6) }}>
          No rooms available
        </Text>
      </View>
    )
  }

  return (
    <>
      {rooms.map((room, index) => {
        const isAvailable = room?.meeting_status === 'Available'
        const displayStatus = room?.meeting_status 
        
        return (
          <View key={room?.id || index} style={styles.card}>
            {/* Status Badge - Top Right */}
            <View style={[styles.statusContainer, { backgroundColor: isAvailable ? '#00C896' : '#EF4444' }]}>
              <Text style={[styles.status, { color: '#fff' }]}>{displayStatus}</Text>
            </View>

            {/* Room Info Section */}
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

            {/* Book Button */}
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
        )
      })}
      
      {/* Booking Modal */}
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
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: rh(16),
    backgroundColor: '#fff',
    borderRadius: rw(16),
    padding: rp(12),
    borderWidth: 1,
    borderColor: '#E9ECEF',
    elevation: 0,
    position: 'relative',
  },
  statusContainer: {
    position: 'absolute',
    top: rh(16),
    right: rw(-1),
    paddingHorizontal: rp(10),
    paddingVertical: rh(4),
    borderTopLeftRadius: rw(10),
    borderBottomLeftRadius: rw(10),
  },
  status: {
    fontWeight: '600',
    fontSize: rf(11),
  },
  roomInfo: {
    flexDirection: 'row',
    marginTop: rh(1),
    marginBottom: rh(12),
  },
  image: {
    width: responsiveWidth(15),
    height: responsiveHeight(8),
    borderRadius: responsiveWidth(2),
    marginRight: responsiveWidth(3),
  },
  info: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: responsiveHeight(0.4),
  },
  name: {
    fontWeight: '700',
    fontSize: responsiveFontSize(1.7),
    color: '#1A1A1A',
    // marginTop: rh(-1),
    // marginBottom: rh(5),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: rh(4),
  },
  detail: {
    color: '#666',
    fontSize: responsiveFontSize(1.6),
    marginLeft: responsiveWidth(1),
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: responsiveWidth(1),
   
    borderRadius: rw(8),
    width: '100%',
    height: responsiveHeight(4)
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
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rh(20),
  },
  modalBody: {
    paddingBottom: rh(20),
  },
  modalTitle: {
    fontSize: rf(20),
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  closeIconContainer: {
    position: 'absolute',
    right: rw(140),
    top: rh(-90),
    backgroundColor: 'rgba(30, 30, 30, 0.50)',
    borderRadius: rw(30),
    width: rw(40),
    height: rh(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    width: rw(25),
    height: rh(20),
    borderRadius: rw(25),
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    position: 'absolute',
    color: '#FFFFFF',
    right: rw(7),
    bottom: rh(10),
  },
});
