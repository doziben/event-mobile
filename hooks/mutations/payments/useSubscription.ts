import { useMutation, useQueryClient } from "react-query";
import api from "../../../api";

export type SubscriptionDto = {
  userId: string;
  paymentType: "SUBSCRIPTION" | "PAYOUT" | "PAYMENT";
  status: string;
  amount?: number;
  trx_ref: string;
  plan: "premium" | "elite";
  plan_expiry: string;
  Interval: "MONTHLY" | "YEARLY";
  card_number: string;
  expiry_month: string;
  expiry_year: string;
  cvv: string;
  name: string;
  email: string;
  currency: "NGN" | "USD";
};

export default function useSubscription() {
  return useMutation(
    async (data: SubscriptionDto) => api.post(`/payments/subscription`, data),
    {
      onSuccess: () =>
        useQueryClient().invalidateQueries(["user", "current-user"]),
    }
  );
}
