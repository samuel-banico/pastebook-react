import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import SingleAlbum from './SingleAlbum'
import { getAllUserAlbum, getUserRelationship } from './ProfileService'
import { getTokenData } from '../others/LocalStorage'

const ProfileAlbum = ({navigation, userId}) => {

    const [data, setData] = useState({})
    const [relationship, setRelationship] = useState('own')

    useEffect(() => {
        const fetchData = async() => {

            var token = await getTokenData();

            await getUserRelationship(token, {id: userId})
            .then(response => {
                setRelationship(response.data.result)
            })
            .catch(error => {

                console.log('\nERROR: Profile Album, establishing user relationship')
                console.log(error.response.data);
            })

            await getAllUserAlbum({id: userId})
            .then(response => {
                setData(response.data)
            })
            .catch(error => {
                console.log('\nERROR: Profile Album, Receiving all user album')
                console.log(error.response.data)
            })
        }

        fetchData()
    }, [navigation])

    return (
        <View style={styles.container}>
            <View style={[globalStyle.alignToColumn]}>
                <Text style={[globalStyle.textTitle]}>Album</Text>
                <Text>
                    {
                        data.length > 0 ? `▫️${data.length}` : null
                    }
                </Text>
            </View>
            
            <View style={styles.albumContainer}>
                <View style={[globalStyle.alignToColumn, styles.albumListContainer]}>
                    {
                        relationship === 'own' ?
                        <TouchableOpacity onPress={() => navigation.navigate('Create Album')}>
                            <View>
                                <Image 
                                style={styles.img} 
                                source={require('../../assets/img/add_album.png')}/>
                                <Text>Create Album</Text>
                            </View>
                        </TouchableOpacity> : 
                        null
                    }
                    
                    {
                        data.length > 0 ? 
                        data.map((item) => (
                            <SingleAlbum key={item} item={item} navigation={navigation}/>
                        )) : 
                        <View>
                            <Text>
                                No Album/s
                            </Text>
                        </View>
                    }
                </View>
            </View>
        </View>
    )
}

export default ProfileAlbum

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    titleContainer: {
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    albumContainer: {
        flex: 1,
        paddingTop: 10
    },
    albumListContainer: {
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    img: {
        width: 150,
        height: 150
    }
})