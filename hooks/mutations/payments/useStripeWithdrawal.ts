import { useMutation, useQueryClient } from "react-query";
import api from "../../../api";

interface StripeWithdrawalDto {
  amount: number;
  currency: "GBP";
  destination: string /** Stripe Connect Id */;
  userId?: string;
  paymentType: "PAYOUT";
  account_bank?: string;
  account_number?: string;
  trx_ref: string /** UserId + current Date */;
  phone: string;
}

export default function useStripeWithdrawal() {
  const q = useQueryClient();
  return useMutation(
    (data?: StripeWithdrawalDto) =>
      api.post(`/payments/stripewithdrawal`, data).then((r) => r.data),
    { onSuccess: () => q.invalidateQueries("stripe") }
  );
}
