import { useQuery } from "react-query";
import api from "../../api";
import useUser from "./useUser";

export default function useNotifications() {
  const { data } = useUser();
  return useQuery(
    ["notifications"],
    () => api.get(`/notifications/user/${data?._id}`).then((res) => res.data),
    {
      enabled: !!data,
      staleTime: 10,
    }
  );
}
