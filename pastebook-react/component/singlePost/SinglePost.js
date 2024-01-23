import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';

import SinglePostDetails from './SinglePostDetails'
import AllComments from './AllComments'
import AllLikes from './AllLikes'

import HR from '../others/HR'
import globalStyle from '../../assets/styles/globalStyle'

const SinglePost = ({navigationFromFeed}) => {
    const route = useRoute();
    const receivedData = route.params?.data || {};

    const [postNavigation, setPostNavigation] = useState(receivedData)

    const navigatePost = (value) => {
        console.log(receivedData);
        setPostNavigation(value)
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <SinglePostDetails navigate={navigatePost}/>
                {
                    postNavigation === 'none' ? <View/> :
                    postNavigation === 'like' ? 
                    <View style={styles.likeContainer}> 
                        <View style={{backgroundColor: 'white', padding: 5}}/>
                        <AllLikes/>
                    </View> : 
                    <View style={[styles.commentContainer, globalStyle.colorBackground]}>
                        <View style={{backgroundColor: 'white', padding: 5}}/>
                        <TextInput style={styles.textContainer} 
                            autoFocus={postNavigation === 'focus'} 
                            placeholder='Write a comment...'/>
                        <AllComments/>
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
    textContainer: {
        borderWidth: 1,
        borderRadius: 20,

        justifyContent: 'center',

        paddingVertical: 5,
        paddingLeft: 20,
        marginHorizontal: 15,
        marginVertical: 10
    }, 
    likeContainer: {
        flex: 1
    },
    commentContainer: {
        flex: 1,
    }
})