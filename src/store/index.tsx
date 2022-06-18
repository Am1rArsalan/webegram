import { Component, createContext, useContext } from "solid-js";
import { ParentProps, Resource } from "solid-js";
import { createStore } from "solid-js/store";
import { StoreType } from "../types/store";
import { ProfileType } from "../types/profile";
import createAgent from "./createAgent";
import createProfile, { ProfileActions } from "./createProfile";
import createUsers, { UsersActions } from "./createUsers";
import { UserType } from "../types/user";
import { DirectType } from "../types/direct";
import createDirects, { DirectActions } from "./createDirects";

export type Actions = ProfileActions & UsersActions & DirectActions;

export type StoreContextType = [StoreType, Actions];

const StoreContext = createContext<StoreContextType>();

export const Provider: Component<ParentProps> = (props) => {
  let profile: Resource<ProfileType | undefined>;
  let users: Resource<UserType[] | undefined>;
  let directs: Resource<DirectType[] | undefined>;

  const queryParams = new URLSearchParams(location.search);
  if (!localStorage.getItem("token") && queryParams.get("token")) {
    localStorage.setItem("token", queryParams.get("token") as string);
    const newUrl = `${window.location.pathname}`;
    history.pushState({ path: newUrl }, "", newUrl);
  }

  const [state] = createStore<StoreType>({
    token: localStorage.getItem("token"),
    get profile() {
      return profile;
    },
    get users() {
      return users;
    },
    get directs() {
      return directs;
    },
  });

  const actions: Actions = Object({});
  const store: StoreContextType = [state, actions];
  const agent = createAgent(store);
  profile = createProfile(actions, agent.profile);
  users = createUsers(actions, agent.users);
  users = createDirects(actions, agent.directs);

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export function useStore() {
  const store = useContext(StoreContext);
  return store as StoreContextType;
}
