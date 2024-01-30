import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import SingleRequest from './SingleRequest'

import Loading from '../others/Loading'
import {getTokenData} from '../others/LocalStorage'
import { getAllFriendRequest } from './FriendRequestService'

const FriendRequest = ({navigation}) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            var token = await getTokenData();

            await getAllFriendRequest(token)
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.log('ERROR: FriendRequest, receiving backend friend request Ids')
                console.log(error)
            })
        }

        fetchData()
    }, [])

  return (
    <>
        {
            loading ? <Loading/> :
            <View style={[styles.container, globalStyle.colorBackground]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={[styles.alignToColumn, {alignItems: 'center', marginTop: 10}]}>
                        <Text style={globalStyle.textTitle}>Friend Requests</Text>
                        {
                            (data != null && data.length > 0) ?
                            <Text>▫️{data.length}</Text> : null
                            
                        }
                    </View>

                    {
                        (data != null && data.length > 0) ?
                        data.map((item) => (
                            <SingleRequest key={item} item={item} navigation={navigation}/>
                        )) : 
                        <View style={{height: 100, alignItems: 'center', justifyContent: 'center'}}>
                            <Text>No Current Friend Request/s</Text>
                        </View>
                    }
                </ScrollView>
            </View>
        }
    </>
    
  )
}

export default FriendRequest

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        flex: 1,
    },
    alignToColumn: {
        flexDirection: 'row'
    }
})