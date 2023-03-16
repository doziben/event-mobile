import { useQuery } from "react-query";
import api from "../../../api";

export default function useBanks(country: string) {
  return useQuery(
    ["banks", country],
    () =>
      api
        .get(`/payments/flw/banks/${country}`)
        .then((r) => r.data)
        .catch((e) => e),
    {
      enabled: !!country,
    }
  );
}
