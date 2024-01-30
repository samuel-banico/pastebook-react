import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { InputEmpty } from '../registration/RegisterValidation'

import { userCommentedOnPost } from './SinglePostService'
import {getTokenData} from '../others/LocalStorage'
import globalStyle from '../../assets/styles/globalStyle'

const CreateComment = ({postNavigation, postId, refresh}) => {
    const [value, setValue] = useState('')

    const sendComment = async() => {
        var token = await getTokenData();

        await userCommentedOnPost(token, {postId: postId, comment: value})
        .then(response => {
            setValue('')
            refresh()
        })
        .catch(error => {
            console.log('ERROR: Create Comment')
            console.log(error)
        })
    }

    return (
        <View style={[globalStyle.alignToColumn, styles.container]}>
            <TextInput style={styles.textContainer} 
                autoFocus={postNavigation === 'focus'} 
                placeholder='Write a comment...'
                value={value}
                onChangeText={(e) => setValue(e)}/>
            {
                InputEmpty(value) ? null :
                <TouchableOpacity style={{paddingLeft: 10}} onPress={sendComment}>
                    <MaterialCommunityIcons name='send-circle' size={30}/>
                </TouchableOpacity>
            }
        </View>
    )
}

export default CreateComment

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15,
        marginVertical: 10
    },
    textContainer: {
        borderWidth: 1,
        borderRadius: 20,
        flex: 1,

        justifyContent: 'center',

        paddingVertical: 5,
        paddingLeft: 20,
    },
})