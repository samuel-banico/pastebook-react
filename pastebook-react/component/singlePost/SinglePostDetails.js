import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import globalStyle from '../../assets/styles/globalStyle'
import EvilIcons from '@expo/vector-icons/EvilIcons'

import HR from '../others/HR'
import Loading from '../others/Loading'
import { getFeedPostById, userDislikedPost, userLikedPost } from '../home/HomeService'
import { getTokenData } from '../others/LocalStorage'

const SinglePostDetails = ({navigate, postId, refresh}) => {

    const [data, setData] = useState({})
    const [like, setLike] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async() => {
            var token = await getTokenData();

            await getFeedPostById(token, {id: postId})
            .then(response => {
                setData(response.data)
                setLike(response.data.hasLiked)
                setLoading(false)
            })
            .catch(error => {
                console.log("ERROR: Single Post Details, retrieval of Post Details")
                console.log(error)
            })
        }

        fetchData();
    }, [like, refresh])

    const isLiked = async() => {
        var token = await getTokenData()

        await userLikedPost(token, {id:postId})
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log('ERROR: Single Post Details, Like')
            console.log(error)
        })
    }

    const disliked = async() => {
        var token = await getTokenData()

        await userDislikedPost(token, {id:postId})
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log('ERROR: Single Post Details, Dislike')
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
                            source={{uri: data.user.profilePicture}}/>
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
                            <TouchableOpacity onPress={() => navigate('like')}>
                                <Text>❤️ {data.likeCount}</Text>
                            </TouchableOpacity> : <Text> </Text>
                        }

                        {
                            data.commentCount > 0 ?
                            <TouchableOpacity onPress={() => navigate('comment')}>
                                <Text>{data.commentCount} Comment/s</Text>
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
                        <TouchableOpacity style={globalStyle.alignToColumn} onPress={() => navigate('focus')}>
                            <EvilIcons name='comment' size={25}/>
                            <Text style={{paddingTop: 2}}>Comment</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </>
    )
}

export default SinglePostDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
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