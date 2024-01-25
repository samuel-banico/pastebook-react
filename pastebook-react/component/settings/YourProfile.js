import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

const YourProfile = ({navigation, data}) => {
  return (
    <View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={[globalStyle.alignToColumn, styles.container]}>
            <Image
            style={styles.img} 
            source={{uri: data.profilePicture}}/>
            <View>
                <Text>{data.fullname}</Text>
                <Text>See your profile</Text>
            </View>
        </TouchableOpacity>
    </View>
  )
}

export default YourProfile

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 3,
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    img: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10 
    }
})