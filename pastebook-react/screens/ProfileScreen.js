import { View, Text, SafeAreaView } from 'react-native'
import React, {useState} from 'react'

import Profile from '../component/profile/Profile'
import ProfileNavigation from '../component/profile/ProfileNavigation'
import ErrorScreen from './ErrorScreen'

import AlbumsScreen from './profileScreen/AlbumsScreen'
import FriendsScreen from './profileScreen/FriendsScreen'
import PostsScreen from './profileScreen/PostsScreen'


const ProfileScreen = () => {

  const [profileNavigation, setProfileNavigation] = useState('posts');

  function navigate(page) {
    setProfileNavigation(page);
}

  return (
    <SafeAreaView>
        <Profile/>
        <ProfileNavigation page={navigate}/>
        { 
            profileNavigation == 'posts' ? <PostsScreen/> :
            profileNavigation == 'friends' ? <FriendsScreen/> :
            profileNavigation == 'albums' ? <AlbumsScreen/> :
            <ErrorScreen/>
        }
    </SafeAreaView>
    
  )
}

export default ProfileScreen