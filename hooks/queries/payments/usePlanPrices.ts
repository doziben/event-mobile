import { useQuery } from "react-query";
import api from "../../../api";

export default function usePlanPrices() {
  return useQuery(["plan-prices"], () =>
    api
      .get("/payments/getplanprice")
      .then((r) => r.data)
      .catch((e) => console.log("plan", e))
  );
}
