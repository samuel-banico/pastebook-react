
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Toast from 'react-native-toast-message';

import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

// with headerShown true
import CreatePostScreen from './screens/CreatePostScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import SettingsScreen from './screens/SettingsScreen';
import SecurityScreen from './screens/SecurityScreen';
import EditProfileScreen from './screens/profileScreen/EditProfileScreen'
import CreateAlbumScreen from './screens/CreateAlbumScreen';
import AlbumScreen from './screens/AlbumScreen';
import SinglePhotoScreen from './screens/SinglePhotoScreen';
import SinglePostScreen from './screens/SinglePostScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
     <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Sign Up" component={RegisterScreen} options={{headerShown: true}}/>

        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>

        <Stack.Screen name="Create Post" component={CreatePostScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Search" component={SearchScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Settings" component={SettingsScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Security" component={SecurityScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Edit Profile" component={EditProfileScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Create Album" component={CreateAlbumScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Album" component={AlbumScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Photo" component={SinglePhotoScreen} options={{headerShown: true}}/>
        <Stack.Screen name="Post" component={SinglePostScreen} options={{headerShown: true}}/>

      </Stack.Navigator>
    </NavigationContainer>
    <Toast />
    </>
  );
}
