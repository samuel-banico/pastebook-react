import { View, Text } from 'react-native'
import React from 'react'

// with headerShown false
import FeedScreen from '../screens/FeedScreen';
import FriendRequestScreen from '../screens/FriendRequestScreen';
import NotificationScreen from '../screens/NotificationScreen';

// with headerShown true
import CreatePostScreen from '../screens/CreatePostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';

import RegisterScreen from '../screens/RegisterScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Page = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={FeedScreen} options={{headerShown: false}}/>
          <Stack.Screen name="FriendRequest" component={FriendRequestScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Notification" component={NotificationScreen} options={{headerShown: false}}/>

          <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{headerShown: true}}/>
          <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: true}}/>
          <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: true}}/>
          <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Page