import { Outlet } from "solid-app-router";
import {
  Component,
  createComputed,
  createSignal,
  onCleanup,
  Show,
} from "solid-js";
import { useStore } from "../store";
import styles from "./styles/App.module.css";
import Sidebar from "../components/Sidebar";

const App: Component = () => {
  const [store, { loadProfile, resetSocketConnection }] = useStore();
  const [sidebarLoaded, setSidebarLoaded] = createSignal(false);

  const appLoaded = () => sidebarLoaded();

  createComputed(() => {
    loadProfile(store.token);
    store.profile && setSidebarLoaded(true);
  });

  createComputed(() => {});

  onCleanup(() => {
    resetSocketConnection();
  });

  return (
    <div class={styles.App}>
      <Show when={appLoaded()}>
        <Sidebar />
      </Show>

      <Show
        when={store.socketConnection}
        fallback={
          <h2 style={{ position: "fixed", bottom: "10px" }}>connecting...</h2>
        }
      >
        <h2 style={{ position: "fixed", bottom: "10px" }}> connected </h2>
      </Show>

      <Outlet />
    </div>
  );
};

export default App;
