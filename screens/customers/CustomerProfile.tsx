import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import DrawerHeader from "../../components/DrawerHeader";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Modal from "react-native-modal";

//svg icons
import BriefCase from "../../assets/svg-icons/briefcase";
import User from "../../assets/svg-icons/user";
import Star from "../../assets/svg-icons/star";

//screens
import Profile from "../other-screens/sub-profile-screens/sub-sub-profile/MyProfile";
import Ratings from "../other-screens/sub-profile-screens/sub-sub-profile/Ratings";

//components
import CreatePost from "../../components/CreatePost";
import CreatePortfolio from "../../components/CreatePortfolio";

//api
import UserAvatar from "../../components/Interface/UserAvatar";
import useUser from "../../hooks/queries/useUser";
import LocationManager from "../../utils/LocationManager";
import Events from "../other-screens/sub-profile-screens/Events";
import HeadingText from "../../components/Interface/HeadingText";
import AvatarColorManager from "../../utils/AvatarColorManager";
import LoadingComp from "../../components/Interface/LoadingComp";
import BioManager from "../../components/account/biomanager";
import RatingItem from "../../components/Interface/RatingItem";
import useCountriesStates from "../../data/countriesStatesServer";

const Tab = createMaterialTopTabNavigator();

export default function CustomerProfile({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPostModalVisible, setPostModalVisible] = useState(false);
  const [isPortfolioModalVisible, setPortfolioModalVisible] = useState(false);

  const { data, isLoading } = useUser();

  const { getCountry } = useCountriesStates();

  const userCountry = getCountry(null, data?.country);
  const userState =
    userCountry &&
    userCountry?.states?.find((s) => {
      return s?._id === data?.state;
    });

  const name = `${data?.firstName} ${data?.lastName}`;
  const address = `${userState?.name}, ${userCountry?.name}`;

  const rating = data?.overallRating;

  const toggleModal = () => {
    // setModalVisible(true); //Coming soon when post feature is deployed
    // navigation.navigate("CustomerServices");
    Alert.alert("Coming Soon!", "The yeve social feature is coming soon");
  };

  function openCreatePostModal() {
    setPostModalVisible(true);
  }

  function openCreatePortfolioModal() {
    setPortfolioModalVisible(true);
  }

  return (
    <>
      {/* Create Post Component */}
      <View>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={() => setModalVisible(false)}
        >
          <View
            style={{
              backgroundColor: "#fff",
              position: "absolute",
              top: 120,
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
      </View>

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

      {/* Main Screen */}
      <View style={styles.container}>
        <DrawerHeader onPressed={() => navigation.openDrawer()} />
        {/* <LocationManager /> */}
        <AvatarColorManager />

        {/* Main Page */}
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={styles.profileHeader}>
            <HeadingText>My Profile</HeadingText>
            <TouchableOpacity style={styles.createButton} onPress={toggleModal}>
              <Ionicons name="add-sharp" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <LoadingComp />
          ) : (
            <View style={{ alignItems: "center", marginTop: 20 }}>
              <UserAvatar />

              <View style={{ marginTop: 10 }}>
                <Text style={styles.text}>{name}</Text>
                {userState && <Text style={styles.subText}>{address}</Text>}
              </View>

              {/* Ratings */}
              <RatingItem value={rating} />

              <View style={styles.bio}>
                <BioManager />
              </View>
            </View>
          )}

          {/* Posts */}
          <View style={{ height: 800 }}>
            <Tab.Navigator
              screenOptions={{
                tabBarIndicatorStyle: {
                  width: 0,
                },
                tabBarActiveTintColor: "#DE8E0E",
                tabBarInactiveTintColor: "#9E9FA2",
                tabBarStyle: {
                  elevation: 0,
                  borderBottomWidth: 1,
                  borderColor: "#E5E5E5",
                  backgroundColor: "#FAFAFA",
                },
              }}
            >
              <Tab.Screen
                name="MyProfile"
                component={Profile}
                options={{
                  tabBarShowLabel: false,
                  tabBarIcon: ({ color }) => <User color={color} />,
                }}
              />
              {/* <Tab.Screen
              name="Feeds"
              component={Feeds}
              options={{
                tabBarLabel: () => {
                  return null;
                },
                tabBarIcon: ({ color }) => <Flash color={color} />,
              }}
            /> */}
              <Tab.Screen
                name="events"
                component={Events}
                options={{
                  tabBarLabel: () => {
                    return null;
                  },
                  tabBarIcon: ({ color }) => (
                    <SimpleLineIcons name="feed" size={18} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Ratings"
                component={Ratings}
                options={{
                  tabBarLabel: () => {
                    return null;
                  },
                  tabBarIcon: ({ color }) => <Star color={color} />,
                }}
              />
            </Tab.Navigator>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  text: {
    fontFamily: "OpenSansBold",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  subText: {
    color: "#767676",
    textAlign: "center",
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    lineHeight: 24,
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

  ratings: {
    marginTop: 5,
    flexDirection: "row",
  },

  bio: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
