import { View, FlatList } from "react-native";
import EmptySocial from "../../assets/illustrations/EmptySocial";
import useUserPosts from "../../hooks/queries/useUserPosts";
import EmptyState from "../Interface/EmptyState";
import LoadingComp from "../Interface/LoadingComp";
import PostBox from "./PostBox";

export default function UserPosts({ navigation, route }) {
  const { userId } = route?.params;
  const { data, isLoading } = useUserPosts(userId);
  const dataIsValid = Array.isArray(data) && data.length > 0;

  return (
    <View style={{}}>
      {isLoading ? (
        <LoadingComp />
      ) : (
        <>
          {dataIsValid && (
            <FlatList
              data={data}
              renderItem={({ item }) => {
                return <PostBox />;
              }}
            />
          )}

          {!dataIsValid && (
            <EmptyState
              illustration={<EmptySocial />}
              message="They haven't created any posts yet"
              title="No Posts Yet"
            />
          )}
        </>
      )}
    </View>
  );
}
