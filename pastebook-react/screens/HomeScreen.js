import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'

import Header from '../component/navbar/Header'
import IconNavbar from '../component/navbar/IconNavbar'

import FeedScreen from './homeScreen/FeedScreen'
import FriendRequestScreen from './homeScreen/FriendRequestScreen'
import NotificationScreen from './homeScreen/NotificationScreen'

import globalStyle from '../assets/styles/globalStyle'
import ErrorScreen from './ErrorScreen'

const HomeScreen = ({navigation}) => {

    const [homeNavigation, setHomeNavigation] = useState('Home');

    function navigate(page) {
        setHomeNavigation(page);
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={[styles.headerContainer, globalStyle.colorBackground]}>
                <Header navigation={navigation}/>
                <IconNavbar page={navigate}/>
            </View>
            
            <View style={[styles.body, globalStyle.colorBackground]}>
                { 
                    homeNavigation == 'Home' ? <FeedScreen navigation={navigation}/> :
                    homeNavigation == 'FriendRequest' ? <FriendRequestScreen/> :
                    homeNavigation == 'Notification' ? <NotificationScreen/> :
                    <ErrorScreen/>
                }
            </View>
            
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1
    },
    headerContainer: {
        backgroundColor: 'white',
        padding: 5
    },
    body: {
        flex: 1
    }
})