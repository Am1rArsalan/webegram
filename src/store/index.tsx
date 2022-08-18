import { Accessor, createContext, useContext } from "solid-js";
import { ParentProps, Resource } from "solid-js";
import { createStore } from "solid-js/store";
import { StoreType } from "../types/store";
import { ProfileType } from "../types/profile";
import createAgent from "./createAgent";
import createProfile, { ProfileActions } from "./createProfile";
import createUsers, { UsersActions } from "./createUsers";
import { UserType } from "../types/user";
import { DirectsType } from "../types/directs";
import createDirects, { DirectsActions } from "./createDirects";
import createSocketConnection, {
  SocketActions,
} from "./createSocketConnection";

export type Actions = ProfileActions &
  UsersActions &
  DirectsActions &
  SocketActions;

export type StoreContextType = [StoreType, Actions];

const StoreContext = createContext<StoreContextType>([
  {
    token: "",
    profile: undefined,
    users: [],
    directs: new Map(),
    socketConnection: false,
  },
  Object({}),
]);

export function Provider(props: ParentProps) {
  let profile: Resource<ProfileType | undefined>;
  let users: Resource<UserType[] | undefined>;
  let directs: Resource<DirectsType | undefined>;
  let socketConnection: Accessor<boolean>;

  const queryParams = new URLSearchParams(location.search);
  if (!localStorage.getItem("token") && queryParams.get("token")) {
    localStorage.setItem("token", queryParams.get("token") as string);
    const newUrl = `${window.location.pathname}`;
    history.pushState({ path: newUrl }, "", newUrl);
  }

  const [state, setState] = createStore<StoreType>({
    token: localStorage.getItem("token"),
    get profile() {
      return profile();
    },
    get directs() {
      const directsData = directs();
      return directsData ? directsData : new Map();
    },
    get users() {
      const usersData = users();
      return usersData ? usersData : [];
    },
    get socketConnection() {
      return socketConnection ? socketConnection() : false;
    },
  });

  // FIXME : as...
  const actions: Actions = Object({});
  const store: StoreContextType = [state as StoreType, actions];
  const agent = createAgent(store);
  profile = createProfile(actions, agent.profile, setState);
  users = createUsers(state as StoreType, actions, agent.users);
  directs = createDirects(state as StoreType, actions, agent.directs);

  if (state.token) {
    socketConnection = createSocketConnection(state as StoreType, actions);
  }

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const store = useContext(StoreContext);
  return store;
}
