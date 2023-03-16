import { useContext, useState } from "react";
import api from "../../api";
import { AuthContext } from "../../store/AuthContext";
import { currentUserDataObj } from "../../types/api/currentUserDataObj";

type isAuthTrueFn = (userData: currentUserDataObj) => void;

export default function useCurrentUser(isAuthTrueFn: isAuthTrueFn) {
  const authCtx = useContext(AuthContext);
  const { signOut } = authCtx;

  const [isLoading, setIsLoading] = useState(false);

  function getUser() {
    setIsLoading(true);
    api
      .get("users/current")
      .then((res) => {
        setIsLoading(false);
        if (res.status === 200) {
          isAuthTrueFn(res.data);
        } else {
          signOut();
        }
      })
      .catch((err) => {
        setIsLoading(false);
        signOut();
        console.log("couldln't get user", err);
      });
  }

  return { isLoading, getUser };
}
