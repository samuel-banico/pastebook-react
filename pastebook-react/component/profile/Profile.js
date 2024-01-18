import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import HR from '../others/HR'

const Profile = ({navigation}) => {
  return (
    <View style={[styles.container]}>
        <View style={styles.bioContainer}>
            <Image 
            style={styles.img} 
            source={require('../../assets/img/user.png')}/>

            <Text>Name</Text>
            <Text>BIO</Text>
        </View>

        <HR/>
        
        <View style={[globalStyle.alignToColumn, styles.detailsContainer]}>
            <View>
                <View>
                    <Text style={[styles.detailsText, globalStyle.colorPimaryText]}>Birthday: </Text>
                    <Text>##-##-####</Text>
                </View>

                <View>
                    <Text style={[styles.detailsText, globalStyle.colorPimaryText]}>Gender: </Text>
                    <Text>-----</Text>
                </View>

                <View>
                    <Text style={[styles.detailsText, globalStyle.colorPimaryText]}>Mobile Number: </Text>
                    <Text>09#########</Text>
                </View>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Edit Profile')}>
                <Text>✏️ Edit Profile</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    bioContainer: {
        alignItems: 'center'
    },
    detailsContainer: {
        justifyContent: 'space-between'
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50
    },
    detailsText: {
        fontSize: 14,
        fontWeight: '600'
    }
})