import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const SingleFriend = () => {
  return (
    <View style={styles.container}>
        <TouchableOpacity>
            <Image 
                source={require('../../assets/img/user.png')}
                style={styles.img}/>
            <Text numberOfLines={3} style={{paddingLeft: 5}}>FirstName LastName</Text>
        </TouchableOpacity>
    </View>
  )
}

export default SingleFriend

const styles = StyleSheet.create({
    container: {
        width: 100,
        paddingBottom: 10
    },
    img: {
        width: 90,
        height: 90,
        borderRadius: 20
    }
})