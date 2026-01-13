import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { rw, rh, rf, rp } from '../utils/responsive'
import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions'
import { useCalendarEvents } from '../Api/use.api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CalendarScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date()); // show events for this day
  const yyyy = currentDate.getFullYear();
  const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // always 2-digit month
  const { data: calendarEvents = [], isLoading: loading } = useCalendarEvents(`${yyyy}-${mm}`);

  // Map meeting_date to the calendar for event bubbles
  const eventsMap = {};
  calendarEvents.forEach(event => {
    if (!eventsMap[event.meeting_date]) eventsMap[event.meeting_date] = [];
    eventsMap[event.meeting_date].push(event);
  });

  // Helper: which events are for currently selected day?
  const selectedDayKey = (() => {
    const year = selectedDay.getFullYear();
    const month = String(selectedDay.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDay.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  })();
  const eventsForSelectedDay = eventsMap[selectedDayKey] || [];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = (firstDay.getDay() + 6) % 7 // Convert Sunday (0) to last (6)

    const days = []

    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDay - i,
        isCurrentMonth: false,
        fullDate: new Date(year, month - 1, prevMonthLastDay - i),
      })
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        fullDate: new Date(year, month, i),
      })
    }

    // Add days from next month to fill the grid
    const remainingDays = 42 - days.length // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        fullDate: new Date(year, month + 1, i),
      })
    }

    return days
  }

  const formatDateKey = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const isToday = (date) => {
    // For demo: highlight September 2, 2025 to match the design
    // In production, use: const today = new Date()
    const today = new Date(2025, 8, 2) // September 2, 2025
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const calendarDays = getDaysInMonth(currentDate)
  const currentMonth = monthNames[currentDate.getMonth()]
  const currentYear = currentDate.getFullYear()

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calendar</Text>
      </View>

      {/* Month Navigation */}
      <View style={styles.monthContainer}>
        <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
          <Ionicons name="chevron-back" size={rf(20)} color="#666" />
        </TouchableOpacity>

        <View style={styles.monthTextContainer}>
          <Text style={styles.monthText}>{currentMonth}</Text>
          <Text style={styles.yearText}>{currentYear}</Text>
        </View>

        <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
          <Ionicons name="chevron-forward" size={rf(20)} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Days of Week */}
      <View style={styles.daysOfWeekContainer}>
        {dayNames.map((day, index) => (
          <View key={index} style={styles.dayOfWeek}>
            <Text style={styles.dayOfWeekText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.calendarGrid}>
        {calendarDays.map((day, index) => {
          const dateKey = formatDateKey(day.fullDate);
          // The new eventsMap:
          const dayEvents = eventsMap[dateKey] || [];
          const isCurrentDay = isToday(day.fullDate);
          const isSelected = selectedDay && formatDateKey(day.fullDate) === formatDateKey(selectedDay);
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.calendarDay,
                !day.isCurrentMonth && styles.calendarDayOtherMonth,
              ]}
              onPress={() => setSelectedDay(day.fullDate)}
            >
              <View
                style={[
                  styles.dateContainer,
                  isCurrentDay && styles.dateContainerToday,
                  isSelected && { borderWidth: 2, borderColor: '#22BF96', borderRadius: 16 },
                ]}
              >
                <Text
                  style={[
                    styles.calendarDayText,
                    !day.isCurrentMonth && styles.calendarDayTextOtherMonth,
                    isCurrentDay && styles.calendarDayTextToday,
                  ]}
                >
                  {day.date}
                </Text>
              </View>
              {/* Event indicator dots, if there are events on this day */}
              {dayEvents.length > 0 && (
                <View style={styles.eventIndicators}>
                  {dayEvents.slice(0, 2).map((event, eventIndex) => (
                    <View
                      key={eventIndex}
                      style={[styles.eventDot, { backgroundColor: '#00C896' }]}
                    />
                  ))}
                  {dayEvents.length > 2 && (
                    <View style={[styles.eventDot, { backgroundColor: '#87CEEB' }]} />
                  )}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Upcoming Events Section */}
      <View style={styles.eventsSection}>
        {loading ? (
          <Text>Loading...</Text>
        ) : eventsForSelectedDay.length === 0 ? (
          <Text style={{ color: '#888', textAlign: 'center', padding: 16 }}>
            No meetings today
          </Text>
        ) : (
          eventsForSelectedDay.map((event, idx) => (
            <View key={idx} style={styles.eventCard}>
              <View style={[styles.eventBar, { backgroundColor: '#00C896' }]} />
              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventTime}>{event.start_time}</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: rh(45),
  },
  header: {
    paddingHorizontal: responsiveWidth(4.5),
    paddingBottom: rh(20),
  },
  headerTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  monthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(4.5),
    marginBottom: responsiveHeight(1.2),
  },
  navButton: {
    width: responsiveWidth(9.5),
    height: responsiveHeight(5),
    borderRadius: responsiveWidth(5.9),
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthTextContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: responsiveWidth(4.5),
  },
  monthText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    color: '#1A1A1A',
  },
  yearText: {
    fontSize: responsiveFontSize(1.7),
    color: '#666',
    marginTop: responsiveHeight(0.5),
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(4.5),
    marginBottom: responsiveHeight(1.5),
  },
  dayOfWeek: {
    flex: 1,
    alignItems: 'center',
  },
  dayOfWeekText: {
    fontSize: responsiveFontSize(1.5),
    fontWeight: '600',
    color: '#666',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: responsiveWidth(4.5),
    marginBottom: rh(20),
  },
  calendarDay: {
    width: responsiveWidth(12.9),
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: rh(8),
    minHeight: rh(50),
  },
  calendarDayOtherMonth: {
    opacity: 0.3,
  },
  dateContainer: {
    width: responsiveWidth(9),
    height: responsiveHeight(4),
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: rh(4),
  },
  dateContainerToday: {
    backgroundColor: '#00C896',
    borderRadius: responsiveWidth(4.5),
  },
  calendarDayText: {
    fontSize: responsiveFontSize(1.7),
    color: '#1A1A1A',
    fontWeight: '500',
  },
  calendarDayTextOtherMonth: {
    color: '#999',
  },
  calendarDayTextToday: {
    color: '#fff',
    fontWeight: 'bold',
  },
  eventIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(0.2),
    flexWrap: 'wrap',
    gap: responsiveWidth(0.7),
    maxWidth: responsiveWidth(10.5),
  },
  eventDot: {
    width: rw(6),
    height: rh(6),
    borderRadius: rw(3),
  },
  eventsSection: {
    paddingHorizontal: responsiveWidth(4),
    paddingBottom: responsiveHeight(5),
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: responsiveWidth(3),
    marginBottom: responsiveHeight(1),
    borderWidth: 1,
    borderColor: '#E9ECEF',
    overflow: 'hidden',
    alignItems: 'center',
  },
  eventBar: {
    width: responsiveWidth(1),
    height: '100%',
  },
  eventContent: {
    flex: 1,
    padding: responsiveWidth(4),
  },
  eventTitle: {
    fontSize: responsiveFontSize(1.7),
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: responsiveHeight(0.3),
  },
  eventTime: {
    fontSize: responsiveFontSize(1.7),
    color: '#666',
  },
  viewButton: {
    paddingHorizontal: responsiveWidth(5),
    paddingVertical: responsiveHeight(1),
    marginRight: responsiveWidth(4),
    borderWidth: 1,
    borderColor: '#E9ECEF',
    borderRadius: responsiveWidth(3),
  },
  viewButtonText: {
    fontSize: responsiveFontSize(1.7),
    color: '#666',
    fontWeight: '500',
  },
})

export default CalendarScreen
