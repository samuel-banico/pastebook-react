import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import { getUserById } from './ProfileService'

const SingleFriend = ({navigation, item}) => {

    const [data, setData] = useState({})

    useEffect(() => {
        const fetchData = async() => {
            await getUserById({id: item})
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.log('ERROR: At Single Friend')
                console.log(error)
            })
        }

        fetchData()
    }, [])

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile', {id: item})}>
                <Image 
                    source={{uri: data.profilePicture}}
                    style={styles.img}/>
                <Text numberOfLines={3} style={{paddingLeft: 5}}>{data.fullname}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SingleFriend

const styles = StyleSheet.create({
    container: {
        width: 100,
        paddingBottom: 10
    },
    img: {
        width: 90,
        height: 90,
        borderRadius: 20
    }
})