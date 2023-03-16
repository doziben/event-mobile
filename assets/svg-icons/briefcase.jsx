import React from "react";
import Svg, { Path } from "react-native-svg";
import { View } from "react-native";

export default function BriefCase(props) {
  return (
    <View style={props.style}>
      <Svg
        width="24"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M8.49983 22H16.4998C20.5198 22 21.2398 20.39 21.4498 18.43L22.1998 10.43C22.4698 7.99 21.7698 6 17.4998 6H7.49983C3.22983 6 2.52983 7.99 2.79983 10.43L3.54983 18.43C3.75983 20.39 4.47983 22 8.49983 22Z"
          stroke={props.color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M8.5 6V5.2C8.5 3.43 8.5 2 11.7 2H13.3C16.5 2 16.5 3.43 16.5 5.2V6"
          stroke={props.color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M14.5 13V14C14.5 14.01 14.5 14.01 14.5 14.02C14.5 15.11 14.49 16 12.5 16C10.52 16 10.5 15.12 10.5 14.03V13C10.5 12 10.5 12 11.5 12H13.5C14.5 12 14.5 12 14.5 13Z"
          stroke={props.color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M22.15 11C19.84 12.68 17.2 13.68 14.5 14.02"
          stroke={props.color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M3.12012 11.2695C5.37012 12.8095 7.91012 13.7395 10.5001 14.0295"
          stroke={props.color}
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </Svg>
    </View>
  );
}
