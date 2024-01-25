import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React, {useState, useEffect} from 'react'

import Header from '../navbar/Header'
import IconNavbar from '../navbar/IconNavbar'

import FeedScreen from '../../screens/homeScreen/FeedScreen'
import FriendRequestScreen from '../../screens/homeScreen/FriendRequestScreen'
import NotificationScreen from '../../screens/homeScreen/NotificationScreen'
import ErrorScreen from '../../screens/ErrorScreen'

import globalStyle from '../../assets/styles/globalStyle'

import { getTokenData } from '../others/LocalStorage'
import { loadHome } from './HomeService'

const Home = ({navigation, setLoading}) => {

    const [toIcon, setToIcon] = useState({
        hasNotification: false,
        hasFriendRequest: false,
    });
    
    const [toFeed, setToFeed] = useState({
        user: {},
        onlineFriends: [],
        feed: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userToken = await getTokenData();
                await loadHome(userToken).then(response => {
                    const data = response.data;
                    
                    setToIcon({
                        hasFriendRequest: data.hasFriendRequest,
                        hasNotification: data.hasNotification,
                      });

                    setToFeed({
                        user: data.user,
                        onlineFriends: data.onlineFriends,
                        feed: data.feed,
                    });
                });
            } catch (error) {
                if(error.response && error.response.data.result === 'no_token') {
                    console.log('ERROR: No Token')
                } else {
                    console.log(error)
                }
            }
        };

        fetchData();
    }, []);

    const [homeNavigation, setHomeNavigation] = useState('Home');

    function navigate(page) {
        setHomeNavigation(page);
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={[styles.headerContainer, globalStyle.colorBackground]}>
                <Header navigation={navigation} data={toFeed.user}/>
                <IconNavbar page={navigate} currPage={homeNavigation} notifs={toIcon} />
            </View>

            <View style={{paddingTop: 8, backgroundColor: 'white'}}/>
            
            <View style={{flex: 1}}>
                { 
                    homeNavigation == 'Home' ? <FeedScreen navigation={navigation} details={toFeed}/> :
                    homeNavigation == 'FriendRequest' ? <FriendRequestScreen/> :
                    homeNavigation == 'Notification' ? <NotificationScreen/> :
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