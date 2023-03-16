import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default function AuthHeader() {
    return(
        <View style={styles.container}>
            <Image source={require("../assets/app-media/logo.png")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 20,
        paddingLeft: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#E5E5E5',
    },

});