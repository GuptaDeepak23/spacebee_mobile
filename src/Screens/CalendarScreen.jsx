import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { rw, rh, rf, rp } from '../utils/responsive'

const CalendarScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 8, 2)) // September 2025, day 2

  // Sample events data - in real app, this would come from API/state
  const events = {
    '2025-09-02': [{ color: '#00C896', type: 'green' }], // Current day
    '2025-09-03': [{ color: '#87CEEB', type: 'light-blue' }, { color: '#87CEEB', type: 'light-blue' }],
    '2025-09-06': [{ color: '#00C896', type: 'green' }],
    '2025-09-08': [{ color: '#9370DB', type: 'purple' }],
    '2025-09-10': [{ color: '#87CEEB', type: 'light-blue' }, { color: '#87CEEB', type: 'light-blue' }],
    '2025-09-13': [{ color: '#87CEEB', type: 'light-blue' }, { color: '#87CEEB', type: 'light-blue' }],
    '2025-09-15': [{ color: '#87CEEB', type: 'light-blue' }, { color: '#87CEEB', type: 'light-blue' }],
    '2025-09-17': [{ color: '#90EE90', type: 'light-green' }],
    '2025-09-20': [{ color: '#87CEEB', type: 'light-blue' }, { color: '#87CEEB', type: 'light-blue' }],
    '2025-09-22': [{ color: '#87CEEB', type: 'light-blue' }, { color: '#87CEEB', type: 'light-blue' }],
    '2025-09-23': [{ color: '#9370DB', type: 'purple' }],
    '2025-09-29': [{ color: '#87CEEB', type: 'light-blue' }, { color: '#87CEEB', type: 'light-blue' }],
  }

  // Upcoming events for the list
  const upcomingEvents = [
    {
      id: 1,
      title: 'Product Roadmap Review',
      time: '10:00 AM',
      color: '#00C896', // Green
    },
    {
      id: 2,
      title: 'Client Meeting',
      time: '3:00 PM',
      color: '#87CEEB', // Light blue
    },
  ]

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
          const dateKey = formatDateKey(day.fullDate)
          const dayEvents = events[dateKey] || []
          const isCurrentDay = isToday(day.fullDate)

          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.calendarDay,
                !day.isCurrentMonth && styles.calendarDayOtherMonth,
              ]}
            >
              <View
                style={[
                  styles.dateContainer,
                  isCurrentDay && styles.dateContainerToday,
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
              
              {/* Event Indicators */}
              {dayEvents.length > 0 && (
                <View style={styles.eventIndicators}>
                  {dayEvents.slice(0, 2).map((event, eventIndex) => (
                    <View
                      key={eventIndex}
                      style={[styles.eventDot, { backgroundColor: event.color }]}
                    />
                  ))}
                  {dayEvents.length > 2 && (
                    <View style={[styles.eventDot, { backgroundColor: '#87CEEB' }]} />
                  )}
                </View>
              )}
            </TouchableOpacity>
          )
        })}
      </View>

      {/* Upcoming Events Section */}
      <View style={styles.eventsSection}>
        {upcomingEvents.map((event) => (
          <TouchableOpacity key={event.id} style={styles.eventCard}>
            <View style={[styles.eventBar, { backgroundColor: event.color }]} />
            <View style={styles.eventContent}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventTime}>{event.time}</Text>
            </View>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
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
    paddingHorizontal: rp(16),
    paddingBottom: rh(20),
  },
  headerTitle: {
    fontSize: rf(24),
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  monthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: rp(16),
    marginBottom: rh(10),
  },
  navButton: {
    width: rw(36),
    height: rh(36),
    borderRadius: rw(18),
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthTextContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: rw(16),
  },
  monthText: {
    fontSize: rf(20),
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  yearText: {
    fontSize: rf(14),
    color: '#666',
    marginTop: rh(2),
  },
  daysOfWeekContainer: {
    flexDirection: 'row',
    paddingHorizontal: rp(16),
    marginBottom: rh(12),
  },
  dayOfWeek: {
    flex: 1,
    alignItems: 'center',
  },
  dayOfWeekText: {
    fontSize: rf(12),
    fontWeight: '600',
    color: '#666',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: rp(16),
    marginBottom: rh(20),
  },
  calendarDay: {
    width: '14.28%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: rh(8),
    minHeight: rh(50),
  },
  calendarDayOtherMonth: {
    opacity: 0.3,
  },
  dateContainer: {
    width: rw(32),
    height: rh(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: rh(4),
  },
  dateContainerToday: {
    backgroundColor: '#00C896',
    borderRadius: rw(16),
  },
  calendarDayText: {
    fontSize: rf(14),
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
    marginTop: rh(2),
    flexWrap: 'wrap',
    gap: rw(3),
    maxWidth: rw(40),
  },
  eventDot: {
    width: rw(6),
    height: rh(6),
    borderRadius: rw(3),
  },
  eventsSection: {
    paddingHorizontal: rp(16),
    paddingBottom: rh(20),
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: rw(12),
    marginBottom: rh(12),
    borderWidth: 1,
    borderColor: '#E9ECEF',
    overflow: 'hidden',
    alignItems: 'center',
  },
  eventBar: {
    width: rw(4),
    height: '100%',
  },
  eventContent: {
    flex: 1,
    padding: rp(16),
  },
  eventTitle: {
    fontSize: rf(16),
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: rh(4),
  },
  eventTime: {
    fontSize: rf(14),
    color: '#666',
  },
  viewButton: {
    paddingHorizontal: rp(20),
    paddingVertical: rh(8),
    marginRight: rw(16),
  },
  viewButtonText: {
    fontSize: rf(14),
    color: '#666',
    fontWeight: '500',
  },
})

export default CalendarScreen
