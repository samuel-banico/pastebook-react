import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

const SingleNotif = () => {
  return (
    <View style={[globalStyle.alignToColumn, styles.container]}>
      <Image 
        source={require('../../assets/img/user.png')}
        style={styles.img}
        />
        <View style={[styles.textContainer]}>
            <View style={[styles.alignToColumn, {alignItems: 'center'}]}>
                <Text style={styles.nameStyle}>Name </Text>
                <Text>Description</Text>
            </View>
            <Text style={styles.timeStyle}>Time</Text>
        </View>
    </View>
  )
}

export default SingleNotif

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  img: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10
  },
  alignToColumn: {
      flexDirection: 'row'
  },
  nameStyle: {
    fontWeight: '600',
    fontSize: 16
  },
  timeStyle: {
    fontWeight: '400',
    fontSize: 12
  }
})