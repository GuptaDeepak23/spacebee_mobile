import React from 'react'
import { View, Text , ScrollView,Image ,StyleSheet,TextInput, Modal } from 'react-native'
import { UpcomingMeetingCard } from '../components/Upcomingmeeting'
import { RoomCard } from '../components/Roomcard'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import Bookroom from '../components/Bookroom'
import { rw, rh, rf, rp, getScreenWidth } from '../utils/responsive'
import {responsiveFontSize,responsiveWidth,responsiveHeight} from 'react-native-responsive-dimensions'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'react-native'

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
   <SafeAreaView edges={['top']}>
  
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
      <View style={{paddingVertical: responsiveHeight(0)}} >
      <View style={styles.searchBox}>
        <View style={styles.searchIconContainer}>
    <Ionicons name="search-outline" size={responsiveFontSize(2)} color="#888" style={{ marginRight: responsiveWidth(1) }} />
    <TextInput
      placeholder="Search meeting room"
      placeholderTextColor="#888"
      style={{  fontSize: responsiveFontSize(1.5), paddingVertical: responsiveHeight(0) }}
    />
    </View>
    <View style={styles.filterIconContainer}>
          <View style={styles.line}></View>
          <Image source={require('../../assets/filter-horizontal.png')} style={styles.filterIcon} />
    </View>
  </View>
  </View>
  <TouchableOpacity style={styles.filterButton}>
    <Ionicons name="filter-outline" size={responsiveFontSize(3)} color="#fff" />
  </TouchableOpacity>

  <View style={styles.alertContainer}>
    <View style={styles.alertIconContainer}>
      <View style={styles.alertIconContent}>
      <View style={styles.alertIconImageContainer}>
        <Image source={require('../../assets/Group 44317.png')} style={styles.alertIcon} />
      </View>
      <View>
        <Text style={styles.nextbutton}>Next Meeting</Text>
        <Text style={styles.alertDetailsSubtitle}>in 10 minutes</Text>
      </View>
      </View>
      <View>
        <Text style={styles.alertDetailsTime}>10:00 AM</Text>
      </View>
    </View>
    <View style={styles.alertDetailsContainer}>
      <View style={styles.alertDetailsText}>
        <Text style={styles.alertDetailsTitle}>Product Roadmap Q1 Review</Text>
        <View style={styles.alertDetailsLocationContainer}>
          <Ionicons name="location-outline" size={responsiveFontSize(1.7)} color="#666" />
        <Text style={styles.alertDetailsSubtitle}>Conference Room A • 3rd Floor</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.modifyButton}>
          <Text style={{color:'#FFFFFF'}}>Modify</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>

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

    

       <View style={styles.upcomingMeetingsContainer}>
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
      </ScrollView>

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

   </SafeAreaView>
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
    container: { padding: responsiveWidth(3), backgroundColor: '#fff' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    headerLeft: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: responsiveWidth(12), height: responsiveHeight(6), borderRadius: responsiveWidth(6), marginRight: responsiveWidth(2.5) },
    bellButton: { backgroundColor: '#E8FDF2', borderRadius: rw(30), width: rw(40), height: rh(40), alignItems: 'center', justifyContent: 'center' },
    name: { fontWeight: '500', fontSize: responsiveFontSize(2) },
    role: { color: '#666', fontSize: responsiveFontSize(1.8) },
    summaryTitle: { fontWeight: '400', fontSize: responsiveFontSize(1.8) },
    icon: { position: 'absolute', bottom: responsiveHeight(-1.8), right: responsiveWidth(-1), width: responsiveWidth(10), height: responsiveHeight(4) },
    icon2: { position: 'absolute', bottom: responsiveHeight(-1.8), right: responsiveWidth(-2), width: responsiveWidth(10), height: responsiveHeight(4) },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(-1) },
    summaryCard: { backgroundColor: '#E8FDF2', padding: responsiveWidth(3.8), borderRadius: rw(12), width: responsiveWidth(45) },
    number: { fontWeight: 'bold', fontSize: rf(18), marginTop: rh(6) },
    sectionTitle: { fontWeight: '900', fontSize: rf(16) ,fontFamily:'Arial, Helvetica, sans-serif'},
    upcomingMeetingsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: rh(12), marginTop: rh(20) },
    viewAll: { color: '#00C896', fontWeight: '600', fontSize: rf(12) },
    horizontalScroll: {
      marginLeft: rw(-16),
      marginRight: rw(-16),
    },
    searchIconContainer: {
      flexDirection: 'row',
   
      
    },
    filterIconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: responsiveWidth(2),
    },
    line: {
      width: responsiveWidth(0.3),
      height: responsiveHeight(3),
      backgroundColor: '#E0E0E0',
    },
    filterIcon: {
      width: responsiveWidth(6),
      height: responsiveHeight(3),
      resizeMode: 'contain',
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#f2f2f2',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: rw(11),
        paddingHorizontal: responsiveWidth(2),
        marginTop: responsiveHeight(2),
        
        flex: 1,
        marginBottom: responsiveHeight(),
        height: responsiveHeight(5),
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
    alertContainer:{
      backgroundColor: '#E9F9F5',
      padding: responsiveWidth(4),
      width: responsiveWidth(100),
      marginBottom: responsiveHeight(2),
      marginTop: '-4%',
      marginHorizontal: '-3%', // Counteract container padding to extend to edges
     
    },
   alertIconContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: responsiveWidth(2),
  

   },
   alertIconContent:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveWidth(2),
   },
   alertIconImageContainer:{
    
    overflow: 'hidden',
   },
    alertIcon: {
      width: responsiveWidth(9),
      height: responsiveHeight(4),
      resizeMode: 'cover',
    },
    alertDetailsLocationContainer:{
      flexDirection: 'row',
      alignItems: 'center',
      gap: responsiveWidth(1),
    },
    alertDetailsContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: responsiveWidth(2),
    },
    modifyButton:{
      backgroundColor:'#22BF96',
      padding: responsiveWidth(3),
      borderRadius: responsiveWidth(3),
      width: responsiveWidth(20),
      // height: responsiveHeight(4),
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: responsiveHeight(1),
    },
    modifyButtonText:{
      color:'#FFFFFF',
      fontSize: responsiveFontSize(1.5),
      fontWeight: 'bold',
    },
    alertDetailsText:{
      marginTop: responsiveHeight(1),
      gap: responsiveWidth(2),
    },
    alertDetailsTitle:{
      fontWeight: '600',
      fontSize: responsiveFontSize(1.7),
      color: '#1E1E1E',
    },
    alertDetailsSubtitle:{
      fontSize: responsiveFontSize(1.5),
      color: '#6B7280',
    },
    nextbutton:{
      fontWeight: '600',
      fontSize: responsiveFontSize(1.7),
      color: '#22BF96',
    },
    alertDetailsTime:{
      fontWeight: '800',
    }

  });