import React from 'react';
import Svg, { Path } from 'react-native-svg';
import {View} from 'react-native';

export default function Star(props) {
    return(
        <View style={props.style}>
            <Svg width="24" height="24" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M16.7902 3.14097L16.7202 6.93095C16.7102 7.45095 17.0403 8.14097 17.4603 8.45097L19.9403 10.3309C21.5303 11.5309 21.2703 13.001 19.3703 13.601L16.1403 14.6109C15.6003 14.7809 15.0303 15.371 14.8903 15.921L14.1203 18.8609C13.5103 21.1809 11.9902 21.411 10.7302 19.371L8.97024 16.5209C8.65024 16.0009 7.89024 15.611 7.29024 15.641L3.95028 15.811C1.56028 15.931 0.880268 14.551 2.44027 12.731L4.42025 10.4309C4.79025 10.0009 4.96024 9.20096 4.79024 8.66096L3.78029 5.43095C3.19029 3.53095 4.25028 2.48096 6.14028 3.10096L9.09029 4.07096C9.59029 4.23096 10.3403 4.12095 10.7603 3.81095L13.8403 1.59095C15.5003 0.390952 16.8302 1.09097 16.7902 3.14097Z" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <Path d="M21.4099 21.0007L18.3799 17.9707" stroke={props.color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>
        </View>
        
    );
}