import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import HR from '../others/HR'

import { getTokenData } from '../others/LocalStorage'
import { getProfileUserDetails, getUserRelationship, sendFriendRequest } from './ProfileService'

import Loading from '../others/Loading'
import Toast from 'react-native-toast-message'

const ProfileDetails = ({navigation, userId}) => {
    const [data, setData] = useState({});
    const [relationship, setRelationship] = useState('own')
    const [loading, setLoading] = useState(true)

    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            var token = await getTokenData();
            
            await getUserRelationship(token, {id: userId})
            .then(response => {
                setRelationship(response.data.result)
            })
            .catch(error => {
                console.log(error)
            })

            await getProfileUserDetails({ id: userId})
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.log(error.response.data)
            })

            setLoading(false)
        }

        fetchData();
    }, [refresh, navigation])

    const addFriendClick = async() => {
        var token = await getTokenData();

        await sendFriendRequest(token, {id: userId})
        .then(response => {
            console.log(response.data)
            Toast.show({type: 'success', text1: 'Friend Request Sent', 
                text2: `You sent a friend request to ${data.firstName} ${data.lastName}`})
            setRefresh(!refresh)

        })
        .catch(error => {
            console.log('ERROR: ProfileDetails, sending friend request')
            console.log(error)
        })
    }

  return (
    <>
        {
            loading ? <Loading/> :
            <View style={[styles.container]}>
                <View style={styles.bioContainer}>
                    <Image 
                        style={styles.img} 
                        source={{uri: data.profilePicture}}/>

                    <Text>{data.firstName} {data.lastName}</Text>
                    <Text>{data.bio}</Text>
                </View>

                <HR/>
                
                <View style={[globalStyle.alignToColumn, styles.detailsContainer]}>
                    <View>
                        <View>
                            <Text style={[styles.detailsText, globalStyle.colorPimaryText]}>Birthday: </Text>
                            <Text>{data.birthday}</Text>
                        </View>

                        <View>
                            <Text style={[styles.detailsText, globalStyle.colorPimaryText]}>Gender: </Text>
                            <Text>
                                {
                                    data.gender === 0 ? 'Male' :
                                    data.gender === 1 ? 'Female' :
                                    'Others'
                                }
                            </Text>
                        </View>

                        <View>
                            <Text style={[styles.detailsText, globalStyle.colorPimaryText]}>Mobile Number: </Text>
                            <Text>{data.mobileNumber}</Text>
                        </View>
                    </View>

                    <View>
                        {
                            relationship === 'own' && 
                            <TouchableOpacity onPress={() => navigation.navigate('Edit Profile')}>
                                <Text>✏️ Edit Profile</Text>
                            </TouchableOpacity>
                        }

                        {
                            relationship === 'sent' &&
                            <View style={globalStyle.alignToColumn}>
                                <Image style={styles.friendImg}
                                    source={require('../../assets/img/friend_sent.png')}/>
                                <Text>
                                    Friend Request Sent
                                </Text>
                            </View>
                            
                        }

                        {
                            relationship === 'friend' &&
                            <View style={globalStyle.alignToColumn}>
                                <Image style={styles.friendImg}
                                    source={require('../../assets/img/friend.png')}/>
                                <Text>
                                    Friends
                                </Text>
                            </View>
                        }

                        {
                            relationship === 'not_friend' &&
                            <TouchableOpacity onPress={addFriendClick}>
                                <View style={globalStyle.alignToColumn}>
                                    <Image style={styles.friendImg}
                                        source={require('../../assets/img/friend_add.png')}/>
                                    <Text>
                                        Add Friend
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
        }
    </>
  )
}

export default ProfileDetails

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    bioContainer: {
        alignItems: 'center'
    },
    detailsContainer: {
        justifyContent: 'space-between'
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    friendImg: {
        width: 30,
        height: 30,
    },
    detailsText: {
        fontSize: 14,
        fontWeight: '600'
    }
})