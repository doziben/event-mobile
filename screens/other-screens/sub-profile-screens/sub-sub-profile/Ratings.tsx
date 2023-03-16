import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import EmptyReviews from "../../../../assets/illustrations/EmptyReviews";

export default function Ratings() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.emptyView}>
        <EmptyReviews />
        <Text style={styles.headingText}>No Reviews Yet</Text>
        <Text style={styles.bodyText}>Nobody has reviewed you yet...</Text>
      </View>
    </ScrollView>
  );
}

//** Outsource into a dedicated file */
function RatingContainer() {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <View style={styles.avatar}></View>
        <View>
          <Text
            style={{
              fontFamily: "OpenSansSemiBold",
              fontSize: 14,
              lineHeight: 24,
            }}
          >
            Maxi show 2021
          </Text>
          <View style={styles.rateData}>
            <Ionicons
              style={{ marginRight: 8 }}
              name="star-sharp"
              size={16}
              color="#DE8E0E"
            />
            <Text
              style={{
                marginRight: 8,
                fontFamily: "OpenSansSemiBold",
                fontSize: 14,
              }}
            >
              4.5
            </Text>
            <Text
              style={{
                color: "grey",
                fontFamily: "OpenSansRegular",
                fontSize: 14,
              }}
            >
              30 May, 2020
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.comment}>
        <Text style={styles.commentText}>
          "John performed very well, I will recommend"
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  emptyView: {
    marginVertical: 24,
    textAlign: "center",
    alignItems: "center",
  },
  headingText: {
    marginTop: 16,
    fontFamily: "OpenSansBold",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },

  bodyText: {
    color: "#767676",
    textAlign: "center",
    fontFamily: "OpenSansSemiBold",
    fontSize: 14,
    lineHeight: 24,
  },

  avatar: {
    width: 43,
    height: 43,
    borderRadius: 43,
    backgroundColor: "#212121",
    marginRight: 20,
  },

  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  rateData: {
    flexDirection: "row",
    alignItems: "center",
    lineHeight: 16,
  },

  comment: {
    marginTop: 20,
  },

  reviewContainer: {
    marginBottom: 15,
    padding: 20,
    elevation: 1,
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  commentText: {
    fontFamily: "OpenSansItalic",
    fontSize: 14,
    lineHeight: 24,
  },
});
