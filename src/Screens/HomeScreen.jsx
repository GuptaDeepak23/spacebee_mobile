import React from 'react'
import { View, Text , ScrollView,Image ,StyleSheet,TextInput, Modal } from 'react-native'
import { UpcomingMeetingCard } from '../components/Upcomingmeeting'
import { RoomCard } from '../components/Roomcard'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import Bookroom from '../components/Bookroom'
import { rw, rh, rf, rp, getScreenWidth } from '../utils/responsive'


export const HomeScreen = () => {

  const tabs = ['All', 'Available', 'My Bookings', 'Capacity'];
  const [activeTab, setActiveTab] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleBookRoom = (roomName) => {
    setSelectedRoom(roomName);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRoom(null);
  };
  return (
    <>
   <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
        <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatar} />
        <View>
          <Text style={styles.name}>Hello, Prasad</Text>
          <Text style={styles.role}>Project Manager – Product Team</Text>
        </View>
        </View>
        <TouchableOpacity style={styles.bellButton}>
          <View style={styles.bellButtonContainer}>
          <Ionicons name="notifications-outline" size={rf(25)} color="black" />
          </View>
   
    {/* optional small red dot for notification */}
    <View style={styles.notificationDot} />
  </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
    <Ionicons name="search-outline" size={rf(18)} color="#888" style={{ marginRight: rw(6) }} />
    <TextInput
      placeholder="Search meeting room"
      placeholderTextColor="#888"
      style={{ flex: 1, fontSize: rf(14) }}
    />
  </View>
  </View>
  <TouchableOpacity style={styles.filterButton}>
    <Ionicons name="filter-outline" size={rf(20)} color="#fff" />
  </TouchableOpacity>

      <View style={styles.summaryRow}>
        <View style={styles.summaryCard}>
        <View style={styles.summaryCardContent}>
          <Text style={styles.summaryTitle}>Available Rooms</Text>
          <Text style={styles.number}>100</Text>
          </View>
         <View>
         <Image
      source={require('../../assets/meeting-room.png')}
      style={styles.icon}
    
    />
         </View>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: '#FFF7E0' }]}>
          <View>
          <Text style={styles.summaryTitle}>Ongoing Meetings</Text>
          <Text style={styles.number}>15</Text>
          </View>
          <View>
          <Image
      source={require('../../assets/hourglass.png')}
      style={styles.icon2}
    
    />
          </View>
        </View>
      </View>

    

       {/* <View style={styles.upcomingMeetingsContainer}>
        <Text style={styles.sectionTitle}>Upcoming Meetings</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScroll}
        contentContainerStyle={styles.horizontalScrollContent}
      >
        <UpcomingMeetingCard title="Product Roadmap Q1 Review" date="Thu, Nov 6, 2025" time="10:00 AM - 11:30 AM" room="Conference Room" host="Deepak" />
        <UpcomingMeetingCard title="Project Status" date="Fri, 8 Nov 2025" time="12:00 AM - 1:00 AM" room="Plot Room" host="Prasad" />
        <UpcomingMeetingCard title="Team Standup" date="Mon, Nov 10, 2025" time="9:00 AM - 9:30 AM" room="Meeting Room B" host="Sarah" />
      </ScrollView> */}

      {/* All Rooms */}
      <View style={styles.roomContainer}>
      <Text style={styles.sectionTitle}>All Rooms</Text>
      
      </View>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScrollContainer}
        contentContainerStyle={styles.tabsContainer}
      >
             {tabs.map((tab,index) => {
              return(
                <TouchableOpacity key={index} onPress={() => setActiveTab(tab)} style={[
                  styles.tab,
                  activeTab === tab && styles.activeTab,
                  index < tabs.length - 1 && styles.tabSpacing,
                ]}>
                  {tab === 'Capacity' && (
                    <Ionicons name="people-outline" size={rf(16)} color={activeTab === tab ? '#fff' : '#666'} style={{ marginRight: rw(4) }} />
                  )}
                  <Text style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}>{tab}</Text>
                </TouchableOpacity>
              )
             })}
      </ScrollView>
      <RoomCard name="Conference" status="Available" capacity="10 peoples" location="1st Floor" onBookRoom={() => handleBookRoom('Conference')}/>
      <RoomCard name="Innovative Room" status="Occupied" capacity="5 peoples" location="1st Floor" onBookRoom={() => handleBookRoom('Innovative Room')}/>
      <RoomCard name="Collaboration Space" status="Available" capacity="5 peoples" location="1st Floor" onBookRoom={() => handleBookRoom('Collaboration Space')}/>
    </View>
   </ScrollView>
   <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book a {selectedRoom}</Text>
              <TouchableOpacity onPress={closeModal}>
                 <View style={styles.closeIconContainer}>
                 <Image source={require('../../assets/elements.png')} style={styles.closeIcon} />
                 </View>
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <Bookroom roomName={selectedRoom} onClose={closeModal} />
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}


