import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import globalStyle from '../../assets/styles/globalStyle'

const AllLikes = () => {
  const data = ['FirstName1 LastName1', 'FirstName2 LastName2', 'FirstName3 LastName3', 'FirstName4 LastName4']
  return (
    <View style={[styles.container, globalStyle.colorBackground]}>
      <ScrollView>
        <Text style={[globalStyle.textTitle]}>❤️ People who reacted</Text>
        {
          data.map((item, index) => (
            <View style={[styles.likeContainer, globalStyle.alignToColumn]}>
              <Image style={styles.img} source={require('../../assets/img/user.png')}/>
              <Text key={index}>{item}</Text>
            </View>
          ))
        }
      </ScrollView>
    </View>
  )
}

export default AllLikes

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5
  },
  likeContainer: {
    marginTop: 8,
  }
})