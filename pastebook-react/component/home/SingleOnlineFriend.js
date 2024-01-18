import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SingleOnlineFriend = () => {
  return (
    <View styles={styles.container}>
        <Image  
            style={styles.img} 
            source={require('../../assets/img/user.png')}/>
        <View style={{width: 80}}>
            <Text numberOfLines={3}>FirstName LastName</Text>
        </View>
    </View>
  )
}

export default SingleOnlineFriend

const styles = StyleSheet.create({
    container: {
        width: 90,
        height: 100,
        justifyContent: 'center',
        flex: 1,
    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    text: {
        flex: 1
    }
})