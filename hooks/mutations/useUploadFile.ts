import { useMutation, useQueryClient } from "react-query";
import api from "../../api";

interface fileData {
  file: string;
  fileName: string;
  userId: string;
}

export default function useUploadFile(key: string) {
  const queryClient = useQueryClient();
  return useMutation(
    (data: fileData) =>
      api
        .post("/file-upload", data)
        .then((r) => r.data)
        .catch((e) => e),
    { onSuccess: () => queryClient.invalidateQueries([key]) }
  );
}
