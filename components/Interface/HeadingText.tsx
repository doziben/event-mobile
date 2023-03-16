import { ReactNode } from "react";
import { StyleProp, TextStyle, Text } from "react-native";

interface HeadingTextProps {
  children: ReactNode;
  extraStyles?: StyleProp<TextStyle>;
  lg?: boolean;
}

export default function HeadingText({
  children,
  extraStyles,
  lg,
}: HeadingTextProps) {
  return (
    <Text
      style={[
        {
          fontFamily: "MontserratBold",
          fontSize: lg ? 16 : 24,
          lineHeight: lg ? 16 : 28,
        },
        extraStyles,
      ]}
    >
      {children}
    </Text>
  );
}
