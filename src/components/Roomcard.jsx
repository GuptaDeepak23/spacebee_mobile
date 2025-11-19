import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { rw, rh, rf, rp } from '../utils/responsive';
export const RoomCard = ({ name, status, capacity, location, onBookRoom }) => {
  const isAvailable = status === 'Available';
  return (
    <View style={styles.card}>
      {/* Status Badge - Top Right */}
      <View style={[styles.statusContainer, { backgroundColor: isAvailable ? '#00C896' : '#EF4444' }]}>
        <Text style={[styles.status, { color: isAvailable ? '#fff' : '#fff' }]}>{status}</Text>
      </View>

      {/* Room Info Section */}
      <View style={styles.roomInfo}>
        <Image source={{ uri: 'https://picsum.photos/200/200' }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={rf(14)} color="#666" />
            <Text style={styles.detail}>{location}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="people-outline" size={rf(14)} color="#666" />
            <Text style={styles.detail}>Capacity: {capacity}</Text>
          </View>
        </View>
      </View>

      {/* Book Button */}
      <TouchableOpacity 
        style={[styles.button, { backgroundColor: isAvailable ? '#00C896' : '#E0E0E0' }]}
        disabled={!isAvailable}
        onPress={onBookRoom}
      >
        <Text style={{ color: isAvailable ? '#fff' : '#666', fontWeight: '600', fontSize: rf(14) }}>
          {isAvailable ? 'Book a Room' : 'Not Available'}
        </Text>
      </TouchableOpacity>
    </View>
  );
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
    width: rw(60),
    height: rh(60),
    borderRadius: rw(8),
    marginRight: rw(12),
  },
  info: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  name: {
    fontWeight: '700',
    fontSize: rf(14),
    color: '#1A1A1A',
    marginTop: rh(-1),
    marginBottom: rh(5),
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rh(4),
  },
  detail: {
    color: '#666',
    fontSize: rf(13),
    marginLeft: rw(6),
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: rp(10),
    borderRadius: rw(8),
    width: '100%',
    height: rh(40)
  },
});
