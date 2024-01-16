import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

const Post = ({navigation}) => {
  return (
    <View style={[globalStyle.colorBackground, styles.postContainer]}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image 
                source={require('../../assets/img/user.png')}
                style={styles.img}
            />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CreatePost')}>
            <Text>What's on your mind?</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    postContainer: {
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