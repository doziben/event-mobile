import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PendingScreen from "../other-screens/request-sub-screens/PendingScreen";
import ActiveScreen from "../other-screens/request-sub-screens/ActiveScreen";
import PastScreen from "../other-screens/request-sub-screens/PastScreen";
import HeadingText from "../../components/Interface/HeadingText";
import RecurringScreen from "../other-screens/request-sub-screens/RecurringScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CustomerRequestStack } from "../../types/extras/CustomerRequestStackNav";
import { useState } from "react";
import Modal from "react-native-modal";
import ModalWrapper from "../../components/modals/ModalWrapper";
import { ServiceRequestDataObj } from "../../types/api/ServiceRequestDataObj";
import useClientServiceRequest from "../../hooks/queries/requests/useClientServiceRequest";
import LoadingComp from "../../components/Interface/LoadingComp";
import PendingRequest from "../../components/requests/PendingRequest";

const Tab = createMaterialTopTabNavigator();

export type CustomerRequestsNavProps = NativeStackScreenProps<
  CustomerRequestStack,
  "requests"
>;
export default function CustomerRequests({
  navigation,
}: CustomerRequestsNavProps) {
  const { data, isLoading } = useClientServiceRequest();
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<ServiceRequestDataObj[]>([]);

  function handleSearchQuery(t: string) {
    const res = data.filter(({ title }) => title.includes(t));
    setResults(res);
  }

  const searchInput = (
    <TextInput
      onChangeText={handleSearchQuery}
      style={[styles.search, { width: "100%" }]}
      placeholder="Search requests"
      editable={isSearching}
    />
  );

  function toggleSearch() {
    setIsSearching((p) => !p);
  }

  return (
    <View style={styles.container}>
      {/* Search Modal */}
      <Modal isVisible={isSearching} onBackdropPress={toggleSearch}>
        <ModalWrapper
          extraStyles={{
            top: "22%",
            backgroundColor: "rgba(0, 0, 0, 0)",
          }}
        >
          {searchInput}
          {/* Search Results */}
          <View style={styles.searchResultWrapper}>
            {isLoading && <LoadingComp />}
            <FlatList
              data={results}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item }) => {
                function handlePress() {
                  item?.applications?.length > 0 &&
                    navigation.navigate("vendorApplications", {
                      serviceId: item.userId,
                    });
                }
                const budget =
                  `${item.budget.fixedPrice}` ??
                  `${item.budget.range?.min}-${item.budget.range?.max}`;
                const dateAndTime = new Date(item.date).toDateString();
                return (
                  <PendingRequest.Client
                    budget={budget}
                    dateAndTime={dateAndTime}
                    service={item.title}
                    applicants={item.applications}
                    onPress={handlePress}
                  />
                );
              }}
            />
          </View>
        </ModalWrapper>
      </Modal>

      {/* Header */}
      <View style={styles.requestHeader}>
        <HeadingText>Requests</HeadingText>

        {/* Turn into a dedicated sort request component with context for sorting */}
        <TouchableOpacity style={styles.createButton}>
          <Ionicons name="options-outline" size={24} color="#DE8E0E" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <Pressable onPress={toggleSearch}>
        <View style={styles.search}>
          <Ionicons
            style={{ marginRight: 10 }}
            name="search-outline"
            size={24}
            color="grey"
          />
          <Text style={styles.searchText}>Search requests</Text>
        </View>
      </Pressable>

      {/* Tabs Screens */}
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
              textTransform: "none",
              fontFamily: "OpenSansSemiBold",
              fontSize: 14,
              lineHeight: 24,
            },
          }}
        >
          <Tab.Screen
            name="Pending"
            component={PendingScreen}
            initialParams={{ navigation: navigation }}
          />
          <Tab.Screen
            name="Active"
            component={ActiveScreen}
            initialParams={{ navigation: navigation }}
          />
          <Tab.Screen
            name="Past"
            component={PastScreen}
            initialParams={{ navigation: navigation }}
          />
          {/* <Tab.Screen
            name="Recurring"
            component={RecurringScreen}
            initialParams={{ navigation: navigation }}
          /> */}
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  requestHeader: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },

  createButton: {
    padding: 10,
    backgroundColor: "#FDF9F3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  searchText: {
    fontFamily: "OpenSansRegular",
    opacity: 0.7,
  },
  search: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  searchResultWrapper: {
    marginTop: 12,
    width: "100%",
    flex: 1,
  },
});
