import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

const SingleNotif = () => {
  return (
    <View style={globalStyle.alignToColumn}>
      <Image 
        source={require('../../assets/img/user.png')}
        style={styles.img}
        />
        <View>
            <View style={styles.alignToColumn}>
                <Text>Name</Text>
                <Text>Time</Text>
            </View>
            <Text>Label</Text>
        </View>
    </View>
  )
}

export default SingleNotif

const styles = StyleSheet.create({
    img: {
        width: 50,
        height: 50
    },
    alignToColumn: {
        flexDirection: 'row'
    }
})