import { useQuery } from "react-query";
import api from "../../../api";

export type DressCodeDto = {
  _id: string;
  banner: string;
  name: string;
  status: boolean;
};

export default function useDressCodes() {
  return useQuery(["dresscodes"], () =>
    api
      .get("/admin/dresscodes")
      .then((r) => r.data as DressCodeDto[])
      .catch((e) => console.log("dresscodes", e))
  );
}

// when logged out => save details =>  and use saved details to connect with socket
