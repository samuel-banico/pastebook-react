import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, {useState} from 'react'

import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker';

import globalStyle from '../../assets/styles/globalStyle'
import HR from '../others/HR'

const Register = ({navigation}) => {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    password: '',
    birthday: '',
    gender: '',
  });

  const handleChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  // Submitted
const handleSubmit = () => {
  console.log('Form Data:', formData);
}

  const [confirmPassword, setConfirmPassword] = useState('');

  // GENDER
  const [gender, setGender] = useState('');
  const [selectedValue, setSelectedValue] = useState('');

  // BIRTHDAY
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [birthday, setBirthday] = useState("");

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
            <TextInput placeholder='First Name' style={[globalStyle.textInputBox, {width: 135}]}
              value={formData.firstName} onChangeText={(e) => handleChange('firstName', e)}
            />
            <View style={{padding:5}}/>
            <TextInput placeholder='Last Name' style={[globalStyle.textInputBox, {width: 135}]}
              value={formData.lastName} onChangeText={(e) => handleChange('lastName', e)}
            />
          </View>
          <TextInput placeholder='Email' style={globalStyle.textInputBox}
              value={formData.email} onChangeText={(e) => handleChange('email', e)}
          />
          <TextInput placeholder='Mobile Number' style={globalStyle.textInputBox}
              value={formData.mobileNumber} onChangeText={(e) => handleChange('mobileNumber', e)}
          />

          <HR/>
          <TextInput placeholder='Password' style={globalStyle.textInputBox}
            value={formData.password} onChangeText={(e) => handleChange('password', e)}
          />
          <TextInput placeholder='Confirm Password' style={globalStyle.textInputBox}
            onChangeText={setConfirmPassword}
          />
          <HR/>

          <View style={styles.alignToColumn}>
            <View>
              <Text>Birthday: </Text>
              <View style={[globalStyle.textInputBox, {width: 135}]}>
                {showPicker && (
                  <DateTimePicker
                    mode='date'
                    display='spinner'
                    value={date}
                    onChange={onChange}
                    maximumDate={new Date()}
                    minimumDate={new Date('1924-01-01')}
                  />
                )}
                <TouchableOpacity onPress={toggleDatePicker}>
                  <TextInput 
                    placeholder='1-01-1990'
                    value={formData.birthday}
                    onChangeText={(e) => handleChange('birthday', e)}
                    editable={false}
                  />
                </TouchableOpacity>
              </View>
            </View>
            
            <View>
              <Picker
                style={[globalStyle.textInputBox, {width: 135}]}
                selectedValue={gender}
                onValueChange={(itemValue, itemIndex) => {
                  setGender(itemValue)
                  handleChange('gender', itemValue)}
                }>
                <Picker.Item label="Gender" value='' enabled={false}/>
                <Picker.Item label="Male" value="0" />
                <Picker.Item label="Female" value="1"/>
                <Picker.Item label="Others" value="2"/>
              </Picker>
            </View>
          </View>
            
          <TouchableOpacity onPress={handleSubmit} style={[styles.registerButton, globalStyle.colorSecondaryBG]}>
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