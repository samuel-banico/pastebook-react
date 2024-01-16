import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

const Profile = () => {
  return (
    <View>
        <View style={styles.container}>
            <Image 
            style={styles.img} 
            source={require('../../assets/img/user.png')}/>

            <Text>Name</Text>
            <Text>BIO</Text>
            <TouchableOpacity>
                <Text>✏️ Edit Profile</Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text>DETAILS</Text>
            <View style={globalStyle.alignToColumn}>
                <Text>Birthday</Text>
                <Text>##-##-####</Text>
            </View>

            <View style={globalStyle.alignToColumn}>
                <Text>Gender</Text>
                <Text>-----</Text>
            </View>

            <View style={globalStyle.alignToColumn}>
                <Text>Mobile Number</Text>
                <Text>09#########</Text>
            </View>
        </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    img: {
        width: 100,
        height: 100,
    }
})