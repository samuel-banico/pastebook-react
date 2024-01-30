import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import globalStyle from '../../assets/styles/globalStyle'
import SingleNotif from './SingleNotif'

import Loading from '../others/Loading'
import {getTokenData} from '../others/LocalStorage'
import { getAllUnseenNotificationIds, unseenNotification } from './NotificationService'

const Notification = ({navigation}) => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [actClick, setActClick] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            var token = await getTokenData();

            await getAllUnseenNotificationIds(token)
            .then(response => {
                setData(response.data)
                
                setLoading(false)
            })
            .catch(error => {
                console.log('ERROR: Notification, retrieval of all notifications')
                console.log(error)
            })
        }

        fetchData()
    }, [actClick])


    return (
        <>
            {
                loading ? <Loading/> : 
                <View style={[globalStyle.colorBackground, styles.container]}>
                    <ScrollView contentContainerStyle={{paddingBottom: 5}} showsVerticalScrollIndicator={false}>
                        <View style={[globalStyle.alignToColumn, styles.headerContainer]}>
                            <View style={[globalStyle.alignToColumn]}>
                                <Text style={globalStyle.textTitle}>Notifications</Text>
                                {
                                    (data != null && data.length > 0) ? <Text>▫️{data.length}</Text> : null
                                }
                            </View>
                            <TouchableOpacity style={[{paddingTop: 2}]}>
                                <Text>ALL</Text>
                            </TouchableOpacity>
                        </View>

                        {
                            (data != null && data.length > 0) ? 
                            data.map((item) => (
                                <SingleNotif key={item} item={item} navigation={navigation}/>
                            )) : 
                            <View style={{height: 100, alignItems: 'center', justifyContent: 'center'}}>
                                <Text>No Notification/s</Text>
                            </View>
                        }
                    </ScrollView>   
                </View>
            }
        </>
        
    )
}

export default Notification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    headerContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    }
})