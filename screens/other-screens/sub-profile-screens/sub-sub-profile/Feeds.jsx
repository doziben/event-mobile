import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Feeds() {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Feed</Text>
        <View style={styles.search}>
          <Ionicons name="search-outline" size={24} color="#9E9FA2" />
          <TextInput style={styles.input} placeholder="Search" />
        </View>
      </View>

      <ScrollView
        style={styles.posts}
        contentContainerStyle={{ paddingBottom: 50 }}
      ></ScrollView>
    </View>
  );
}

//** Move to a dedicated component */

function Post() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.postHeader}>
        <View style={styles.nameAvatar}>
          <View style={styles.avatar}></View>
          <Text
            style={{
              fontFamily: "OpenSansSemiBold",
              fontSize: 14,
              lineHeight: 24,
            }}
          >
            Denning Kahky
          </Text>
        </View>
        <View style={styles.followOption}>
          <Text
            style={{
              color: "#DE8E0E",
              marginRight: 10,
              fontFamily: "OpenSansRegular",
              fontSize: 14,
              lineHeight: 24,
            }}
          >
            Follow
          </Text>
          <Ionicons name="ellipsis-vertical-sharp" size={16} color="#1A1A1A" />
        </View>
      </View>

      <View style={styles.postMedia}>
        <TouchableOpacity style={styles.playButton}>
          <FontAwesome5 name="play" size={16} color="#DE8E0E" />
        </TouchableOpacity>
      </View>

      <View style={styles.timeLikes}>
        <Text
          style={{
            color: "#767676",
            fontSize: 12,
            fontFamily: "OpenSansRegular",
            lineHeight: 16,
          }}
        >
          5 min
        </Text>
        <Text
          style={{
            color: "#767676",
            fontSize: 12,
            fontFamily: "OpenSansRegular",
            lineHeight: 16,
          }}
        >
          50 Likes
        </Text>
      </View>

      <View style={styles.caption}>
        <Text
          style={{
            fontFamily: "OpenSansRegular",
            fontSize: 14,
            lineHeight: 18,
          }}
        >
          My Soul Thirsts for You Woke up this morning longing for more of Him
          in my soul. Lord, my soul thirsts for you
        </Text>
        <View>
          <Text
            style={{
              color: "#767676",
              fontFamily: "OpenSansRegular",
              fontSize: 14,
              lineHeight: 18,
            }}
          >
            #Soul #Yeve #Music
          </Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <View style={styles.icons}>
          <Ionicons
            style={{ marginRight: 10 }}
            name="heart-outline"
            size={24}
            color="#52555A"
          />
          <Ionicons
            style={{ marginRight: 10 }}
            name="chatbox-ellipses-outline"
            size={24}
            color="#52555A"
          />
          <Ionicons
            style={{ marginRight: 10 }}
            name="share-social-outline"
            size={24}
            color="#52555A"
          />
        </View>

        <View>
          <Text
            style={{
              color: "#DE8E0E",
              fontFamily: "OpenSansRegular",
              fontSize: 14,
              lineHeight: 24,
            }}
          >
            View Comments (156)
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingTop: 10,
  },

  subContainer: {
    borderBottomColor: "#E5E5E5",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },

  title: {
    fontFamily: "MontserratBold",
    fontSize: 16,
    lineHeight: 24,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: "#212121",
    marginRight: 10,
  },

  caption: {
    flex: 1,
    paddingHorizontal: 20,
  },

  nameAvatar: {
    flexDirection: "row",
    alignItems: "center",
  },

  timeLikes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  followOption: {
    flexDirection: "row",
    alignItems: "center",
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  playButton: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },

  postMedia: {
    height: 300,
    backgroundColor: "#212121",
    alignItems: "center",
    justifyContent: "center",
  },

  search: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  input: {
    padding: 10,
    flex: 1,
  },

  posts: {
    flex: 1,
  },

  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 10,
    borderColor: "#E5E5E5",
  },

  icons: {
    flexDirection: "row",
  },
});
