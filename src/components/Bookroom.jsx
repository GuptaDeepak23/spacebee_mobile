import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

const Bookroom = ({ roomName, onClose }) => {
  const [meetingTitle, setMeetingTitle] = useState('')
  const [startDate, setStartDate] = useState('6/6/2025')
  const [startingTime, setStartingTime] = useState('')
  const [participants, setParticipants] = useState('12+')
  const [duration, setDuration] = useState('2 hours')

  const handleBookRoom = () => {
    // Handle booking logic here
    console.log('Booking room:', { roomName, meetingTitle, startDate, startingTime, participants, duration })
    // You can add navigation or API call here
  }

  return (
    <View style={styles.container}>
      {/* Form Fields */}
      <View style={styles.formContainer}>
        {/* Meeting Title */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Meeting Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Meeting Title"
            placeholderTextColor="#999"
            value={meetingTitle}
            onChangeText={setMeetingTitle}
          />
        </View>

        {/* Start Date and Starting Time - Side by Side */}
        <View style={styles.rowContainer}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Start Date</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, styles.inputFlex]}
                value={startDate}
                onChangeText={setStartDate}
              />
              <Ionicons name="calendar-outline" size={20} color="#666" style={styles.inputIcon} />
            </View>
          </View>

          <View style={[styles.inputGroup, styles.halfWidth, styles.leftMargin]}>
            <Text style={styles.label}>Starting Time</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g 10 AM"
              placeholderTextColor="#999"
              value={startingTime}
              onChangeText={setStartingTime}
            />
          </View>
        </View>

        {/* No. Of Participant and Duration - Side by Side */}
        <View style={styles.rowContainer}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>No. Of Participant</Text>
            <TextInput
              style={styles.input}
              value={participants}
              onChangeText={setParticipants}
            />
          </View>

          <View style={[styles.inputGroup, styles.halfWidth, styles.leftMargin]}>
            <Text style={styles.label}>Duration</Text>
            <TextInput
              style={styles.input}
              value={duration}
              onChangeText={setDuration}
            />
          </View>
        </View>
      </View>

      {/* Book Room Button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBookRoom}>
        <Text style={styles.bookButtonText}>Book Room</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: ,
  },
  formContainer: {
    marginBottom: 1,
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1A1A1A',
    backgroundColor: '#fff',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  inputFlex: {
    flex: 1,
    borderWidth: 0,
    paddingRight: 8,
  },
  inputIcon: {
    paddingRight: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    flex: 1,
  },
  leftMargin: {
    marginLeft: 12,
  },
  bookButton: {
    backgroundColor: '#00C896',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:0,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default Bookroom