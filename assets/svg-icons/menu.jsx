import React from 'react';
import Svg, { Rect } from 'react-native-svg';
import {View} from 'react-native';

export default function Menu(props) {
    return(
        <View style={props.style}>
            <Svg width="24" height="24" viewBox="0 0 22 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Rect width="22" height="2" rx="1" fill="#404040"/>
                <Rect y="5" width="16" height="2" rx="1" fill="#404040"/>
            </Svg>
        </View>
        
    );
}