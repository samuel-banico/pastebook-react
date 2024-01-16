import { StyleSheet } from 'react-native'
import React from 'react'

const globalStyle = StyleSheet.create({
    textTitle: {
        fontFamily: 'serif',
        fontWeight: '600',
        fontSize: 16,
        color: '#230b14'
    },
    textParagraph: {
        fontFamily: 'sans-serif',
        fontSize: 12,
        color: '#230b14'
    },
    colorBackground: {
        backgroundColor: '#f9ecf0'
    },
    colorBoxBG: {
        backgroundColor: '#ece1e5',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    colorPimaryBG: {
        backgroundColor: '#67233e'
    },
    colorSecondaryBG: {
        backgroundColor: '#7ed3bb'
    },
    textInputBox: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 5,
        marginTop: 5,
        marginBottom: 10,
        width: 280
    },
    postInputBox: {

    },
    alignToColumn: {
        flexDirection: 'row'
    }
})

export default globalStyle