import { StyleSheet, Text, Touchable, TouchableOpacity, View, Image, TextInput, ScrollView, Animated, Easing, Platform  } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'

import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

import globalStyle from '../../assets/styles/globalStyle'

import HR from '../others/HR'

const EditProfile = () => {
    const [inputStates, setInputStates] = useState({
        profPic: {state: false, style: 'black'},
        bio: {value: '', state: false, style:'black', shakeAnimation: useRef(new Animated.Value(0)).current},
        firstName: {value: '',state: false, style:'black', shakeAnimation: useRef(new Animated.Value(0)).current},
        lastName: {value: '',state: false, style:'black', shakeAnimation: useRef(new Animated.Value(0)).current},
        mobileNumber: {value: '',state: false, style:'black', shakeAnimation: useRef(new Animated.Value(0)).current},
        birthday: {value: '',state: false, style:'black', shakeAnimation: useRef(new Animated.Value(0)).current},
        gender: {value: '', state: false, style:'black', shakeAnimation: useRef(new Animated.Value(0)).current},
    })

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.canceled) { 
            setImage(result.assets[0].uri);
        }
    };

    const toggleEditButton = (inputName) => {
        setInputStates({
            ...inputStates,
            [inputName]: {
                ...inputStates[inputName],
                state: true, 
                style: '#7ed3bb'
            }
        })
    }

    const onChangeValue = (fieldName, value) => {
        setInputStates({
          ...inputStates,
          [fieldName]: {
            ...inputStates[fieldName],
            value: value
          }
        });
      };

    const focusText = (inputName) => {
        inputStates[inputName].ref.current.focus();
    }

    const [showSave, setShowSave] = useState(false);

    useEffect(() => {
        const trueState = Object.values(inputStates).some((stateObj) => stateObj.state);

        setShowSave(trueState)
    }, [inputStates])

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
      onChangeValue('birthday', formatDate(currentDate))
    } else {
      toggleDatePicker();
    }

    if(InputEmpty(inputStates.birthday.value)) {
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
    <View style={[globalStyle.colorBackground, styles.container]}>
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* Profile Picture */}
            <View>
                <View style={[globalStyle.alignToColumn, styles.titleContainer]}>
                    <Text style={globalStyle.textTitle}>Profile Picture</Text>
                    <TouchableOpacity style={styles.editContainer} onPress={pickImage}>
                        <Text>Edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.imgContainer]}>
                    { image ? <Image source={{ uri: image }} style={{ width: 200, height: 200 }}/> : 
                    <Image 
                        style={[styles.img, {borderColor: inputStates.profPic.style, borderWidth: 1}]} 
                        source={require('../../assets/img/user.png')}/>}
                        
                </View>
            </View>

            <HR/>
            {/* Bio */}
            <View>
                <View style={[globalStyle.alignToColumn, styles.titleContainer]}>
                    <Text style={globalStyle.textTitle}>Bio</Text>
                    {
                        !inputStates.bio.state && (
                            <TouchableOpacity
                                onPress={() => toggleEditButton('bio')}
                                style={[styles.editContainer]}>
                                <Text>Edit</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
                <TextInput
                    editable={inputStates.bio.state}
                    style={[{borderColor: inputStates.bio.style}, styles.textContainer]}
                    placeholder='Describe yourself...'/>
            </View>
            
            <HR/>
            {/*  Basic */}
            <View>
                <Text style={globalStyle.textTitle}>Details</Text>
                <View>
                    <View style={[globalStyle.alignToColumn, styles.titleContainer]}>
                        <Text>First Name</Text>
                        {
                            !inputStates.firstName.state && (
                                <TouchableOpacity 
                                    onPress={() => toggleEditButton('firstName')}
                                    style={[styles.editContainer]}>
                                    <Text>Edit</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    <TextInput 
                        editable={inputStates.firstName.state} 
                        style={[{borderColor: inputStates.firstName.style}, styles.textContainer]}
                        placeholder='FirstName'></TextInput>
                </View>
                
                <View>
                    <View style={[globalStyle.alignToColumn, styles.titleContainer]}>
                        <Text>Last Name</Text>
                        {
                            !inputStates.lastName.state && (
                                <TouchableOpacity 
                                    onPress={() => toggleEditButton('lastName')}
                                    style={[styles.editContainer]}>
                                    <Text>Edit</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    <TextInput 
                        style={[{borderColor: inputStates.lastName.style}, styles.textContainer]}
                        editable={inputStates.lastName.state} 
                        placeholder='LastName'></TextInput>
                </View>

                <View>
                    <View style={[globalStyle.alignToColumn, styles.titleContainer]}>
                        <Text>Mobile Number</Text>
                        {
                            !inputStates.mobileNumber.state && (
                                <TouchableOpacity 
                                    onPress={() => toggleEditButton('mobileNumber')}
                                    style={[styles.editContainer]}>
                                    <Text>Edit</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    <TextInput 
                    style={[{borderColor: inputStates.mobileNumber.style}, styles.textContainer]}
                    editable={inputStates.mobileNumber.state}
                    value={inputStates.mobileNumber.value}
                    onChangeText={(e) => onChangeValue('mobileNumber', e)}
                    placeholder='MobileNumber'></TextInput>
                </View>

                <View>
                    <View style={[globalStyle.alignToColumn, styles.titleContainer]}>
                        <Text>Birthday</Text>
                        {
                            !inputStates.birthday.state && (
                                <TouchableOpacity 
                                    onPress={() => toggleEditButton('birthday')}
                                    style={[styles.editContainer]}>
                                    <Text>Edit</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>

                    <View>
                        <View style={[styles.textContainer, {borderColor: inputStates.birthday.style}]}>
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
                            <TouchableOpacity disabled={!inputStates.birthday.state} onPress={toggleDatePicker}>
                                <TextInput 
                                placeholder='1-01-1990'
                                value={inputStates.birthday.value}
                                onChangeText={(e) => onChangeValue('birthday', e)}
                                editable={false}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                
                <View>
                    <View style={[globalStyle.alignToColumn, styles.titleContainer]}>
                        <Text>Gender</Text>
                        {
                            !inputStates.gender.state && (
                                <TouchableOpacity 
                                    onPress={() => toggleEditButton('gender')}
                                    style={[styles.editContainer]}>
                                    <Text>Edit</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>
                    <View>
                        <View style={[styles.textContainer, {borderColor: inputStates.gender.style}]}>
                            <Picker
                                enabled={inputStates.gender.state}
                                selectedValue={gender}
                                onValueChange={(itemValue, itemIndex) => {
                                    setGender(itemValue)
                                    onChangeValue('gender', itemValue)}
                                }>
                                <Picker.Item label="Gender" value='' enabled={false}/>
                                <Picker.Item label="Male" value="0" />
                                <Picker.Item label="Female" value="1"/>
                                <Picker.Item label="Others" value="2"/>
                            </Picker>
                        </View>
                    </View>
                </View>
                
                {
                    showSave && (<TouchableOpacity style={[globalStyle.colorSecondaryBG, styles.saveContainer]}>
                        <Text>Save Changes</Text>
                    </TouchableOpacity>)
                }
            </View>
        </ScrollView>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    editContainer: {
        alignItems: 'center'
    }, 
    imgContainer: {
        alignItems: 'center',
        marginTop: 8
    },
    textContainer: {
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginVertical: 5,
        marginBottom: 15
    },
    saveContainer: {
        marginVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        paddingVertical: 2,
    },
    img: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
})

