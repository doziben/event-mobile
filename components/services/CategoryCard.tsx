import { priviledge } from "../../types/api/categoryDataObj";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  GestureResponderEvent,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CategoryCardProps {
  name: string;
  media: string;
  onPress: (e: GestureResponderEvent) => void;
  priviledge?: priviledge;
}

export default function CategoryCard({
  name,
  media,
  priviledge,
  onPress,
}: CategoryCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={{
          uri: `https://yeve.fra1.cdn.digitaloceanspaces.com/${media}`,
        }}
        style={styles.image}
      />

      {/* Title Wrapper */}
      <View style={styles.titleWrapper}>
        <Text numberOfLines={1} style={styles.title}>
          {name}
        </Text>
        <Ionicons name="chevron-forward" size={14} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width / 2 - 28,
    height: 140,
    backgroundColor: "white",
    padding: 8,
    justifyContent: "space-between",
    elevation: 2,
    borderRadius: 5,
    marginBottom: 15,
    shadowColor: "gray",
    shadowOffset: { height: 2, width: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  image: {
    height: 100,
    width: Dimensions.get("screen").width / 2 - 48,
    backgroundColor: "#212121",
    borderRadius: 5,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "OpenSansBold",
    marginVertical: 4,
    fontSize: 14,
  },
});
