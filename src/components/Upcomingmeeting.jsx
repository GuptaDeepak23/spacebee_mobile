import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { rw, rh, rf, rp, getScreenWidth } from '../utils/responsive';


export const UpcomingMeetingCard = ({ title, date, time ,room,host}) => {
  return (
    <View style={styles.container}>
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <Feather name="calendar" size={rf(14)} color="#666" />
        <Text style={{ color: '#666', fontSize: rf(14), marginLeft: rw(6) }}>{date}</Text>
      </View>
      <View style={styles.row}>
        <Feather name="clock" size={rf(14)} color="#666" />
        <Text style={{ color: '#666', fontSize: rf(14), marginLeft: rw(6) }}>{time}</Text>
      </View>
      <View style={styles.row}>
        <Feather name="map-pin" size={rf(14)} color="#666" />
        <Text style={{ color: '#666', fontSize: rf(14), marginLeft: rw(6) }}>{room}</Text>
      </View>
      <View style={styles.row}>
        <Image 
          source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' }} 
          style={styles.hostAvatar}
        />
        <Text style={{ color: '#666', fontSize: rf(14), marginLeft: rw(6) }}>{host}</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancel}>
          <Text style={{ color: '#666', fontWeight: '600', fontSize: rf(12) }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reschedule}>
          <Text style={{ color: '#00C896', fontWeight: '600', fontSize: rf(12) }}>Reschedule</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: rp(16),
    borderRadius: rw(16),
    marginRight: rw(12),
    width: rw(260),
    maxWidth: getScreenWidth() * 0.85,
    borderWidth: 1,
    borderColor: '#E9ECEF',
    elevation: 0,
    shadowColor: 'transparent',
  },
  hostAvatar: {
    width: rw(24),
    height: rh(24),
    borderRadius: rw(12),
    marginRight: rw(6),
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
  line: {
    height: 1,
    backgroundColor: '#E9ECEF',
    marginVertical: rh(10),
  },
});
