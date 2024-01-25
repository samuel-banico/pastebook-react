import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import globalStyle from '../../assets/styles/globalStyle'
import EvilIcons from '@expo/vector-icons/EvilIcons'

import HR from '../others/HR'

const SinglePost = ({navigation, key, item}) => {

    const [like, setLike] = useState(false)

    const toggleLike = () => setLike(!like)
    return (
        <View style={[globalStyle.colorBackground, styles.container]}>
            <View style={[globalStyle.alignToColumn, {alignItems: 'center'}]}>
                <Image 
                    style={styles.img} 
                    source={{uri : item.user.profilePicture}}/>
                <View style={{paddingLeft: 10}}>
                    <Text>{item.user.fullname}</Text>
                    {
                        item.friend && 
                        <Text>by {item.friend.fullname}</Text>
                    }
                    <View style={globalStyle.alignToColumn}>
                        <Text>{item.createdOn}▫️</Text>
                        <Text>
                            {
                                item.isPublic ? '🌐' : '🫂' 
                            }
                        </Text>
                    </View>
                </View>
            </View>

            <Text style={{flex: 1, paddingVertical: 6}}>
                {item.content}
            </Text>

            <View style={[globalStyle.alignToColumn, {justifyContent: 'space-between'}]}>
                {
                    item.likeCount > 0 ?
                    <TouchableOpacity onPress={() => navigation.navigate('Post', {data:'like'})}>
                        <Text>❤️ {item.likeCount}</Text>
                    </TouchableOpacity> : null
                }
                {
                    item.commentCount > 0 ?
                    <TouchableOpacity onPress={() => navigation.navigate('Post', {data:'comment'})}>
                        <Text>{item.commentCount} Comments</Text>
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
                <TouchableOpacity style={globalStyle.alignToColumn} onPress={() => navigation.navigate('Post', {data:'focus'})}>
                    <EvilIcons name='comment' size={25}/>
                    <Text style={{paddingTop: 2}}>Comment</Text>
                </TouchableOpacity>
            </View>
        </View>
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