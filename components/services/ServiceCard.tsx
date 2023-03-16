import {
  Dimensions,
  GestureResponderEvent,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { priviledge } from "../../types/api/categoryDataObj";

interface ServiceCardProps {
  name: string;
  media: string;
  selected: boolean;
  index: number;
  onPress: (e: GestureResponderEvent) => void;
  priviledge?: priviledge;
}

export default function ServiceCard({
  name,
  media,
  priviledge,
  onPress,
  selected,
  index,
}: ServiceCardProps) {
  const isEven = index % 2 == 0;

  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={{
          uri: `https://yeve.fra1.cdn.digitaloceanspaces.com/${media}`,
        }}
        style={[styles.image, isEven && styles.even]}
      >
        <View style={[styles.overlay, selected && styles.selected]}>
          <Text style={styles.title}>{name}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    flex: 1,
    justifyContent: "center",
  },
  selected: {
    backgroundColor: "rgba(222, 142, 14, 0.8)",
  },
  image: {
    width: Dimensions.get("screen").width / 2 - 28,
    height: 100,
    backgroundColor: "#fff",
    elevation: 2,
    borderRadius: 5,
    marginBottom: 15,
    overflow: "hidden",
  },
  even: { marginRight: 12 },
  title: {
    fontFamily: "OpenSansBold",
    marginVertical: 4,
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
});
