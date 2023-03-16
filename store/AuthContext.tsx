//** For managing auth everywhere */

import React, { useState } from "react";
import api, { deleteToken } from "../api";

export type YeveUser = "client" | "vendor";
interface AuthContextObj {
  authState: boolean;
  userState: YeveUser | undefined;
  signIn: (user: YeveUser) => void;
  signOut: () => void;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContext = React.createContext<AuthContextObj>({
  authState: false,
  userState: undefined,
  signIn: (user) => {},
  signOut: () => {},
});

export default function AuthContextProvider({
  children,
}: AuthContextProviderProps) {
  const [authState, setAuthState] = useState(false);
  const [userState, setUserState] = useState<undefined | YeveUser>(undefined);
  return (
    <AuthContext.Provider
      value={{
        authState,
        userState,
        signIn: (user) => {
          setUserState(user);
          setAuthState(true);
        },
        signOut: () => {
          setAuthState(false);
          setUserState(undefined);
          api.post("/users/signout");
          deleteToken("_accessToken");
          deleteToken("_refreshToken");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
