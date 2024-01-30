import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'

import ProfileDetails from './ProfileDetails'
import ProfileNavigation from './ProfileNavigation'
import ErrorScreen from '../../screens/ErrorScreen'

import PostsScreen from '../../screens/profileScreen/PostsScreen'
import AlbumsScreen from '../../screens/profileScreen/AlbumsScreen'
import FriendsScreen from '../../screens/profileScreen/FriendsScreen'

import globalStyle from '../../assets/styles/globalStyle'

const Profile = ({navigation, userId}) => {
    const [profileNavigation, setProfileNavigation] = useState('posts');

    function navigate(page) {
      setProfileNavigation(page);
    }
  
    return (
      <View style={[globalStyle.colorBackground]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <ProfileDetails navigation={navigation} userId={userId}/>
  
            <View style={{paddingTop: 6, backgroundColor: 'white'}}/>
  
            <ProfileNavigation page={navigate}/>
            <View style={{flex: 1, paddingTop: 6, backgroundColor: 'white'}}/>
            { 
                profileNavigation == 'posts' ? <PostsScreen navigation={navigation} userId={userId}/> :
                profileNavigation == 'friends' ? <FriendsScreen navigation={navigation} userId={userId}/> :
                profileNavigation == 'albums' ? <AlbumsScreen navigation={navigation} userId={userId}/> :
                <ErrorScreen/>
            }
          </ScrollView>
      </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
      flex: 1
    }
  })