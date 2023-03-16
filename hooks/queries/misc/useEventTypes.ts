import { useQuery } from "react-query";
import api from "../../../api";
import { DressCodeDto } from "./useDressCodes";

export default function useEventTypes() {
  return useQuery(["event-types"], () =>
    api
      .get("/admin/event_types")
      .then((r) => r.data as DressCodeDto[])
      .catch((r) => {
        console.log("event types", r);
      })
  );
}
