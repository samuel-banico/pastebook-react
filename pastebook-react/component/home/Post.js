import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

const Post = ({navigation}) => {
  return (
    <View style={[globalStyle.colorBackground, styles.container]}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image 
                source={require('../../assets/img/user.png')}
                style={styles.img}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.textContainer}
            onPress={() => navigation.navigate('Create Post')}>
            <Text>What's on your mind?</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 8,
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 10
    },
    textContainer: {
        borderWidth: 1,
        borderRadius: 20,

        justifyContent: 'center',

        paddingVertical: 5,
        paddingLeft: 20,
        marginHorizontal: 10,
        
        flex: 1
    },
    img: {
        width: 30,
        height: 30
    }
})

export default Post