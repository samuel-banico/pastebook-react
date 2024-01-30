import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';

import SinglePostDetails from './SinglePostDetails'
import AllComments from './AllComments'
import AllLikes from './AllLikes'
import CreateComment from './CreateComment';

import HR from '../others/HR'
import globalStyle from '../../assets/styles/globalStyle'

const SinglePost = ({selection, data, navigation}) => {
    const [postNavigation, setPostNavigation] = useState(selection)

    const [commentCreated, setCommentCreated] = useState(false)

    const commentRefresh = () => setCommentCreated(!commentCreated)

    const navigatePost = (value) => {
        setPostNavigation(value)
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <SinglePostDetails navigate={navigatePost} postId={data} refresh={commentCreated}/>
                {
                    postNavigation === 'none' ? <View/> :
                    postNavigation === 'like' ? 
                    <View style={styles.likeContainer}> 
                        <View style={{backgroundColor: 'white', padding: 5}}/>
                        <AllLikes navigation={navigation} postId={data}/>
                    </View> : 
                    <View style={[styles.commentContainer, globalStyle.colorBackground]}>
                        <View style={{backgroundColor: 'white', padding: 5}}/>
                        <CreateComment postNavigation={postNavigation} postId={data} refresh={commentRefresh}/>
                        <AllComments navigation={navigation} postId={data} refresh={commentCreated}/>
                    </View>
                }
            </ScrollView>
        </View>
    )
}

export default SinglePost

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
    likeContainer: {
        flex: 1
    },
    commentContainer: {
        flex: 1,
    }
})