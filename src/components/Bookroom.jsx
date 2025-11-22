import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Calendar } from 'react-native-calendars'
import DateTimePicker from '@react-native-community/datetimepicker'
import { rw, rh, rf, rp } from '../utils/responsive'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import base_url from '../base_url'

const Bookroom = ({ roomId, initialMeeting, onClose, onBookingSuccess, isReschedule }) => {
  // Use state with initial values from initialMeeting if available
  const [meetingTitle, setMeetingTitle] = useState(initialMeeting?.title || '');
  const [startDate, setStartDate] = useState(initialMeeting?.start_time ? new Date(initialMeeting.start_time) : new Date());
  const [endDate, setEndDate] = useState(initialMeeting?.end_time ? new Date(initialMeeting.end_time) : new Date());
  const [startingTime, setStartingTime] = useState(initialMeeting?.start_time ? new Date(initialMeeting.start_time) : new Date());
  const [endTime, setEndTime] = useState(initialMeeting?.end_time ? new Date(initialMeeting.end_time) : new Date());
  const [participants, setParticipants] = useState(initialMeeting?.participants ? initialMeeting.participants.toString() : '5');
  
  // Picker visibility states
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)
  const [showStartTimePicker, setShowStartTimePicker] = useState(false)
  const [showEndTimePicker, setShowEndTimePicker] = useState(false)
  
  // Temporary picker values
  const [tempDate, setTempDate] = useState(new Date())
  const [tempTime, setTempTime] = useState(new Date())
  const [pickerType, setPickerType] = useState(null) // 'startDate', 'endDate', 'startTime', 'endTime'

  // Format date to string for display
  const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    const month = d.getMonth() + 1
    const day = d.getDate()
    const year = d.getFullYear()
    return `${month}/${day}/${year}`
  }

  // Format date to YYYY-MM-DD for calendar
  const formatDateForCalendar = (date) => {
    if (!date) return ''
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  // Parse date from YYYY-MM-DD string
  const parseDateFromCalendar = (dateString) => {
    if (!dateString) return new Date()
    return new Date(dateString)
  }

  // Format time to string
  const formatTime = (date) => {
    if (!date) return ''
    const d = new Date(date)
    let hours = d.getHours()
    const minutes = d.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12
    hours = hours ? hours : 12
    const minutesStr = minutes < 10 ? '0' + minutes : minutes
    return `${hours}:${minutesStr} ${ampm}`
  }

  const openDatePicker = (type) => {
    setPickerType(type)
    if (type === 'startDate') {
      setTempDate(startDate)
      setShowStartDatePicker(true)
    } else if (type === 'endDate') {
      setTempDate(endDate)
      setShowEndDatePicker(true)
    }
  }

  const onDayPress = (day) => {
    const selectedDate = parseDateFromCalendar(day.dateString)
    setTempDate(selectedDate)
  }

  const openTimePicker = (type) => {
    setPickerType(type)
    if (type === 'startTime') {
      setTempTime(startingTime)
      setShowStartTimePicker(true)
    } else if (type === 'endTime') {
      setTempTime(endTime)
      setShowEndTimePicker(true)
    }
  }

  const confirmDateSelection = () => {
    if (pickerType === 'startDate') {
      setStartDate(new Date(tempDate))
      setShowStartDatePicker(false)
    } else if (pickerType === 'endDate') {
      setEndDate(new Date(tempDate))
      setShowEndDatePicker(false)
    }
    setPickerType(null)
  }

  const confirmTimeSelection = () => {
    if (pickerType === 'startTime') {
      setStartingTime(new Date(tempTime))
      setShowStartTimePicker(false)
    } else if (pickerType === 'endTime') {
      setEndTime(new Date(tempTime))
      setShowEndTimePicker(false)
    }
    setPickerType(null)
  }
  
  // For iOS, handle the confirm button separately
  const handleTimeConfirm = () => {
    confirmTimeSelection()
  }


  // Handle time change from DateTimePicker
  const handleTimeChange = (event, selectedTime) => {
    if (Platform.OS === 'android') {
      if (event.type === 'set' && selectedTime) {
        // For Android, directly set the time and close picker
        if (pickerType === 'startTime') {
          setStartingTime(selectedTime)
          setShowStartTimePicker(false)
        } else if (pickerType === 'endTime') {
          setEndTime(selectedTime)
          setShowEndTimePicker(false)
        }
        setPickerType(null)
      } else if (event.type === 'dismissed') {
        setShowStartTimePicker(false)
        setShowEndTimePicker(false)
        setPickerType(null)
      }
    } else {
      // For iOS, update tempTime as user scrolls
      if (selectedTime) {
        setTempTime(selectedTime)
      }
    }
  }

  // Format date and time to ISO format (YYYY-MM-DDTHH:mm:ssZ)
  const formatDateTimeISO = (date, time) => {
    const dateObj = new Date(date)
    const timeObj = new Date(time)
    
    // Get date components
    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const day = String(dateObj.getDate()).padStart(2, '0')
    
    // Get time components
    const hours = String(timeObj.getHours()).padStart(2, '0')
    const minutes = String(timeObj.getMinutes()).padStart(2, '0')
    const seconds = String(timeObj.getSeconds()).padStart(2, '0')
    
    // Create ISO format string: YYYY-MM-DDTHH:mm:ssZ
    // Using 'Z' to indicate UTC (or you can use local timezone offset)
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`
  }

  const handleBookRoom = async () => {
    try {
      // Validate required fields
      if (!roomId) {
        console.error('Room ID is missing')
        return
      }
      if (!meetingTitle.trim()) {
        console.error('Meeting title is required')
        return
      }
      if (!participants || isNaN(parseInt(participants))) {
        console.error('Valid number of participants is required')
        return
      }

      // Format dates and times to ISO format
      const start_time = formatDateTimeISO(startDate, startingTime)
      const end_time = formatDateTimeISO(endDate, endTime)

      // Prepare booking data according to API format
      const bookingData = {
        room_id: roomId,
        start_time: start_time,
        end_time: end_time,
        title: meetingTitle,
        participants: parseInt(participants)
      }

      // Log the payload being sent
      console.log('Booking Payload:', JSON.stringify(bookingData, null, 2))

      const token = await AsyncStorage.getItem('token')
      
      let response;
      if (isReschedule && initialMeeting?.id) {
        // PUT for reschedule
        response = await axios.put(
          `${base_url}/bookings/android/${initialMeeting.id}`,
          bookingData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        // POST for new booking
        response = await axios.post(
          `${base_url}/bookings/android`,
          bookingData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
      }
      console.log('Booking API response:', response.data);
      if (onBookingSuccess) {
        await onBookingSuccess();
      }
      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error booking room:', error)
      console.error('Error response:', error.response?.data)
      // You can add error handling/alert here
    }
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

        {/* Start Date and End Date - Side by Side */}
        <View style={styles.rowContainer}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Start Date</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, styles.inputFlex]}
                value={formatDate(startDate)}
                editable={false}
                placeholder="Select start date"
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={() => openDatePicker('startDate')}>
                <Ionicons name="calendar-outline" size={rf(20)} color="#666" style={styles.inputIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.inputGroup, styles.halfWidth, styles.leftMargin]}>
            <Text style={styles.label}>End Date</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, styles.inputFlex]}
                value={formatDate(endDate)}
                editable={false}
                placeholder="Select end date"
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={() => openDatePicker('endDate')}>
                <Ionicons name="calendar-outline" size={rf(20)} color="#666" style={styles.inputIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Starting Time and End Time - Side by Side */}
        <View style={styles.rowContainer}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>Starting Time</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, styles.inputFlex]}
                value={formatTime(startingTime)}
                editable={false}
                placeholder="Select start time"
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={() => openTimePicker('startTime')}>
                <Ionicons name="time-outline" size={rf(20)} color="#666" style={styles.inputIcon} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.inputGroup, styles.halfWidth, styles.leftMargin]}>
            <Text style={styles.label}>End Time</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, styles.inputFlex]}
                value={formatTime(endTime)}
                editable={false}
                placeholder="Select end time"
                placeholderTextColor="#999"
              />
              <TouchableOpacity onPress={() => openTimePicker('endTime')}>
                <Ionicons name="time-outline" size={rf(20)} color="#666" style={styles.inputIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* No. Of Participant */}
        <View style={styles.rowContainer}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.label}>No. Of Participant</Text>
            <TextInput
              style={styles.input}
              value={participants}
              onChangeText={setParticipants}
              keyboardType="numeric"
              placeholder="Enter number of participants"
              placeholderTextColor="#999"
            />
          </View>
        </View>
      </View>

      {/* Book Room Button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBookRoom}>
        <Text style={styles.bookButtonText}>Book Room</Text>
      </TouchableOpacity>

      {/* Date Picker Modal */}
      <Modal
        visible={showStartDatePicker || showEndDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setShowStartDatePicker(false)
          setShowEndDatePicker(false)
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickerModal}>
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerTitle}>
                {pickerType === 'startDate' ? 'Select Start Date' : 'Select End Date'}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setShowStartDatePicker(false)
                  setShowEndDatePicker(false)
                }}
              >
                <Ionicons name="close" size={rf(24)} color="#666" />
              </TouchableOpacity>
            </View>
            <View style={styles.calendarContainer}>
              <Calendar
                onDayPress={onDayPress}
                markedDates={{
                  [formatDateForCalendar(tempDate)]: {
                    selected: true,
                    selectedColor: '#00C896',
                    selectedTextColor: '#fff'
                  }
                }}
                minDate={formatDateForCalendar(new Date())}
                theme={{
                  backgroundColor: '#ffffff',
                  calendarBackground: '#ffffff',
                  textSectionTitleColor: '#666',
                  selectedDayBackgroundColor: '#00C896',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#00C896',
                  dayTextColor: '#1A1A1A',
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#00C896',
                  selectedDotColor: '#ffffff',
                  arrowColor: '#00C896',
                  monthTextColor: '#1A1A1A',
                  textDayFontWeight: '400',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '600',
                  textDayFontSize: rf(14),
                  textMonthFontSize: rf(16),
                  textDayHeaderFontSize: rf(12)
                }}
                style={styles.calendar}
              />
            </View>
            <View style={styles.pickerFooter}>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={confirmDateSelection}
              >
                <Text style={styles.pickerButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Time Picker Modal */}
      {(showStartTimePicker || showEndTimePicker) && (
        Platform.OS === 'ios' ? (
          <Modal
            visible={showStartTimePicker || showEndTimePicker}
            transparent={true}
            animationType="slide"
            onRequestClose={() => {
              setShowStartTimePicker(false)
              setShowEndTimePicker(false)
            }}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.pickerModal}>
                <View style={styles.pickerHeader}>
                  <Text style={styles.pickerTitle}>
                    {pickerType === 'startTime' ? 'Select Start Time' : 'Select End Time'}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowStartTimePicker(false)
                      setShowEndTimePicker(false)
                    }}
                  >
                    <Ionicons name="close" size={rf(24)} color="#666" />
                  </TouchableOpacity>
                </View>
                <View style={styles.timePickerContainer}>
                  <DateTimePicker
                    value={tempTime}
                    mode="time"
                    is24Hour={false}
                    display="spinner"
                    onChange={handleTimeChange}
                    style={styles.timePicker}
                  />
                </View>
                <View style={styles.pickerFooter}>
                  <TouchableOpacity
                    style={styles.pickerButton}
                    onPress={handleTimeConfirm}
                  >
                    <Text style={styles.pickerButtonText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        ) : (
          <DateTimePicker
            value={tempTime}
            mode="time"
            is24Hour={false}
            display="clock"
            onChange={handleTimeChange}
          />
        )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: ,
  },
  formContainer: {
    marginBottom: rh(1),
  },
  inputGroup: {
    marginBottom: rh(10),
    
  },
  label: {
    fontSize: rf(14),
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: rh(8),
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: rw(8),
    paddingHorizontal: rp(16),
    paddingVertical: rh(12),
    fontSize: rf(14),
    color: '#1A1A1A',
    backgroundColor: '#fff',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: rw(8),
    backgroundColor: '#fff',
  },
  inputFlex: {
    flex: 1,
    borderWidth: 0,
    paddingRight: rp(8),
  },
  inputIcon: {
    paddingRight: rp(16),
    paddingLeft: rp(8),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    flex: 1,
  },
  leftMargin: {
    marginLeft: rw(12),
  },
  bookButton: {
    backgroundColor: '#00C896',
    borderRadius: rw(12),
    paddingVertical: rh(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: rf(16),
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  pickerModal: {
    backgroundColor: '#fff',
    borderTopLeftRadius: rw(20),
    borderTopRightRadius: rw(20),
    maxHeight: '80%',
    paddingTop: rh(20),
  },
  pickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: rp(20),
    paddingBottom: rh(16),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  pickerTitle: {
    fontSize: rf(18),
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  calendarContainer: {
    paddingHorizontal: rp(10),
    paddingVertical: rh(10),
  },
  calendar: {
    borderRadius: rw(10),
    elevation: 0,
    margin: 0,
  },
  timePickerContainer: {
    paddingHorizontal: rp(20),
    paddingVertical: rh(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  timePicker: {
    width: '100%',
    height: rh(200),
  },
  pickerFooter: {
    paddingHorizontal: rp(20),
    paddingVertical: rh(16),
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  pickerButton: {
    backgroundColor: '#00C896',
    borderRadius: rw(8),
    paddingVertical: rh(12),
    alignItems: 'center',
  },
  pickerButtonText: {
    color: '#fff',
    fontSize: rf(16),
    fontWeight: 'bold',
  },
})

export default Bookroom