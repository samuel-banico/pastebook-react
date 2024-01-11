import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const Post = ({navigation}) => {
  return (
    <View style={styles.postContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image 
                source={require('../../assets/user.png')}
                style={styles.img}
            />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
            <View>
                <Text>What's on your mind?</Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    postContainer: {
        backgroundColor: 'white',
        marginVertical: 5,
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    img: {
        width: 30,
        height: 30
    }
})

export default Post