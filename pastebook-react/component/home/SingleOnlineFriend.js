import { Image, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { getTokenData } from '../others/LocalStorage'
import { getOnlineFriendById } from './HomeService'

const SingleOnlineFriend = ({item, navigation}) => {
    const [data, setData] = useState({})

    useEffect(() => {
        const fetchData = async() => {
            var token = await getTokenData();

            await getOnlineFriendById(token, {id: item})
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }

        fetchData();
    }, [])

  return (
    <View styles={styles.container}>
        <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigation.navigate('Profile', {id: item})}>
            <Image  
                style={styles.img} 
                source={{uri: data.profilePicture}}/>
            <View style={{width: 80, alignItems: 'center'}}>
                <Text numberOfLines={3}>{data.fullname}</Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default SingleOnlineFriend

const styles = StyleSheet.create({
    container: {
        width: 90,
        height: 100,
        justifyContent: 'center',
        flex: 1,
    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    text: {
        flex: 1
    }
})