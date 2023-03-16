import { Pressable, StyleSheet, View } from "react-native";
import PlayButton from "../Interface/PlayButton";

interface PostBoxProps {}

export default function PostBox({}: PostBoxProps) {
  return (
    <View style={styles.box}>
      <PlayButton />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 115,
    height: 100,
    backgroundColor: "#212121",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
