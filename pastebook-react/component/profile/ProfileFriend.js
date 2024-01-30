import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import SingleFriend from './SingleFriend'

import { getTokenData } from '../others/LocalStorage'
import { getAllFriends } from './ProfileService'

const ProfileFriend = ({navigation, userId}) => {
    const [data, setData] = useState({})

    useEffect(() => {
        const fetchData = async() => {

            await getAllFriends({id: userId})
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.log('ERROR: Profile Friend')
                console.log(error)
            })
            
        }

        fetchData();
    }, [])

  return (
    <View style={[styles.container]}>

        <View style={[globalStyle.alignToColumn, styles.titleContainer]}>
            <Text style={[globalStyle.textTitle]}>Friends</Text>
            <Text>
                {
                    data.length > 0 && `▫️${data.length}`
                }
            </Text>
        </View>

        <View style={[styles.friendContainer]}>
            <View style={[globalStyle.alignToColumn, styles.friendListContainer]}>
                {
                    data.length > 0 ? 
                    data.map((item) => (
                        <SingleFriend key={item} item={item} navigation={navigation}/>
                    )) :
                    <View>
                        <Text>
                            No Friends
                        </Text>
                    </View>
                }
            </View>
        </View>
    </View>
  )
}

export default ProfileFriend

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10
    }, 
    titleContainer: {
        alignItems: 'center'
    }, 
    friendContainer: {
        flex: 1,
        paddingTop: 10,
        justifyContent: 'space-between'
    },
    friendListContainer: {
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    }
    
})