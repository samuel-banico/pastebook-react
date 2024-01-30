import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, {useState, useEffect} from 'react'

import Header from '../navbar/Header'
import IconNavbar from '../navbar/IconNavbar'

import FeedScreen from '../../screens/homeScreen/FeedScreen'
import FriendRequestScreen from '../../screens/homeScreen/FriendRequestScreen'
import NotificationScreen from '../../screens/homeScreen/NotificationScreen'
import ErrorScreen from '../../screens/ErrorScreen'

import globalStyle from '../../assets/styles/globalStyle'

const Home = ({navigation}) => {
    const [homeNavigation, setHomeNavigation] = useState('Home');

    function navigate(page) {
        setHomeNavigation(page);
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={[styles.headerContainer, globalStyle.colorBackground]}>
                <Header navigation={navigation}/>
                <IconNavbar page={navigate} currPage={homeNavigation}/>
            </View>

            <View style={{paddingTop: 8, backgroundColor: 'white'}}/>
            
            <View style={{flex: 1}}>
                { 
                    homeNavigation == 'Home' ? <FeedScreen navigation={navigation}/> :
                    homeNavigation == 'FriendRequest' ? <FriendRequestScreen navigation={navigation}/> :
                    homeNavigation == 'Notification' ? <NotificationScreen navigation={navigation}/> :
                    <ErrorScreen/>
                }
            </View>
            
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1
    },
    headerContainer: {
        backgroundColor: 'white',
        paddingTop: 8
    }
})