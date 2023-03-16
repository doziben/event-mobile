import { useCallback, useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import getRandomColor from "../../hooks/custom/getRandomColor";

interface UserImageProps {
  name: string;
  imgSrc?: string;
  size: "sm" | "md" | "lg";
}

export default function UserImage({ name, imgSrc, size }: UserImageProps) {
  const hasImgSet = imgSrc?.length > 10;
  const initial = name.substring(0, 1);

  const genRandom = useCallback(() => {
    return getRandomColor();
  }, []);

  const backgroundColor = useMemo(() => {
    return genRandom();
  }, []);

  let sizeValue = 28;

  if (size === "md") {
    sizeValue = 40;
  } else if (size === "lg") {
    sizeValue = 64;
  }

  return (
    <View
      style={[
        styles.container,
        { width: sizeValue, height: sizeValue, backgroundColor },
      ]}
    >
      {hasImgSet ? (
        <Image
          source={{ uri: imgSrc }}
          style={{ width: sizeValue, height: sizeValue }}
        />
      ) : (
        <Text style={[styles.text, { fontSize: sizeValue / 2 }]}>
          {initial}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 80,
    alignSelf: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  text: {
    color: "#fff",
    alignSelf: "center",
  },
});
