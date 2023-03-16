import { useQuery } from "react-query";
import api from "../../api";
import { currentUserDataObj } from "../../types/api/currentUserDataObj";

export default function useUser(id?: string) {
  const query = id ?? "current";
  async function getCurrentUser() {
    const response = await api.get(`users/${query}`);
    return response.data as currentUserDataObj;
  }

  return useQuery([id ?? "current-user"], getCurrentUser);
}
