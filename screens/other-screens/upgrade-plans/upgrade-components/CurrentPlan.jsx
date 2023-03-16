import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function CurrentPlan() {
    return(
        <View style={styles.myplan}>
            <Text style={styles.myplanText}>Your current plan</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    myplan: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 100,
        backgroundColor: '#FAFAFA'
    },

    myplanText: {
        fontFamily: 'OpenSansBold',
        color: '#8C8C8C',
        fontSize: 14
    }
});