import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import EvilIcons from '@expo/vector-icons/EvilIcons'
import globalStyle from '../../assets/styles/globalStyle'

import HR from '../others/HR'
import { getAlbumImageDetailsById } from './SinglePhotoService'
import {getTokenData} from '../others/LocalStorage'
import Loading from '../others/Loading'

const SinglePhotoDetails = ({navigation, id}) => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            var token = await getTokenData();

            await getAlbumImageDetailsById(token, {id: id})
            .then(response => {
                setData(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.log('ERROR: Single Photo Details, retreiving Album Image Details')
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
                    <View style={styles.contentContainer}>
                        <Image
                            style={styles.img}
                            resizeMode='contain'
                            source={{uri: data.image}}/>
                    </View>
                            
                    <View style={styles.footer}>
                        <Text>{data.createdOn}</Text>
                        <View style={[globalStyle.alignToColumn, {justifyContent: 'space-between'}]}>
                            {
                                data.likeCount > 0 ? 
                                <TouchableOpacity>
                                    <Text>❤️ {data.likeCount}</Text>
                                </TouchableOpacity> : <Text> </Text>
                            }
                            
                            {
                                data.commentCount > 0 ?
                                <TouchableOpacity>
                                    <Text>{data.commentCount} Comment/s</Text>
                                </TouchableOpacity> : null
                            }
                        </View>
            
                        <HR/>
            
                        <View style={[globalStyle.alignToColumn, {alignItems: 'center', justifyContent: 'space-evenly'}]}>
                            <TouchableOpacity style={globalStyle.alignToColumn}>
                                <EvilIcons name='heart' size={25}/>
                                <Text style={{paddingTop: 2}}>Like</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={globalStyle.alignToColumn}>
                                <EvilIcons name='comment' size={25}/>
                                <Text style={{paddingTop: 2}}>Comment</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
        </>
      )
}

export default SinglePhotoDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        paddingHorizontal: 15,
        height: 90,
    },
    img: {
        width: 350,
        height: '100%'
    },
})