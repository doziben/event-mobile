import { useMutation, useQueryClient } from "react-query";
import api from "../../api";
import { CalendarObj } from "../../types/api/calendarDataObj";

export default function useCreateCalendar() {
  const queryClient = useQueryClient();

  return useMutation(
    (data: CalendarObj) =>
      api
        .post(`/calendar`, data)
        .then((r) => r.data)
        .catch((e) => e),
    {
      onSuccess: () => queryClient.invalidateQueries(["calendar"]),
    }
  );
}
