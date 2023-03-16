import React, { useContext } from "react";
import AuthNav from "./screens/auth-screens/AuthNav";
import LoggedInScreen from "./LoggedInScreen";
import { AuthContext } from "./store/AuthContext";

export default function Main() {
  const authCtx = useContext(AuthContext);
  const isAuthorized = authCtx.authState;
  const currentUser = authCtx.userState;

  return (
    <>
      {isAuthorized ? (
        <LoggedInScreen currentUser={currentUser} />
      ) : (
        <AuthNav />
      )}
    </>
  );
}
