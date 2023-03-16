import { MaterialIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getToken } from "../../api";
import useUser from "../../hooks/queries/useUser";
import { currentUserDataObj } from "../../types/api/currentUserDataObj";
import PreviewPhotoModal from "../modals/PreviewPhotoModal";
import { launchImageLibraryAsync } from "expo-image-picker";
import getRandomColor from "../../hooks/custom/getRandomColor";

interface UserAvatarProps {
  small?: boolean;
  onPress?: (e: GestureResponderEvent) => void;
  allowEdit?: boolean;
}

export default function UserAvatar({
  small,
  onPress,
  allowEdit,
}: UserAvatarProps) {
  const [color, setColor] = useState("#000000");
  const [isPreviewing, setIsPreviewing] = useState(false);

  const user = useUser();
  const userData = user?.data as currentUserDataObj;
  const firstName = userData?.firstName;
  const lastName = userData?.lastName;
  const userInitial = firstName?.substring(0, 1) + lastName?.substring(0, 1);

  const [imgUrl, setImgUrl] = useState<string>("");

  const hasImgSet = userData?.image?.length > 10;

  const RandomColor = useCallback(() => {
    return getRandomColor();
  }, [userData]);

  const randomColor = useMemo(() => {
    return RandomColor();
  }, [userData]);

  useEffect(() => {
    getToken("avatarColor").then((color) => {
      setColor(color ?? randomColor);
    });
  }, [userData]);

  //** For changing profile photo */
  async function changeProfilePhoto() {
    const result = await launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      allowsMultipleSelection: false,
      quality: 0.5,
    });

    setIsPreviewing(true);

    const res = result as any;
    !result?.cancelled ? setImgUrl(res.uri) : setIsPreviewing(false);

    console.log("got here");
  }

  function onChangeComplete() {
    setIsPreviewing(false);
  }

  return (
    <>
      {/* Handles updating the user avatar */}
      <PreviewPhotoModal
        isVisible={isPreviewing}
        onComplete={onChangeComplete}
        imgUri={imgUrl}
      />

      {/* Handles displaying avatars */}
      <Pressable
        onPress={allowEdit ? changeProfilePhoto : onPress}
        style={({ pressed }) => [pressed && styles.pressable]}
      >
        <View
          style={[
            styles.avatar,
            small ? styles.small : styles.big,
            { backgroundColor: color },
          ]}
        >
          {hasImgSet ? (
            <Image
              source={{ uri: userData.image }}
              style={[small ? styles.small : styles.big]}
            />
          ) : (
            <Text style={[styles.initial, !small && { fontSize: 32 }]}>
              {userInitial}
            </Text>
          )}
        </View>
        {allowEdit && (
          <TouchableOpacity
            onPress={changeProfilePhoto}
            style={styles.changeDp}
          >
            <MaterialIcons name="edit" size={12} color="#fff" />
          </TouchableOpacity>
        )}
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  pressable: {
    opacity: 0.5,
  },
  initial: {
    color: "white",
    alignSelf: "center",
  },
  avatar: {
    borderRadius: 80,
    alignSelf: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  big: {
    width: 80,
    height: 80,
  },
  small: {
    width: 32,
    height: 32,
  },
  changeDp: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: "#DE8E0E",
    position: "absolute",
    bottom: -3,
    left: 38,
    justifyContent: "center",
    alignItems: "center",
  },
});
