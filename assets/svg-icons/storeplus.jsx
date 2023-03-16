import React from 'react';
import Svg, { Path } from 'react-native-svg';
import {View} from 'react-native';

export default function StorePlus(props) {
    return(
        <View style={props.style}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M21.0105 11.2207V15.7107C21.0105 20.2007 19.2205 22.0007 14.7205 22.0007H9.33051C8.75051 22.0007 8.22047 21.9708 7.73047 21.9008" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M3.04004 15.5208V11.2207" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M12.0299 12C13.8599 12 15.2099 10.5101 15.0299 8.68005L14.3599 2H9.68989L9.01991 8.68005C8.83991 10.5101 10.1999 12 12.0299 12Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M18.3303 12C20.3503 12 21.8303 10.36 21.6303 8.34998L21.3503 5.59998C20.9903 2.99998 19.9903 2 17.3703 2H14.3203L15.0203 9.01001C15.2003 10.66 16.6803 12 18.3303 12Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M5.66979 12C7.31979 12 8.80978 10.66 8.96978 9.01001L9.18981 6.80005L9.66979 2H6.61981C3.99981 2 2.99983 2.99998 2.63983 5.59998L2.3598 8.34998C2.1598 10.36 3.64979 12 5.66979 12Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M9 19C9 19.75 8.78998 20.4601 8.41998 21.0601C8.22998 21.3801 7.99998 21.67 7.72998 21.9C7.69998 21.94 7.67 21.97 7.63 22C6.93 22.63 6.01 23 5 23C3.78 23 2.68997 22.45 1.96997 21.59C1.94997 21.56 1.92002 21.54 1.90002 21.51C1.78002 21.37 1.67002 21.2201 1.58002 21.0601C1.21002 20.4601 1 19.75 1 19C1 17.74 1.58 16.61 2.5 15.88C2.67 15.74 2.84998 15.62 3.03998 15.52C3.61998 15.19 4.29 15 5 15C6 15 6.89998 15.36 7.59998 15.97C7.71998 16.06 7.82999 16.17 7.92999 16.28C8.58999 17 9 17.95 9 19Z" stroke={props.color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M6.48975 18.9805H3.50977" stroke={props.color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M5 17.5195V20.5095" stroke={props.color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>
        </View>
        
    );
}