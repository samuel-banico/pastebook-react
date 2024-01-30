import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import Loading from '../others/Loading'
import { acceptedFriendRequest, getFriendRequestDetailsById, rejectFriendRequest } from './FriendRequestService'
import Toast from 'react-native-toast-message'

const SingleRequest = ({navigation, item}) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actClick, setActClick] = useState(false)

    useEffect(() => {
        const fetchData = async() => {
            await getFriendRequestDetailsById({id: item})
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.log("ERROR: Single Request, retrieving single friend request")
                console.log(error)
            })
            setLoading(false);
        } 

        fetchData();
    }, [actClick])

    const confirmClick = async() => {
        await acceptedFriendRequest({id:item})
        .then(response => {
            console.log(response.data)
            Toast.show({type: 'success', text1:'Friend request', text2: `Accepted ${data.requestedUser.fullname} friend request`})
        })
        .catch(error => {
            console.log('ERROR: Single Request, Rejecting Friend Request')
            console.log(error)
        })

        setActClick(!actClick)
    }

    const rejectClick = async() => {
        await rejectFriendRequest({id:item})
        .then(response => {
            console.log(response.data)
            Toast.show({type: 'success', text1:'Friend request', text2: `Rejected ${data.requestedUser.fullname} friend request`})

        })
        .catch(error => {
            console.log('ERROR: Single Request, Rejecting Friend Request')
            console.log(error)
        })

        setActClick(!actClick)
    }

    return (
        <>
            {
                loading ? <Loading/> :
                <View style={[globalStyle.alignToColumn, styles.container]}>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile', {id: data.requestedUser.userId})}>
                        <Image 
                            source={{uri: data.requestedUser.profilePicture}}
                            style={styles.img}/>
                    </TouchableOpacity>
                    <View style={[styles.detailsContainer]}>
                        <View style={[globalStyle.alignToColumn, {justifyContent: 'space-between'}]}>
                            <TouchableOpacity onPress={() => navigation.navigate('Profile', {id: data.requestedUser.userId})}>
                                <Text>{data.requestedUser.fullname}</Text>
                            </TouchableOpacity>
                            <Text>{data.dateCreated}</Text>
                        </View>
                        <View style={[globalStyle.alignToColumn, styles.buttonContainer]}>
                            <TouchableOpacity onPress={confirmClick}
                                style={[styles.button, globalStyle.colorPimaryBG]}>
                                <Text style={[styles.buttonText]}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={rejectClick}
                                style={[styles.button, globalStyle.colorSecondaryBG]}>
                                <Text style={[styles.buttonText]}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
        </>
    )
}

export default SingleRequest

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    detailsContainer: {
        flex: 1
    },
    buttonContainer: {
        marginTop: 5,
        justifyContent: 'space-between',
    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 5
    },
    button: {
        width: 120,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 1
    },
    buttonText: {
        color: 'white',
        fontWeight: 600
    }
})