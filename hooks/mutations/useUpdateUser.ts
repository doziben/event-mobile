import { useMutation, useQueryClient } from "react-query";
import api from "../../api";
import { currentUserDataObj } from "../../types/api/currentUserDataObj";
import useUser from "../queries/useUser";

export default function useUpdateUser(uid?: string) {
  const queryClient = useQueryClient();
  const { data } = useUser();
  const userData = data as currentUserDataObj;

  return useMutation(
    (obj: object) =>
      api.patch(`users/${uid ?? userData._id}`, { ...obj }).then((r) => r.data),
    {
      onSuccess: () => queryClient.invalidateQueries("current-user"),
    }
  );
}
