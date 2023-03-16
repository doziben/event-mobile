import React from 'react';
import Svg, { Path } from 'react-native-svg';
import {View} from 'react-native';

export default function Flash(props) {
    return(
        <View style={props.style}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M6.0901 13.2809H9.1801V20.4809C9.1801 22.1609 10.0901 22.5009 11.2001 21.2409L18.7701 12.6409C19.7001 11.5909 19.3101 10.7209 17.9001 10.7209H14.8101V3.52087C14.8101 1.84087 13.9001 1.50087 12.7901 2.76087L5.2201 11.3609C4.3001 12.4209 4.6901 13.2809 6.0901 13.2809Z" stroke={props.color} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </Svg>
        </View>
        
    );
}