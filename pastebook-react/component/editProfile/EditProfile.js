import { StyleSheet, Text, Touchable, TouchableOpacity, View, Image, TextInput, ScrollView } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'

import globalStyle from '../../assets/styles/globalStyle'

import HR from '../others/HR'

const EditProfile = () => {
    const [inputStates, setInputStates] = useState({
        bio: {state: false, style:'black', ref: useRef(null)},
        firstName: {state: false, style:'black', ref: React.useRef(null)},
        lastName: {state: false, style:'black', ref: React.useRef(null)},
        mobileNumber: {state: false, style:'black', ref: React.useRef(null)},
        birthday: {state: false, style:'black', ref: React.useRef(null)},
        gender: {state: false, style:'black', ref: React.useRef(null)},
    })

    const toggleEditButton = (inputName) => {
        setInputStates({
            ...inputStates,
            [inputName]: {state: true, style: '#7ed3bb'}
        })
    }

    const focusText = (inputName) => {
        inputStates[inputName].ref.current.focus();
    }

    const [showSave, setShowSave] = useState(false);

    useEffect(() => {
        const trueState = Object.values(inputStates).some((stateObj) => stateObj.state);

        setShowSave(trueState)
    }, [inputStates])

  return (
    <View style={[globalStyle.colorBackground, styles.container]}>
        <ScrollView showsVerticalScrollIndicator={false}>
            {/* Profile Picture */}
            <View>
                <View style={[globalStyle.alignToColumn, styles.titleContainer]}>
                    <Text style={globalStyle.textTitle}>Profile Picture</Text>
                    <TouchableOpacity style={styles.editContainer}>
                        <Text>Edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.imgContainer]}>
                    <Image 
                        style={styles.img} 
                        source={require('../../assets/img/user.png')}/>
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
                    <TextInput 
                    style={[{borderColor: inputStates.birthday.style}, styles.textContainer]}
                    editable={inputStates.birthday.state} 
                    placeholder='Birthday'></TextInput>
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
                    <TextInput 
                    style={[{borderColor: inputStates.gender.style}, styles.textContainer]}
                    editable={inputStates.gender.state} 
                    placeholder='Gender'></TextInput>
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
        marginVertical: 5
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

