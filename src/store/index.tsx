import { Component, createContext, useContext } from "solid-js";
import { ParentProps, Resource } from "solid-js";
import { createStore } from "solid-js/store";
import { StoreType } from "../types/store";
import { UserType } from "../types/user";
import createAgent from "./createAgent";
import createUser, { UserActions } from "./createUser";

export type Actions = UserActions;

export type StoreContextType = [StoreType, Actions];

const StoreContext = createContext<StoreContextType>();

export const Provider: Component<ParentProps> = (props) => {
  let user: Resource<UserType | undefined>;

  const queryParams = new URLSearchParams(location.search);
  if (!localStorage.getItem("token") && queryParams.get("token")) {
    localStorage.setItem("token", queryParams.get("token") as string);
    const newUrl = `${window.location.pathname}`;
    history.pushState({ path: newUrl }, "", newUrl);
  }

  const [state] = createStore<StoreType>({
    token: localStorage.getItem("token"),
    get user() {
      return user;
    },
  });

  const actions: Actions = Object({});
  const store: StoreContextType = [state, actions];
  const agent = createAgent(store);
  user = createUser(actions, agent.user);

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
