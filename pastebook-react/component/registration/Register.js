import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, ScrollView, Animated, Easing } from 'react-native'
import React, {useState, useRef} from 'react'

import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker';

import globalStyle from '../../assets/styles/globalStyle'
import HR from '../others/HR'

import { InputValidation, InputEmpty, PasswordIsValid, EmailIsValid, MobileNumberIsValid } from './RegisterValidation';

const Register = ({navigation}) => {

  const [formData, setFormData] = useState({
    firstName: { value: '', style: 'gray', shakeAnimation: useRef(new Animated.Value(0)).current},
    lastName: { value: '', style: 'gray', shakeAnimation: useRef(new Animated.Value(0)).current},
    email: { value: '', style: 'gray', shakeAnimation: useRef(new Animated.Value(0)).current},
    mobileNumber: { value: '', style: 'gray', shakeAnimation: useRef(new Animated.Value(0)).current},
    password: { value: '', style: 'gray', shakeAnimation: useRef(new Animated.Value(0)).current},
    birthday: { value: '', style: 'gray', shakeAnimation: useRef(new Animated.Value(0)).current},
    gender: { value: '', style: 'gray', shakeAnimation: useRef(new Animated.Value(0)).current},
  });

  const handleChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: {
        ...formData[fieldName],
        value: value
      }
    });
  };

  const borderChange = (formData, elem, style) => {
    formData[elem] = {
      ...formData[elem],
      style: style
    };
  };

  const missingFieldsAnimation = (emptyArray) => {
    emptyArray.forEach((key) => {
      const shakeAnimation = formData[key].shakeAnimation;
      shakeAnimation.setValue(0);

      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: 10, duration: 100, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 100, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 100, easing: Easing.linear, useNativeDriver: true }),
      ]).start();
    });
  }

  const handleEmptyFieldsOnSubmit = (emptyArray) => {
    missingFieldsAnimation(emptyArray);

    setFormData(prevInput => {
      const updatedInput = { ...prevInput };
  
      Object.keys(updatedInput).forEach((key) => {
        if (emptyArray.includes(key)) {
          borderChange(updatedInput, key, 'red');
        } else {
          borderChange(updatedInput, key, 'gray');
        }
      });
  
      return updatedInput;
    });
  };

  const emptyInputOnBlur = (emptyArray) => {
    missingFieldsAnimation(emptyArray);

    setFormData(prevInput => {
      const updatedInput = { ...prevInput };
  
      Object.keys(updatedInput).forEach((key) => {
        if (emptyArray.includes(key)) {
          borderChange(updatedInput, key, 'red');
        }
      });
  
      return updatedInput;
    });
  }

  const hasValueOnBlur = (elem) => {
    setFormData({
      ...formData,
      [elem]: {
        ...formData[elem],
        style: 'gray'
      }
    });
  }

  const firstNameOnBlur = () => {
    if(InputEmpty(formData.firstName.value))
      return emptyInputOnBlur(['firstName']);

    hasValueOnBlur('firstName')
  }

  const lastNameOnBlur = () => {
    if(InputEmpty(formData.lastName.value))
      return emptyInputOnBlur(['lastName']);

    hasValueOnBlur('lastName')
  }

  const [emailErrorMessage, setEmailErrorMessage] = useState('')
  const emailOnBlur = () => {
    if(InputEmpty(formData.email.value))
      return emptyInputOnBlur(['email']);

    if(!EmailIsValid(formData.email.value)) {
      setEmailErrorMessage('Invalid Email')
      return emptyInputOnBlur(['email']);
    } else {
      setEmailErrorMessage('')
    }

    hasValueOnBlur('email')
  }

  const [passwordErrorMessage, setPasswordErrorMessage] = useState('')
  const passwordOnBlur = () => {
    if(InputEmpty(formData.password.value))
      return emptyInputOnBlur(['password']);

    const errorMessage = PasswordIsValid(formData.password.value);
    if(errorMessage != '') {
      setPasswordErrorMessage(errorMessage)
      return emptyInputOnBlur(['password']);
    } else {
      setPasswordErrorMessage('')
    }
    hasValueOnBlur('password')
  }

  const [mobileNumberErrorMessage, setMobileNumberErrorMessage] = useState('')
  const mobileNumberOnBlur = () => {
    if(InputEmpty(formData.mobileNumber.value))
      return emptyInputOnBlur(['mobileNumber']);

    if(!MobileNumberIsValid(formData.mobileNumber.value)) {
      setMobileNumberErrorMessage('Invalid PH Phone Number')
      return emptyInputOnBlur(['mobileNumber']);
    } else {
      setMobileNumberErrorMessage('')
    }

    hasValueOnBlur('mobileNumber')
  }

  const genderOnBlur = () => {
    if(InputEmpty(formData.gender.value))
      return emptyInputOnBlur(['gender']);

    hasValueOnBlur('gender')
  }

  // Submitted
  const submitForm = () => {
    var emptyArray = InputValidation(formData);

    if(emptyArray.length > 0) {
      handleEmptyFieldsOnSubmit(emptyArray);
    } else {
      
      navigation.navigate('Home');
    }
  }

  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSame, setPasswordSame] = useState(true);

  // GENDER
  const [gender, setGender] = useState('');

  // BIRTHDAY
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  }

  const onChange = ({ type }, selectedDate) => {
    if(type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      toggleDatePicker();
      handleChange('birthday', formatDate(currentDate))
    } else {
      toggleDatePicker();
    }

    if(InputEmpty(formData.birthday.value)) {
      emptyInputOnBlur(['birthday']);
    } else {
      hasValueOnBlur('birthday')
    }
  }

  const formatDate = (rawDate) => {
    let date = new Date(rawDate)
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month
    day = day < 10 ? `0${day}` : day
    return `${day}-${month}-${year}`
  }

  return (
    <ScrollView contentContainerStyle={[styles.container, globalStyle.colorBackground]}>
        <View style={[globalStyle.colorBoxBG, styles.box]}>
          <View style={styles.alignToColumn}>
            {/* FIRST NAME */}
            <Animated.View 
              style={{ transform: [{ translateX: formData.firstName.value === '' ? formData.firstName.shakeAnimation : 0 }] }}>
              <TextInput 
                placeholder='First Name' 
                style={[globalStyle.textInputBox, {width: 135, borderColor: formData.firstName.style}]}
                value={formData.firstName.value} 
                onChangeText={(e) => handleChange('firstName', e)}
                onBlur={firstNameOnBlur}/>
            </Animated.View>

            <View style={{padding:5}}/>
            {/* LAST NAME */}
            <Animated.View 
              style={{ transform: [{ translateX: formData.lastName.value === '' ? formData.lastName.shakeAnimation : 0 }] }}>
              <TextInput 
                placeholder='Last Name' 
                style={[globalStyle.textInputBox, {width: 135, borderColor: formData.lastName.style}]}
                value={formData.lastName.value} 
                onChangeText={(e) => handleChange('lastName', e)}
                onBlur={lastNameOnBlur}/>
            </Animated.View>
          </View>

          {/* EMAIL */}
          <Animated.View style={{ transform: [{ translateX: formData.email.value === '' ? formData.email.shakeAnimation : 0 }] }}>
            <TextInput 
              placeholder='Email' 
              style={[globalStyle.textInputBox, {borderColor: formData.email.style}]}
              value={formData.email.value} 
              onChangeText={(e) => handleChange('email', e)}
              onBlur={emailOnBlur}/>
          </Animated.View>
          {
            emailErrorMessage && (
              <Text>{emailErrorMessage}</Text>
            )
          }

          {/* Mobile Number */}
          <Animated.View style={{ transform: [{ translateX: formData.mobileNumber.value === '' ? formData.mobileNumber.shakeAnimation : 0 }] }}>
            <TextInput 
              placeholder='Mobile Number' 
              style={[globalStyle.textInputBox, {borderColor: formData.mobileNumber.style}]}
              value={formData.mobileNumber.value} 
              onChangeText={(e) => handleChange('mobileNumber', e)}
              onBlur={mobileNumberOnBlur}/>
          </Animated.View>
          {
            mobileNumberErrorMessage && (
              <Text>{mobileNumberErrorMessage}</Text>
            )
          }

          <HR/>
          <Animated.View style={{ transform: [{ translateX: !(formData.password.value) ? formData.password.shakeAnimation : 0 }] }}>
            <TextInput 
              placeholder='Password' 
              style={[globalStyle.textInputBox, {borderColor: formData.password.style}]}
              value={formData.password.value} 
              onChangeText={(e) => handleChange('password', e)}
              onBlur={passwordOnBlur}/>
            {
              (formData.password.value).trim === '' && (
                <TextInput 
                  placeholder='Confirm Password' 
                  style={[globalStyle.textInputBox, {borderColor: formData.password.style}]}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}/>
              )
            }
          </Animated.View>
          {
            passwordErrorMessage && (
              <Text>{passwordErrorMessage}</Text>
            )
          }
          
          <HR/>

          <View>
              <Animated.View style={{ transform: [{ translateX: formData.birthday.value === '' ? formData.birthday.shakeAnimation : 0 }] }}>
                <View style={[globalStyle.textInputBox, {borderColor: formData.birthday.style}]}>
                  {showPicker && (
                    <DateTimePicker
                      mode='date'
                      display='calendar'
                      value={date}
                      onChange={onChange}
                      maximumDate={new Date()}
                      minimumDate={new Date('1924-01-01')}
                    />
                  )}
                  <TouchableOpacity onPress={toggleDatePicker}>
                    <TextInput 
                      placeholder='1-01-1990'
                      value={formData.birthday.value}
                      onChangeText={(e) => handleChange('birthday', e)}
                      editable={false}
                    />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </View>
            
            <View>
              <Animated.View style={{ transform: [{ translateX: formData.gender.value === '' ? formData.gender.shakeAnimation : 0 }] }}>
                <View style={[globalStyle.textInputBox, {borderColor: formData.gender.style}]}>
                  <Picker
                    selectedValue={gender}
                    onValueChange={(itemValue, itemIndex) => {
                      setGender(itemValue)
                      handleChange('gender', itemValue)}
                    }
                    onBlur={genderOnBlur}>
                    <Picker.Item label="Gender" value='' enabled={false}/>
                    <Picker.Item label="Male" value="0" />
                    <Picker.Item label="Female" value="1"/>
                    <Picker.Item label="Others" value="2"/>
                  </Picker>
                </View>
              </Animated.View>
            </View>
            
          <TouchableOpacity onPress={submitForm} style={[styles.registerButton, globalStyle.colorSecondaryBG]}>
            <Text>Sign-Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10
  },
  alignToColumn: {
      flexDirection: 'row',
      alignItems: 'center'
  },
  textInputContainer: {
    width: 100,
    height: 100,
    borderWidth: 2, // Border width in pixels
    borderColor: 'blue', // Border color
    borderRadius: 10, // Border radius to create rounded corners
  },
  registerButton: {
    padding: 5,
    height: 30,
    borderRadius: 5,
  }
})