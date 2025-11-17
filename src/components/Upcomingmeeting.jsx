import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { Feather } from '@expo/vector-icons';


export const UpcomingMeetingCard = ({ title, date, time ,room,host}) => {
  return (
    <View style={styles.container}>
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <Feather name="calendar" size={14} color="#666" />
        <Text style={{ color: '#666', fontSize: 14, marginLeft: 6 }}>{date}</Text>
      </View>
      <View style={styles.row}>
        <Feather name="clock" size={14} color="#666" />
        <Text style={{ color: '#666', fontSize: 14, marginLeft: 6 }}>{time}</Text>
      </View>
      <View style={styles.row}>
<Feather name="map-pin" size={14} color="#666" />
<Text style={{ color: '#666', fontSize: 14, marginLeft: 6 }}>{room}</Text>
      </View>
      <View style={styles.row}>
        <Image 
          source={{ uri: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' }} 
          style={styles.hostAvatar}
        />
        <Text style={{ color: '#666', fontSize: 14, marginLeft: 6 }}>{host}</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.cancel}>
          <Text style={{ color: '#666', fontWeight: '600', fontSize: 12 }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reschedule}>
          <Text style={{ color: '#00C896', fontWeight: '600', fontSize: 12 }}>Reschedule</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
    card: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 16,
        marginRight: 12,
        width: 260,
     
        borderWidth: 1,
        borderColor: '#E9ECEF',
        elevation: 0,
        shadowColor: 'transparent',
      },
      
  hostAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
  },
  title: {
    fontWeight: '600',
    fontSize: 14.5,
    color: '#1A1A1A',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
 
    marginTop: 12,
  },
  cancel: {
    borderColor: '#E9ECEF',
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
   flex: 1,
    alignItems: 'center',
    // backgroundColor: '#FAFAFA',
    marginRight: 6,
  },
  reschedule: {
    borderColor: '#00C896',
    borderWidth: 1.5,
    borderRadius: 10,
    padding: 10,
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F0FDF9',
    marginLeft: 6,
  },
  line: {
    height: 1,                 // thickness
    backgroundColor: '#E9ECEF',   // color
    marginVertical: 10,        // spacing (optional)
  },
});
