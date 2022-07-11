import { Outlet, useNavigate } from "solid-app-router";
import { Component, lazy, onCleanup, Show } from "solid-js";
import { useStore } from "../store";
import styles from "./styles/App.module.css";

const Sidebar = lazy(() => import("../components/Sidebar"));

const App: Component = () => {
  const nav = useNavigate();
  const [store, { resetSocketConnection }] = useStore();

  if (!store.token) {
    nav("/auth");
  }

  onCleanup(() => {
    store.socketConnection && resetSocketConnection();
  });

  return (
    <div class={styles.App}>
      <Sidebar />
      <Show
        when={store.socketConnection}
        fallback={<h2 class={styles.socketConnection}>connecting...</h2>}
      >
        <h2 class={styles.socketConnection}> connected </h2>
      </Show>
      <Outlet />
    </div>
  );
};

export default App;
