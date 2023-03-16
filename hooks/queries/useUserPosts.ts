import { useQuery } from "react-query";
import api from "../../api";
import { currentUserDataObj } from "../../types/api/currentUserDataObj";
import { PostsDataObj } from "../../types/api/postsDataObj";
import useUser from "./useUser";

export default function useUserPosts(id?: string) {
  const user = useUser();
  const userData = user?.data as currentUserDataObj;
  const uid = id ?? userData?._id;

  return useQuery(
    ["posts"],
    () =>
      api.get(`/users/post/${uid}`).then((res) => res.data as PostsDataObj[]),
    {
      enabled: !!uid,
    }
  );
}
