import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DrawerHeader from "../../components/DrawerHeader";
import AlertModal from "../../components/AlertModal";
import Modal from "react-native-modal";

import Profile from "../other-screens/sub-profile-screens/Profile";
import Stats from "../other-screens/sub-profile-screens/Stats";
import Events from "../other-screens/sub-profile-screens/Events";

//components

import CreatePost from "../../components/CreatePost";
import CreatePortfolio from "../../components/CreatePortfolio";

const Tab = createMaterialTopTabNavigator();

export default function ProfileScreen({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPostModalVisible, setPostModalVisible] = useState(false);
  const [isPortfolioModalVisible, setPortfolioModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(true);
  };

  function openCreatePostModal() {
    setPostModalVisible(true);
  }

  function openCreatePortfolioModal() {
    setPortfolioModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <DrawerHeader onPressed={() => navigation.openDrawer()} />
      <AlertModal />

      <View style={styles.profileHeader}>
        <Text
          style={{ fontSize: 24, fontFamily: "MontserratBold", lineHeight: 48 }}
        >
          Home
        </Text>
        <TouchableOpacity style={styles.createButton} onPress={toggleModal}>
          <Ionicons name="add-sharp" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View
          style={{
            backgroundColor: "#fff",
            position: "absolute",
            top: 190,
            right: 0,
            borderRadius: 5,
            paddingVertical: 5,
          }}
        >
          <TouchableOpacity
            style={styles.createButtonItem}
            onPress={openCreatePostModal}
          >
            <Text style={styles.createButtonItemText}>Post</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createButtonItem}
            onPress={openCreatePortfolioModal}
          >
            <Text style={styles.createButtonItemText}>Portfolio Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createButtonItem}>
            <Text style={styles.createButtonItemText}>Go Live</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <CreatePost
        isVisible={isPostModalVisible}
        onClosePress={() => setPostModalVisible(false)}
        onBackdropPress={() => setPostModalVisible(false)}
      />

      <CreatePortfolio
        isVisible={isPortfolioModalVisible}
        onClosePress={() => setPortfolioModalVisible(false)}
        onBackdropPress={() => setPortfolioModalVisible(false)}
      />

      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarIndicatorStyle: {
              backgroundColor: "#DE8E0E",
            },
            tabBarStyle: {
              elevation: 0,
              borderBottomWidth: 1,
              borderColor: "#E5E5E5",
              backgroundColor: "#FAFAFA",
            },
            tabBarLabelStyle: {
              fontFamily: "OpenSansSemiBold",
            },
          }}
        >
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Stats" component={Stats} />
          <Tab.Screen name="Events" component={Events} />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  profileHeader: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },

  createButton: {
    padding: 10,
    backgroundColor: "#DE8E0E",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },

  createButtonItem: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  createButtonItemText: {
    color: "#767676",
    fontFamily: "OpenSansRegular",
    fontSize: 14,
  },
});
