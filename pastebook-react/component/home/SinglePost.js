import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'
import EvilIcons from '@expo/vector-icons/EvilIcons'

const SinglePost = () => {
  return (
    <View>
        <View style={globalStyle.alignToColumn}>
            <Image 
                style={styles.img} 
                source={require('../../assets/img/user.png')}/>
            <View>
                <Text>Name</Text>
                <View style={globalStyle.alignToColumn}>
                    <Text>Hrs</Text>
                    <Text> ▫️ </Text>
                    <Text>Public/Private</Text>
                </View>
            </View>
        </View>

        <Text>POST 2000 characters</Text>

        <View style={globalStyle.alignToColumn}>
            <View style={globalStyle.alignToColumn}>
                <EvilIcons name='heart' size={25}/>
                <Text>#Like</Text>
            </View>
            <View style={globalStyle.alignToColumn}>
                <EvilIcons name='comment' size={25}/>
                <Text>#Comment</Text>
            </View>
        </View>
    </View>
  )
}

export default SinglePost

const styles = StyleSheet.create({
    img: {
        width: 30,
        height: 30,
    }
})