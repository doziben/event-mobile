import { View, FlatList } from "react-native";
import EmptyReviews from "../../assets/illustrations/EmptyReviews";
import EmptySocial from "../../assets/illustrations/EmptySocial";
import useUserPosts from "../../hooks/queries/useUserPosts";
import EmptyState from "../Interface/EmptyState";
import LoadingComp from "../Interface/LoadingComp";
import PostBox from "./PostBox";

export default function UserReviews({ navigation, route }) {
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
                return <></>; //reviews
              }}
            />
          )}

          {!dataIsValid && (
            <EmptyState
              illustration={<EmptyReviews />}
              message="Nobody has reviewed them yet..."
              title="No Reviews Yet"
            />
          )}
        </>
      )}
    </View>
  );
}
