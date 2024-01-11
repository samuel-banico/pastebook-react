import { View, Text } from 'react-native'
import React from 'react'

import RegisterScreen from '../screens/RegisterScreen';
import PageNavigation from '../navigations/PageNavigation';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export const Registration = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Welcome" component={PageNavigation} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
  