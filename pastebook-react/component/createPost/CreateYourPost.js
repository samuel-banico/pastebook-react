import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import globalStyle from '../../assets/styles/globalStyle'
import { Picker } from '@react-native-picker/picker';


const CreateYourPost = () => {

  const [shareOption, setShareOption] = useState('public')

  return (
    <ScrollView contentContainerStyle={[globalStyle.colorBackground, styles.container]}>
      <View style={styles.alignToColumn}>
        <Image 
            source={require('../../assets/img/user.png')}
            style={styles.img}
        />
        <View>
          <Text>Name</Text>
          <View>
              <Picker
                style={[globalStyle.textInputBox, {width: 150}]}
                selectedValue={shareOption}
                onValueChange={(itemValue, itemIndex) =>
                  setShareOption(itemValue)
                }>
                <Picker.Item label="🌐 Public" value='public'/>
                <Picker.Item label="🫂 Friends" value="friends" />
              </Picker>
            </View>
        </View>
      </View>
      
      <TextInput
        multiline={true}
        numberOfLines={4}
        placeholder= "What's on your mind?"/>

      <TouchableOpacity>
        <Text>Post</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      paddingHorizontal: 10,
      flex: 1
    },
    img: {
      height: 30,
      width: 30
    },
    alignToColumn: {
      flexDirection: 'row',
      alignItems: 'center'
  },

})

export default CreateYourPost