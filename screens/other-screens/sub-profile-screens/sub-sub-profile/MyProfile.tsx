import React from "react";
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
} from "react-native";
import EmptySocial from "../../../../assets/illustrations/EmptySocial";
import EmptyState from "../../../../components/Interface/EmptyState";
import LoadingComp from "../../../../components/Interface/LoadingComp";
import PostBox from "../../../../components/social/PostBox";
import useUserPosts from "../../../../hooks/queries/useUserPosts";
import { PostsDataObj } from "../../../../types/api/postsDataObj";

export default function MyProfile() {
  const { data, isLoading } = useUserPosts();
  const dataIsValid = Array.isArray(data) && data.length > 0;

  return (
    <View style={styles.container}>
      {/* Modals */}
      {isLoading && <LoadingComp />}

      {/*Main  */}
      {dataIsValid ? (
        <FlatList
          data={data as PostsDataObj[]}
          renderItem={(value) => {
            const { item, index } = value;
            return <PostBox />;
          }}
          keyExtractor={(item) => item.title}
        />
      ) : (
        <EmptyState
          illustration={<EmptySocial />}
          message="You haven't created any posts yet"
          title="No Posts Yet"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
