import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, {useState} from 'react'

import Profile from '../component/profile/Profile'
import ProfileNavigation from '../component/profile/ProfileNavigation'
import ErrorScreen from './ErrorScreen'

import AlbumsScreen from './profileScreen/AlbumsScreen'
import FriendsScreen from './profileScreen/FriendsScreen'
import PostsScreen from './profileScreen/PostsScreen'

import globalStyle from '../assets/styles/globalStyle'


const ProfileScreen = ({navigation}) => {

  const [profileNavigation, setProfileNavigation] = useState('posts');

  function navigate(page) {
    setProfileNavigation(page);
  }

  return (
    <SafeAreaView style={[globalStyle.colorBackground, styles.container]}>
        <ScrollView>
          <Profile navigation={navigation}/>

          <View style={{paddingTop: 6, backgroundColor: 'white'}}/>

          <ProfileNavigation page={navigate}/>
          <View style={{paddingTop: 6, backgroundColor: 'white'}}/>
          { 
              profileNavigation == 'posts' ? <PostsScreen/> :
              profileNavigation == 'friends' ? <FriendsScreen/> :
              profileNavigation == 'albums' ? <AlbumsScreen navigation={navigation}/> :
              <ErrorScreen/>
          }
        </ScrollView>
    </SafeAreaView>
    
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    flex: 1
  }
})