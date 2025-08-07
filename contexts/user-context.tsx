"use client";

import { createContext, ReactNode, useContext } from "react";

const UserContext = createContext<User>({} as User);

type Props = {
  children: ReactNode;
  user: User;
};

function UserProvider({ user, children }: Props) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

function useCurrentUser() {
  const context = useContext(UserContext);

  if (!context) throw new Error("UserContext is used outside of UserProvider!");

  return context;
}

export { UserProvider, useCurrentUser };
