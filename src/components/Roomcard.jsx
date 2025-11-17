import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.detail}>{location}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="people-outline" size={14} color="#666" />
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
        <Text style={{ color: isAvailable ? '#fff' : '#666', fontWeight: '600', fontSize: 14 }}>
          {isAvailable ? 'Book a Room' : 'Not Available'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    elevation: 0,
    shadowColor: 'transparent',
    position: 'relative',
  },
  statusContainer: {
    position: 'absolute',
    top: 16,
    right: -1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    // zIndex: 1,
  },
  status: {
    fontWeight: '600',
    fontSize: 11,
  },
  roomInfo: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'flex-start',
    
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
    color: '#1A1A1A',
    // marginBottom: 8,
    marginTop: -5,
    marginBottom: 5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detail: {
    color: '#666',
    fontSize: 13,
    marginLeft: 6,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 15,
    width: '100%',
    height:45
  },
});
