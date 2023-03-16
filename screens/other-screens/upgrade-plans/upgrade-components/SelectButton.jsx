import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';


export default function SelectButton() {
    return(
        <TouchableOpacity style={styles.myplan}>
            <Text style={styles.myplanText}>Select</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    myplan: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#DE8E0E',
        borderRadius: 100,
        backgroundColor: '#DE8E0E'
    },

    myplanText: {
        fontFamily: 'OpenSansBold',
        color: '#fff',
        fontSize: 14
    }
});