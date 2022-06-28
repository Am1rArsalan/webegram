import { Accessor, Component, createContext, useContext } from "solid-js";
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
import createDirect, { DirectActions } from "./createDirect";
import { DirectType } from "../types/direct";

export type Actions = ProfileActions &
  UsersActions &
  DirectsActions &
  DirectActions &
  SocketActions;

export type StoreContextType = [StoreType, Actions];

const StoreContext = createContext<StoreContextType>([
  {
    token: "",
    profile: undefined,
    users: [],
    directs: undefined,
    direct: [],
    socketConnection: false,
  },
  Object({}),
]);

export const Provider: Component<ParentProps> = (props) => {
  let profile: Resource<ProfileType | undefined>;
  let users: Resource<UserType[] | undefined>;
  let directs: Resource<DirectsType | undefined>;
  let direct: Resource<DirectType[] | undefined>;
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
      return directsData;
    },
    get direct() {
      const directData = direct();
      console.log(directData);
      return direct;
    },
    get users() {
      const usersData = users();
      return users;
      //return usersData ? usersData : [];
    },
    get socketConnection() {
      return socketConnection();
    },
  });

  const actions: Actions = Object({});
  const store: StoreContextType = [state, actions];
  const agent = createAgent(store);
  profile = createProfile(actions, agent.profile, setState);
  users = createUsers(actions, agent.users);
  directs = createDirects(state, actions, agent.directs);
  direct = createDirect(state, actions, agent.direct);

  socketConnection = createSocketConnection(state, actions);

  return (
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export function useStore() {
  const store = useContext(StoreContext);
  return store;
}
