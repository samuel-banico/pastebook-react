import { View, Text, ScrollView, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import globalStyle from '../../assets/styles/globalStyle'
import { Picker } from '@react-native-picker/picker';


const CreateYourPost = () => {

  const [shareOption, setShareOption] = useState('public')

  return (
    <ScrollView contentContainerStyle={[globalStyle.colorBackground, styles.container]}>
      <View style={[styles.alignToColumn, {alignItems: 'center'}]}>
        <Image 
            source={require('../../assets/img/user.png')}
            style={styles.img}
        />
        <View style={[{justifyContent: 'center', marginLeft: 5}]}>
          <Text multiline={true}>FirstName LastName</Text>
          {/* If posting to friend */}
          <Text>To Friend</Text>
        </View>
      </View>
      
      <View style={{flex: 1}}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder= "What's on your mind?"/>
      </View>
      
      <View style={[globalStyle.alignToColumn, styles.optionsContainer]}>
        <Picker
              style={[globalStyle.textInputBox, {width: 160}]}
              selectedValue={shareOption}
              onValueChange={(itemValue, itemIndex) =>
                setShareOption(itemValue)
              }>
              <Picker.Item label="🌐 Public" value='public'/>
              <Picker.Item label="🫂 Friends" value="friends" />
            </Picker>
        <TouchableOpacity style={[styles.button]}>
          <Text>Post</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      paddingHorizontal: 10,
      flex: 1
    },
    optionsContainer: {
      alignItems: 'center', 
      justifyContent: 'space-between'
    },
    img: {
      height: 50,
      width: 50,
      borderRadius: 25
    },
    button: {

      marginRight: 25
    },
    alignToColumn: {
      flexDirection: 'row',
      alignItems: 'center'
  },

})

export default CreateYourPost