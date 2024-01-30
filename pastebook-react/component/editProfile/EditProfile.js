import { StyleSheet, Text, Touchable, TouchableOpacity, View, Image, TextInput, ScrollView, Platform  } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'

import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';

import globalStyle from '../../assets/styles/globalStyle'

import { MobileNumberIsValid } from '../registration/RegisterValidation';
import {getTokenData} from '../others/LocalStorage'
import { editUserProfilePicture, getProfileUserDetailsByToken, updateProfile } from './EditProfileService';

import HR from '../others/HR'

const EditProfile = ({navigation}) => {
    const [data, setData] = useState({});

    const [inputStates, setInputStates] = useState({
        profPic: {state: false, style: 'black'},
        bio: {value: null, state: false, style:'black'},
        firstName: {value: null,state: false, style:'black'},
        lastName: {value: null,state: false, style:'black'},
        mobileNumber: {value: null,state: false, style:'black'},
        birthday: {value: null, state: false, style:'black'},
        gender: {value: null, state: false, style:'black'},
    })

    const [showCancel, setShowCancel] = useState(false)
    const [image, setImage] = useState(null);

    const [update, setUpdate] = useState(false)

    const [showSave, setShowSave] = useState(false);
    const [gender, setGender] = useState(1);

    // BIRTHDAY
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            var token = await getTokenData()

            await getProfileUserDetailsByToken(token)
            .then(response => {
                setData(response.data)
                onChangeValue('email', response.data.gender)
            })
            .catch(error => {
                console.log(error)
            })
        }

        fetchData();
    }, [update])

    
    const pickImage = async () => {
        setShowCancel(true);
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
        });

        if (!result.canceled) { 
            setImage(result.assets[0].uri);
        }
    };
    
    const cancelClick = () => {
        setShowCancel(false)

        setImage(null)
    }

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

    useEffect(() => {
        const trueState = Object.values(inputStates).some((stateObj) => stateObj.state);

        setShowSave(trueState)
    }, [inputStates])



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
    return `${month}/${day}/${year}`
  }

  const showToast = (type, text1, text2) => {
    Toast.show({
        type: type,
        text1: text1,
        text2: text2
      })
  }

  const mobileNumberOnBlur = () => {
    if(!MobileNumberIsValid(inputStates.mobileNumber.value)) {
        showToast('error', 'Information Error', 'Mobile Number not valid!')

        return true;
    }

    return false;
  }

  const dataUpdate = async (data) => {
    var token = await getTokenData();

    await updateProfile(token, data)
    .then(response => {
        showToast('success', 'Success', 'Information update successfull!')
        setUpdate(!update);
        navigation.goBack();
    })
    .catch(error => {
        console.log(error);
        showToast('error', 'Error', 'There was an error updating your profile')
    })
  }

  const clickOnSubmit = () => {
    if(inputStates.mobileNumber.value != null && mobileNumberOnBlur())
        return

    var dataToSend = {
        bio : inputStates.bio.value,
        firstName: inputStates.firstName.value,
        lastName: inputStates.lastName.value,
        birthday: inputStates.birthday.value,
        gender: inputStates.gender.value,
        mobileNumber: inputStates.mobileNumber.value
    }

    dataUpdate(dataToSend);
  }

  const editProfileOnClick = async () => {
    var token = await getTokenData()
    const formData = new FormData();

    formData.append('image', {
        uri: image,
        type: 'image/jpeg',
        name: 'myFile.jpg'
    });

    await editUserProfilePicture(token, formData)
    .then(response => {
        showToast('success', 'Success', 'Profile picture updated!')
        setUpdate(!update)
        setShowCancel(!showCancel)
    })
    .catch(error => {
        console.log('ERROR: Uploading Images')
        console.log(error)
    })
  }

  return (
    <View style={[globalStyle.colorBackground, styles.container]}>
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* Profile Picture */}
            <View>
                <View style={[globalStyle.alignToColumn, styles.titleContainer]}>
                    <Text style={globalStyle.textTitle}>Profile Picture</Text>
                    <View style={[globalStyle.alignToColumn]}>
                        <TouchableOpacity style={styles.editContainer} onPress={pickImage}>
                            <Text>Edit</Text>
                        </TouchableOpacity>

                        {
                            showCancel && 
                            <TouchableOpacity style={styles.editContainer} onPress={cancelClick}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={[styles.outerCircleContainer, {borderColor: inputStates.profPic.style}]}>
                        { image && showCancel ? <Image source={{ uri: image }} style={[styles.img]}/> : 
                            <Image 
                                style={[styles.img]} 
                                source={{uri: data.profilePicture}}/>
                        }
                    </View>
                </View>
                {
                    showCancel && 
                    <TouchableOpacity 
                        onPress={editProfileOnClick} 
                        style={[globalStyle.colorSecondaryBG, styles.saveContainer]}>
                        <Text>Update Profile</Text>
                    </TouchableOpacity>
                }
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
                    multiline={true}
                    editable={inputStates.bio.state}
                    style={[{borderColor: inputStates.bio.style}, styles.textContainer]}
                    placeholder={data.bio}
                    value={inputStates.bio.value}
                    onChangeText={(e) => onChangeValue('bio', e)}/>
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
                        placeholder={data.firstName}
                        value={inputStates.firstName.value}
                        onChangeText={(e) => onChangeValue('firstName', e)}></TextInput>
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
                        placeholder={data.lastName}
                        value={inputStates.lastName.value}
                        onChangeText={(e) => onChangeValue('lastName', e)}></TextInput>
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
                    placeholder={data.mobileNumber}
                    onBlur={mobileNumberOnBlur}></TextInput>
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
                                placeholder={data.birthday}
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
                            {
                                inputStates.gender.state ? 
                                <Picker
                                    selectedValue={gender}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setGender(itemValue)
                                        onChangeValue('gender', itemValue)}
                                    }>
                                    <Picker.Item label="Gender" value='' enabled={false}/>
                                    <Picker.Item label="Male" value="0" />
                                    <Picker.Item label="Female" value="1"/>
                                    <Picker.Item label="Others" value="2"/>
                                </Picker> : 
                                <Text style={styles.genderContainer}>
                                    {
                                        data.gender === 0 ? 'Male' :
                                        data.gender === 1 ? 'Female' :
                                        data.gender === 2 ? 'Other' :
                                        'error'
                                    }
                                </Text>
                            }
                        </View>
                    </View>
                </View>
                
                {
                    showSave && (
                    <TouchableOpacity 
                        onPress={clickOnSubmit} 
                        style={[globalStyle.colorSecondaryBG, styles.saveContainer]}>
                        <Text>Save Changes</Text>
                    </TouchableOpacity>
                    )
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
    outerCircleContainer: {
        width: 106,
        height: 106,
        borderRadius: 53,
        padding: 2,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    editContainer: {
        paddingLeft: 3,
        paddingRight: 3
    }, 
    textContainer: {
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginVertical: 5,
        marginBottom: 15
    },
    genderContainer: {
        marginVertical: 5,
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

