import { useMutation, useQueryClient } from "react-query";
import api from "../../../api";
import { FlwWithdrawalDto } from "../../../types/api/flwWithdrawalDto";

export default function useFlwWithdrawal() {
  const q = useQueryClient();
  return useMutation(
    (data: FlwWithdrawalDto) =>
      api.post("/payments/flw/transfer", data).then((r) => r.data),
    { onSuccess: () => q.invalidateQueries(["current-user"]) }
  );
}
