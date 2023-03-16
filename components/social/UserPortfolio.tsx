import { View, StyleSheet } from "react-native";
import EmptyUser from "../../assets/illustrations/EmptyUser";
import useUser from "../../hooks/queries/useUser";
import EmptyState from "../Interface/EmptyState";
import LoadingComp from "../Interface/LoadingComp";
import YoutubePlayer from "react-native-youtube-iframe";
import { extractYoutubeId } from "../../screens/other-screens/sub-profile-screens/sub-sub-profile/Portfolio";
import HeadingText from "../Interface/HeadingText";

export default function UserPortfolio({ navigation, route }) {
  const { userId } = route?.params;
  const { data, isLoading } = useUser(userId);

  const portfolioUrl = data?.portfolioUrl;
  const hasPortfolioSet = portfolioUrl?.length > 4;

  const urlId = extractYoutubeId(portfolioUrl);

  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 32 }}>
      <HeadingText lg> Portfolio Video</HeadingText>

      {isLoading && <LoadingComp />}
      {hasPortfolioSet ? (
        <View style={styles.video}>
          <YoutubePlayer height={300} videoId={urlId} />
        </View>
      ) : (
        <EmptyState
          illustration={<EmptyUser />}
          title={`No Portfolio yet`}
          message="No portfolio for this user yet"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  video: {
    marginTop: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
});
