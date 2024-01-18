import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

const ProfileNavigation = ({page}) => {
  return (
    <View style={[globalStyle.alignToColumn, styles.container]}>
        <TouchableOpacity onPress={() => page('posts')}>
            <Text>Posts</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => page('friends')}>
            <Text>Friends</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => page('albums')}>
            <Text>Albums</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ProfileNavigation

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    justifyContent: 'space-around',
  }
})