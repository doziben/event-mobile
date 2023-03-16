import { useQuery } from "react-query";
import api from "../../api";
import useUser from "./useUser";

export default function useCalendar(userId?: string) {
  const { data } = useUser();

  const id = userId ?? data?._id;

  return useQuery(["calendar"], async () =>
    api.get(`/calendar/${id}`).then((r) => r.data)
  );
}
