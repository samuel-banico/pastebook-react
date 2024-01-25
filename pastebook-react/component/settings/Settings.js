import { Button, SafeAreaView, StyleSheet, Text, View, Switch } from 'react-native'
import React, { useState } from 'react'
import { useRoute } from '@react-navigation/native';

import Collapsible from 'react-native-collapsible';

import Logout from './Logout'
import Security from './Security'
import YourProfile from './YourProfile'
import HR from '../others/HR'

import globalStyle from '../../assets/styles/globalStyle'

const Settings = ({navigation, data}) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }
    
    const [isEnabled, setIsEnabled] = useState({
        viewPublic: { state: true},
        darkMode: {state: true}
    });

    const toggleSwitch = (fieldName) => {
        setIsEnabled({
            ...isEnabled,
            [fieldName]: {
                state: !isEnabled[fieldName].state
            }
        });
    }

    return (
        <SafeAreaView style={[globalStyle.colorBackground, styles.container]}>
            <View>
                <View>
                    <YourProfile navigation={navigation} data={data}/>
                </View>
                <Button title='click' onPress={toggleCollapse}/>
                
                <Collapsible collapsed={isCollapsed} enablePointerEvents={true}>
                    <View style={[globalStyle.alignToColumn]}>
                        <Text>View Public Posts</Text>
                        <Switch 
                            trackColor={{false: '#767577', true: '#67233e'}}
                            thumbColor={isEnabled.viewPublic.state ? '#67233e' : '#7ed3bb'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => toggleSwitch('viewPublic')}
                            value={isEnabled.viewPublic.state}/>
                    </View>
                    <View style={[globalStyle.alignToColumn]}>
                        <Text>Dark Mode</Text>
                        <Switch 
                            trackColor={{false: '#ffffff', true: '#000000'}}
                            thumbColor={isEnabled.darkMode.state ? '#000000' : '#ffffff'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={() => toggleSwitch('darkMode')}
                            value={isEnabled.darkMode.state}/>
                    </View>
                </Collapsible>
                <HR/>
                <Security navigation={navigation}/>
                <Logout navigation={navigation}/>
            </View>
        </SafeAreaView>
  )
}

export default Settings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})