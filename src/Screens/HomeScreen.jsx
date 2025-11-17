import React from 'react'
import { View, Text , ScrollView,Image ,StyleSheet,TextInput, Modal } from 'react-native'
import { UpcomingMeetingCard } from '../components/Upcomingmeeting'
import { RoomCard } from '../components/Roomcard'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import Bookroom from '../components/Bookroom'


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
    <Ionicons name="notifications-outline" size={25} color="#00C896" />
    {/* optional small red dot for notification */}
    <View style={styles.notificationDot} />
  </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
    <Ionicons name="search-outline" size={18} color="#888" style={{ marginRight: 6 }} />
    <TextInput
      placeholder="Search meeting room"
      placeholderTextColor="#888"
      style={{ flex: 1 }}
    />
  </View>
  </View>
  <TouchableOpacity style={styles.filterButton}>
    <Ionicons name="filter-outline" size={20} color="#fff" />
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
      </ScrollView> */}

      {/* All Rooms */}
      <View style={styles.roomContainer}>
      <Text style={styles.sectionTitle}>All Rooms</Text>
      <Text style={styles.viewAll}>View All</Text>
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
                    <Ionicons name="people-outline" size={16} color={activeTab === tab ? '#fff' : '#666'} style={{ marginRight: 4 }} />
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
    container: { padding: 16, backgroundColor: '#fff',paddingTop:40},
    header: { flexDirection: 'row', alignItems: 'center', marginVertical: 20,justifyContent: 'space-between' },
    headerLeft: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
    name: { fontWeight: 'bold', fontSize: 16 },
    role: { color: '#666' },
    summaryTitle:{fontWeight:'600'},
    icon:{position:'absolute',bottom:-15,right:-10},
    icon2:{position:'absolute',bottom:-15,right:-10},
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: -10 },
    summaryCard: { backgroundColor: '#E8FDF2', padding: 16, borderRadius: 12, width: '48%', },
    number: { fontWeight: 'bold', fontSize: 18, marginTop: 6 },
    sectionTitle: { fontWeight: 'bold', fontSize: 16 },
    upcomingMeetingsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,marginTop:20 },
    viewAll: { color: '#00C896', fontWeight: '600', fontSize: 12 },
    horizontalScroll: {
      marginLeft: -16,
      marginRight: -16,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        paddingHorizontal: 10,
        flex: 1,
        marginBottom: 10,
        height: 40,
      },
    horizontalScrollContent: {
      paddingLeft: 16,
      paddingRight: 16,
      paddingBottom: 8,
    },
    roomContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 ,marginTop:10},
    tabsScrollContainer: {
      marginBottom: 16,
      marginTop: 8,
    },
    tabsContainer: {
      flexDirection: 'row',
      paddingRight: 16,
    },
    tabSpacing: {
      marginRight: 8,
    },
    tab: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#E0E0E0',
    },
    activeTab: {
      backgroundColor: '#00C896',
      borderColor: '#00C896',
    },
    tabText: {
      fontSize: 14,
      color: '#666',
      fontWeight: '500',
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
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: '90%',
      minHeight: '50%',
      paddingTop: 20,
      paddingHorizontal: 20,
      flexDirection: 'column',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    modalBody: {
      paddingBottom: 20,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#1A1A1A',
    },
    closeButton: {
      padding: 4,
      width:40,
      height:40,
      borderRadius:30,
      backgroundColor:'rgba(30, 30, 30, 0.50)',
      
    },
    closeIcon: {
      width: 25,
      height: 20,
      borderRadius:25,
      resizeMode: 'contain',
      backgroundColor:'transparent',
      position:'absolute',
      color:'#FFFFFF',
      right:6,
      bottom:10,
    },
    closeIconContainer: {
      position:"absolute",
      right:155,
      bottom:80,
      backgroundColor:'rgba(30, 30, 30, 0.50)',
      borderRadius:30,
      width:40,
      height:40,
      alignItems:'center',
      justifyContent:'center',
    }
  });