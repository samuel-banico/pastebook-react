import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useState, useEffect} from 'react'

import globalStyle from '../../assets/styles/globalStyle'

const EditSecurity = () => {
  const [inputState, setInputState] = useState({
    email: {state: false, style: 'black'},
    password: {state: false, style: 'black'},
  })

  const toggleEditButton = (inputName) => {
    setInputState({
        ...inputState,
        [inputName]: {state: true, style: '#7ed3bb'}
    })
  }

  const [showSave, setShowSave] = useState(false);

    useEffect(() => {
        const trueState = Object.values(inputState).some((stateObj) => stateObj.state);

        setShowSave(trueState)
    }, [inputState])

  return (
    <View style={[styles.container]}>
      <Text style={globalStyle.textTitle}>Change Privacy</Text>

      <View style={[globalStyle.alignToColumn, styles.detailContainer]}>
        <Text>Email: </Text>
        {
          !inputState.email.state && (
            <TouchableOpacity onPress={() => toggleEditButton('email')}>
              <Text>Edit</Text>
            </TouchableOpacity>
          )
        }
      </View>
      <TextInput editable={inputState.email.state} style={[{borderColor: inputState.email.style},styles.textContainer]} placeholder='Email'/>

      {
        !inputState.password.state && (
          <View>
            <View style={[globalStyle.alignToColumn, styles.detailContainer]}>
            <Text>Password: </Text>
            <TouchableOpacity onPress={() => toggleEditButton('password')}>
              <Text>Edit</Text>
            </TouchableOpacity>
          </View>
          <TextInput editable={false} style={styles.textContainer} placeholder='Password'/>
          </View>
        )
      }

      {
        inputState.password.state && (
          <View>
            <Text>New Password: </Text>
            <TextInput style={[{borderColor: inputState.password.style}, styles.textContainer]} placeholder='Password'/>
            <Text>Confirm New Password: </Text>
            <TextInput style={[{borderColor: inputState.password.style}, styles.textContainer]} placeholder='Confirm Password'/>
          </View>
        )
      }

      {
          showSave && (<TouchableOpacity style={[globalStyle.colorSecondaryBG, styles.saveContainer]}>
              <Text>Save Changes</Text>
          </TouchableOpacity>)
      }
    </View>
  )
}

export default EditSecurity

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingHorizontal: 15
  },
  titleContainer: {
    marginBottom: 10,
  },
  detailContainer: {
    justifyContent: 'space-between',
    marginTop: 5
  },
  textContainer: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginVertical: 5
  },
  saveContainer: {
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 2,
  },
})