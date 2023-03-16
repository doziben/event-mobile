import { useQuery } from "react-query";
import api from "../../../api";

const getStripeAccount = async (user: string) => {
  const res = await api.get(`/payments/stripe/account?user=${user}`);
  return res.data;
};

export default function useStripeAccount(user: string) {
  return useQuery(["stripe-account"], () => getStripeAccount(user), {
    enabled: !!user,
  });
}
