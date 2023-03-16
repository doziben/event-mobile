import { useMutation } from "react-query";
import api from "../../../api";

export default function useStripeConnect(url: string) {
  return useMutation(() =>
    api
      .post(`/payments/stripe/connect?url=${url}`, {
        url,
      })
      .then((r: any) => {
        return r.data;
      })
  );
}