const styles = StyleSheet.create({
    container: { padding: rp(16), backgroundColor: '#fff', paddingTop: rh(40) },
    header: { flexDirection: 'row', alignItems: 'center', marginVertical: rh(20), justifyContent: 'space-between' },
    headerLeft: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: rw(50), height: rh(50), borderRadius: rw(25), marginRight: rw(10) },
    name: { fontWeight: '500', fontSize: rf(16) },
    role: { color: '#666', fontSize: rf(14) },
    summaryTitle: { fontWeight: '400', fontSize: rf(14) },
    icon: { position: 'absolute', bottom: rh(-15), right: rw(-10), width: rw(60), height: rh(30) },
    icon2: { position: 'absolute', bottom: rh(-15), right: rw(-10), width: rw(45), height: rh(30) },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: rh(-10) },
    summaryCard: { backgroundColor: '#E8FDF2', padding: rp(16), borderRadius: rw(12), width: '48%' },
    number: { fontWeight: 'bold', fontSize: rf(18), marginTop: rh(6) },
    sectionTitle: { fontWeight: '900', fontSize: rf(16) ,fontFamily:'Arial, Helvetica, sans-serif'},
    upcomingMeetingsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: rh(12), marginTop: rh(20) },
    viewAll: { color: '#00C896', fontWeight: '600', fontSize: rf(12) },
    horizontalScroll: {
      marginLeft: rw(-16),
      marginRight: rw(-16),
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#f2f2f2',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: rw(11),
        paddingHorizontal: rp(10),
        flex: 1,
        marginBottom: rh(10),
        height: rh(40),
      },
    horizontalScrollContent: {
      paddingLeft: rp(16),
      paddingRight: rp(16),
      paddingBottom: rh(8),
    },
    roomContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: rh(8), marginTop: rh(10) ,paddingTop: rh(8)},
    tabsScrollContainer: {
      marginBottom: rh(16),
      marginTop: rh(8),
    },
    tabsContainer: {
      flexDirection: 'row',
      paddingRight: rp(16),
    },
    tabSpacing: {
      marginRight: rw(8),
    },
    tab: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: rp(16),
      paddingVertical: rh(8),
      borderRadius: rw(20),
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#E0E0E0',
    },
    activeTab: {
      backgroundColor: '#00C896',
      borderColor: '#00C896',
    },
    tabText: {
      fontSize: rf(13),
      color: '#6B7280',
     
    },
    activeTabText: {
      color: '#fff',
      fontWeight: '600',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderTopLeftRadius: rw(20),
      borderTopRightRadius: rw(20),
      maxHeight: '90%',
      minHeight: '50%',
      paddingTop: rh(20),
      paddingHorizontal: rp(20),
      flexDirection: 'column',
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
    closeButton: {
      padding: rp(4),
      width: rw(40),
      height: rh(40),
      borderRadius: rw(30),
      backgroundColor: 'rgba(30, 30, 30, 0.50)',
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
    bellButtonContainer: {
      backgroundColor: '#E4FFF4',
      borderRadius: rw(30),
      width: rw(40),
      height: rh(40),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });