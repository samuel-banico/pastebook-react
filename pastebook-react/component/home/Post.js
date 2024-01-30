import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import { getTokenData } from '../others/LocalStorage'
import { getHomeUserData } from './HomeService'
import { getUserRelationship } from '../profile/ProfileService'

const Post = ({navigation, enableProfileTransfer, userId}) => {

    const [data, setData] = useState({})
    const [relationship, setRelationship] = useState('')

    useEffect(() => {
        const fetchData = async() => {
            var token = await getTokenData();

            await getHomeUserData(token)
            .then(response => {
                setData(response.data)
                if(!userId)
                    userId = response.data.userId
            })
            .catch(error => {
                console.log('ERROR: Post initializing Logged user data')
                console.log(error.response)
            })

            
            await getUserRelationship(token, {id: userId})
            .then(response => {
                setRelationship(response.data.result)
            })
            .catch(error => {
                console.log('ERROR: Post initializing user relationship')
                console.log(error);
            })
        }

        fetchData()
    }, [])

    const tranferToProfile = () => {
        if(enableProfileTransfer)
            navigation.navigate('Profile', {id: data.userId})
    }

    const createYourPost = () => {
        navigation.navigate('Create Post', { data: null})
    }

    const createPostOnFriend = () => {
        navigation.navigate('Create Post', { data: userId})
    }

    return (
        <>
            {
                relationship === 'own' ?
                <View style={[globalStyle.colorBackground, styles.container]}>
                    <TouchableOpacity onPress={tranferToProfile}>
                        <Image 
                            source={{ uri: data.profilePicture }}
                            style={styles.img}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textContainer}
                        onPress={createYourPost}>
                        <Text>What's on your mind?</Text>
                    </TouchableOpacity>
                </View> : 
                relationship === 'friend'?
                <View style={[globalStyle.colorBackground, styles.container]}>
                    <TouchableOpacity onPress={tranferToProfile}>
                        <Image 
                            source={{ uri: data.profilePicture }}
                            style={styles.img}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.textContainer}
                        onPress={createPostOnFriend}>
                        <Text>Write something to ...</Text>
                    </TouchableOpacity>
                </View> : null
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 10
    },
    textContainer: {
        borderWidth: 1,
        borderRadius: 20,

        justifyContent: 'center',

        paddingVertical: 5,
        paddingLeft: 20,
        marginHorizontal: 10,
        
        flex: 1
    },
    img: {
        width: 30,
        height: 30,
        borderRadius: 15,
    }
})

export default Post