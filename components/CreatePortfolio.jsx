import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Image,
  ImageBackground,
  Dimensions,
  TextInput,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";

export default function CreatePortfolio(props) {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View>
      <Modal
        onBackdropPress={props.onBackdropPress}
        isVisible={props.isVisible}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: 5,
            paddingHorizontal: 15,
            paddingVertical: 15,
            position: "absolute",
            width: Dimensions.get("window").width - 40,
          }}
        >
          <View>
            <View style={styles.createPostHeader}>
              <Text style={{ fontFamily: "MontserratBold", fontSize: 16 }}>
                Create Portfolio
              </Text>
              <TouchableOpacity onPress={props.onClosePress}>
                <Ionicons name="close" size={24} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {image ? (
              <View>
                <View style={styles.nameAvatar}>
                  <View style={styles.avatar}></View>
                  <Text
                    style={{ fontFamily: "OpenSansSemiBold", fontSize: 14 }}
                  >
                    Denning Kahky
                  </Text>
                </View>

                <ImageBackground
                  source={{ uri: image }}
                  style={styles.browsedImage}
                >
                  <TouchableOpacity style={styles.editFile} onPress={pickImage}>
                    <MaterialIcons name="edit" size={18} color="#fff" />
                  </TouchableOpacity>
                </ImageBackground>
                <View style={{ marginTop: 15 }}>
                  <Text
                    style={{
                      fontFamily: "OpenSansSemiBold",
                      fontSize: 12,
                      marginBottom: 5,
                    }}
                  >
                    Add Caption
                  </Text>
                  {/* <Textarea
                    containerStyle={styles.caption}
                    style={styles.textarea}
                    placeholder={"Enter caption"}
                    placeholderTextColor={"#c7c7c7"}
                    underlineColorAndroid={"transparent"}
                  /> */}
                  <TouchableOpacity style={styles.unlockedButton}>
                    <Text
                      style={{
                        color: "#FFF",
                        fontFamily: "OpenSansSemiBold",
                        fontSize: 14,
                      }}
                    >
                      Upload
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <View style={{ marginBottom: 20 }}>
                  <Text
                    style={{
                      fontFamily: "OpenSansRegular",
                      fontSize: 14,
                      color: "#767676",
                    }}
                  >
                    Upload photos or videos
                  </Text>
                </View>
                <View style={styles.browseContainer}>
                  <TouchableOpacity
                    style={styles.browseButton}
                    onPress={pickImage}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontFamily: "OpenSansSemiBold",
                        fontSize: 14,
                      }}
                    >
                      Browse
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity disabled style={styles.lockedButton}>
                  <Text
                    style={{
                      color: "#8C8C8C",
                      fontFamily: "OpenSansSemiBold",
                      fontSize: 14,
                    }}
                  >
                    Upload
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  createPostHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  browseButton: {
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 5,
  },

  browseContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
    borderRadius: 5,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },

  editFile: {
    width: 30,
    height: 30,
    backgroundColor: "#DE8E0E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },

  browsedImage: {
    height: 350,
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: "flex-end",
    borderRadius: 5,
    overflow: "hidden",
  },

  lockedButton: {
    backgroundColor: "#D2D2D2",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 5,
  },

  unlockedButton: {
    backgroundColor: "#DE8E0E",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 5,
  },

  caption: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    height: 100,
    justifyContent: "flex-start",
    backgroundColor: "#FAFAFA",
    borderRadius: 5,
    padding: 10,
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 32,
    backgroundColor: "#212121",
    marginRight: 5,
  },

  nameAvatar: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});
