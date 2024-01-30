import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import EditProfile from '../../component/editProfile/EditProfile'

const EditProfileScreen = ({navigation}) => {
  return (
    <View style={styles.container} >
      <EditProfile navigation={navigation}/>
    </View>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})