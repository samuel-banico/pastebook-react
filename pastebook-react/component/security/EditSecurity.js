import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, {useState, useEffect} from 'react'

import globalStyle from '../../assets/styles/globalStyle'
import { getTokenData } from '../others/LocalStorage'
import { getUserEmailByToken, updateUserSecurity } from './SecurityService'
import { EmailIsValid, InputEmpty, PasswordIsValid } from '../registration/RegisterValidation'
import Toast from 'react-native-toast-message';

const EditSecurity = ({navigation}) => {
  const [inputState, setInputState] = useState({
    email: {value: null, state: false, style: 'black'},
    password: {value: null, state: false, style: 'black'},
  })
  const [confirmPassword, setConfirmPassword] = useState(null)

  const [email, setEmail] = useState('')

  useEffect(() => {
    const fetchData = async() => {
      var token = await getTokenData();

      await getUserEmailByToken(token)
      .then(response => {
        setEmail(response.data)
      })
      .catch(error => {
        console.log('ERROR: Edit Security, retreiving user email')
        console.log(error)
      })
    }

    fetchData()
  }, [])

  const toggleEditButton = (inputName) => {
    setInputState({
        ...inputState,
        [inputName]: {state: true, style: '#7ed3bb'}
    })
  }

  const onValueChange = (fieldName, value) => {
    setInputState({
      ...inputState,
      [fieldName]: {
        ...inputState[fieldName],
        value: value
      }
    });
  };

  const [showSave, setShowSave] = useState(false);
  useEffect(() => {
      const trueState = Object.values(inputState).some((stateObj) => stateObj.state);

      setShowSave(trueState)
  }, [inputState])

  const changeBorder = (elem, style) => {
    setInputState(prevInput => {
      const updatedInput = { ...prevInput };

      updatedInput[elem] = {
        ...updatedInput[elem],
        style: style
      };
  
      return updatedInput;
    });
  }

  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const emailOnBlur = () => {
    if(InputEmpty(inputState.email.value))
      return true

    if(!EmailIsValid(inputState.email.value)) {
      setEmailErrorMessage('Invalid Email')
      changeBorder('email', 'red');
      return false
    } 
    
    changeBorder('email', 'black')
    setEmailErrorMessage('')
    return true;
  }

  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const passwordOnBlur = () => {
    if(InputEmpty(inputState.password.value))
      return true

    const errorMessage = PasswordIsValid(inputState.password.value);
    if(errorMessage != '') {
      setPasswordErrorMessage(errorMessage)
      changeBorder('password', 'red');
      return false
    } 

    setPasswordErrorMessage('')
    changeBorder('password', 'black');
    return true
  }

  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('')
  const comparePasswords = (value) => {
    if(value === inputState.password.value)
      setConfirmPasswordErrorMessage('')
    else 
      setConfirmPasswordErrorMessage('Passwords do not match')

    setConfirmPassword(value)
  }

  const checkPassword = () => {
    if(confirmPassword === inputState.password.value)
      return true

    return false
  }

  const updateProfile = async(data) => {
    var token = await getTokenData()

    await updateUserSecurity(token, data)
    .then(response => {
      console.log(response.data)
      Toast.show({type: 'success', text1: 'Update Successful', text2: 'Security Profile has been updated'})
      navigation.goBack()
    })
    .catch(error => {
      if(error.response && error.response.data.result === 'email_taken')
        Toast.show({type: 'error', text1: 'Email Taken', text2: 'Email is already taken, kindly choose another email'})
      else {
        console.log('ERROR: Edit Security, updating profile')
        console.log(error)
      }
    })
  }

  const onClickSave = () => {
    if(emailOnBlur() && passwordOnBlur() && checkPassword()) {
      const dataToPass = {
        email : '',
        password : ''
      }

      if(!InputEmpty(inputState.email.value))
        dataToPass.email = inputState.email.value

      if(!InputEmpty(inputState.password.value))
        dataToPass.password = inputState.password.value

      updateProfile(dataToPass)
    }
  }

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
      <TextInput editable={inputState.email.state} 
        style={[{borderColor: inputState.email.style},styles.textContainer]} 
        placeholder={email}
        value={inputState.email.value}
        onChangeText={(e) => onValueChange('email', e)}
        onBlur={emailOnBlur}/>
        {
          emailErrorMessage === '' ? null :
          <Text>{emailErrorMessage}</Text>
        }
      {
        !inputState.password.state && (
          <View>
            <View style={[globalStyle.alignToColumn, styles.detailContainer]}>
            <Text>Password: </Text>
            <TouchableOpacity onPress={() => toggleEditButton('password')}>
              <Text>Edit</Text>
            </TouchableOpacity>
          </View>
          <TextInput editable={false} 
            style={[styles.textContainer]} 
            placeholder='********'/>
          </View>
        )
      }

      {
        inputState.password.state && (
          <View>
            <Text>New Password: </Text>
            <TextInput style={[{borderColor: inputState.password.style}, styles.textContainer]} 
              placeholder='Password'
              value={inputState.password.value}
              onChangeText={(e) => onValueChange('password', e)}
              onBlur={passwordOnBlur}/>
              {
                passwordErrorMessage === '' ? null :
                <Text>{passwordErrorMessage}</Text>
              }
            <Text>Confirm New Password: </Text>
            <TextInput style={[{borderColor: inputState.password.style}, styles.textContainer]} 
              placeholder='Confirm Password'
              value={confirmPassword}
              onChangeText={(e) => comparePasswords(e)}/>
              {
                confirmPasswordErrorMessage === '' ? null :
                <Text>{confirmPasswordErrorMessage}</Text>
              }
          </View>
        )
      }

      {
          showSave && 
          <TouchableOpacity onPress={onClickSave} style={[globalStyle.colorSecondaryBG, styles.saveContainer]}>
              <Text>Save Changes</Text>
          </TouchableOpacity>
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