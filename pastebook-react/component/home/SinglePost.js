import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

import globalStyle from '../../assets/styles/globalStyle'
import EvilIcons from '@expo/vector-icons/EvilIcons'

import HR from '../others/HR'

import { getTokenData } from '../others/LocalStorage'
import { getFeedPostById, userDislikedPost, userLikedPost } from './HomeService'

import Loading from '../others/Loading'

const SinglePost = ({navigation, item}) => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [like, setLike] = useState(false)

    useEffect(() => {
        const fetchData = async() => {
            var token = await getTokenData();

            await getFeedPostById(token, {id: item})
            .then(response => {
                setData(response.data)
                setLike(response.data.hasLiked)
            })
            .catch(error => {
                console.log('ERROR: Single Post')
                console.log(error);
            })

            setLoading(false)
        }

        fetchData()
    }, [like])


    const isLiked = async() => {
        var token = await getTokenData()

        await userLikedPost(token, {id:item})
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log('ERROR: Single Post Like')
            console.log(error)
        })
    }

    const disliked = async() => {
        var token = await getTokenData()

        await userDislikedPost(token, {id:item})
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log('ERROR: Single Post Dislike')
            console.log(error.response)
        })
    }

    const toggleLike = () => {
        !like ? isLiked() : disliked()

        setLike(!like)
    }
    return (
        <>
        {
            loading ? <Loading/> : 
            <View style={[globalStyle.colorBackground, styles.container]}>
                <View style={[globalStyle.alignToColumn, {alignItems: 'center'}]}>
                    <Image 
                        style={styles.img} 
                        source={{uri : data.user.profilePicture}}/>
                    <View style={{paddingLeft: 10}}>
                        <Text>{data.user.fullname}</Text>
                        {
                            data.friend && 
                            <Text>by {data.friend.fullname}</Text>
                        }
                        <View style={globalStyle.alignToColumn}>
                            <Text>{data.createdOn}▫️</Text>
                            <Text>
                                {
                                    data.isPublic ? '🌐' : '🫂' 
                                }
                            </Text>
                        </View>
                    </View>
                </View>

                <Text style={{flex: 1, paddingVertical: 6}}>
                    {data.content}
                </Text>

                <View style={[globalStyle.alignToColumn, {justifyContent: 'space-between'}]}>
                    {
                        data.likeCount > 0 ?
                        <TouchableOpacity onPress={() => navigation.navigate('Post', {data:'like', item: item})}>
                            <Text>❤️ {data.likeCount}</Text>
                        </TouchableOpacity> : <Text> </Text>
                    }
                    {
                        data.commentCount > 0 ?
                        <TouchableOpacity onPress={() => navigation.navigate('Post', {data:'comment', item: item})}>
                            <Text>{data.commentCount} Comments</Text>
                        </TouchableOpacity> : null
                    }
                </View>

                <HR/>

                <View style={[globalStyle.alignToColumn, {alignItems: 'center', justifyContent: 'space-evenly'}]}>
                    <TouchableOpacity  onPress={toggleLike}>
                        {
                            like ? 
                                <View style={globalStyle.alignToColumn}>
                                    <Text style={{fontSize: 15}}>❤️</Text>
                                    <Text style={{paddingTop: 2}}> Like</Text>
                                </View> : 
                                <View style={globalStyle.alignToColumn}>
                                    <EvilIcons name='heart' size={25}/>
                                    <Text style={{paddingTop: 2}}>Like</Text>
                                </View>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={globalStyle.alignToColumn} onPress={() => navigation.navigate('Post', {data:'focus', item: item})}>
                        <EvilIcons name='comment' size={25}/>
                        <Text style={{paddingTop: 2}}>Comment</Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
        </>
        
    )
}

export default SinglePost

const styles = StyleSheet.create({
    container: {
        marginTop: 6,
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    img: {
        width: 30,
        height: 30,
        borderRadius: 15
    }
})