import { Feather } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import HeadingText from "../../components/Interface/HeadingText";
import PressableIcon from "../../components/Interface/PressableIcon";
import UserProfile from "../../components/social/userProfile";
import { VendorRequestStackNav } from "../../types/extras/VendorRequestStackNav";

export type ClientProfileScreenProps = NativeStackScreenProps<
  VendorRequestStackNav,
  "clientProfile"
>;
export default function ClientProfile({
  navigation,
  route,
}: ClientProfileScreenProps) {
  const { clientId } = route.params;

  return (
    <>
      <View style={styles.header}>
        <PressableIcon
          icon={<Feather size={24} name="arrow-left" />}
          onPress={navigation.goBack}
        />
        <HeadingText extraStyles={{ marginLeft: 12 }}>
          Client Profile
        </HeadingText>
      </View>

      <UserProfile userId={clientId} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
});
