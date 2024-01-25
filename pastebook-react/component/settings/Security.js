import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'

import globalStyle from '../../assets/styles/globalStyle'

const Security = ({navigation}) => {
  return (
    <View>
        <TouchableOpacity 
          style={[globalStyle.colorSecondaryBG, styles.container]}
          onPress={() => navigation.navigate('Security')}>
            <Text style={styles.textContainer}>Security</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Security

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    paddingVertical: 3,
    marginHorizontal: 15,
    marginTop: 10,
    alignItems: 'center'
  },
  textContainer: {
    fontWeight: '600',
  }
})