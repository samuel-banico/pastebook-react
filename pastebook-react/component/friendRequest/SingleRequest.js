import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'

const SingleRequest = () => {
  return (
    <View style={styles.alignToColumn}>
        <Image 
            source={require('../../assets/img/user.png')}
            style={styles.img}
        />
        <View>
            <View style={styles.alignToColumn}>
                <Text>Name</Text>
                <Text>Date Requested</Text>
            </View>
            <Text>Mutual Friends</Text>
            <View style={styles.alignToColumn}>
                <TouchableOpacity>
                    <Text>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default SingleRequest

const styles = StyleSheet.create({
    img: {
        width: 50,
        height: 50
    },
    alignToColumn: {
        flexDirection: 'row'
    }
})