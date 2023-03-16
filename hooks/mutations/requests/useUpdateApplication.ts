import { useMutation, useQueryClient } from "react-query";
import api from "../../../api";

type status = "pending" | "accepted" | "rejected" | any;

export default function useUpdateApplication(applicationId: string) {
  const queryClient = useQueryClient();
  return useMutation(
    async (status?: status) =>
      api
        .patch(
          `/service-request/application/update/${applicationId}`,
          typeof status !== "string" ? { ...status } : { status }
        )
        .then((r) => r.data),
    {
      onSuccess: () => queryClient.invalidateQueries(["requests"]),
    }
  );
}
