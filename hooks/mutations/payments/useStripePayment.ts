import { useMutation, useQueryClient } from "react-query";
import api from "../../../api";
import { SubscriptionDto } from "./useSubscription";

export default function useStripePayment() {
  const q = useQueryClient();
  return useMutation(
    (data: SubscriptionDto) =>
      api.post(`/payments/stripe`, data).then((r) => r.data),
    {
      onSuccess: () => q.invalidateQueries(["service-requests"]),
    }
  );
}
