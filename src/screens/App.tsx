import { Outlet } from "solid-app-router";
import { Component, lazy, onCleanup, Show } from "solid-js";
import { useStore } from "../store";
import styles from "./styles/App.module.css";
const Sidebar = lazy(() => import("../components/Sidebar"));

const App: Component = () => {
  const [store, { resetSocketConnection }] = useStore();

  onCleanup(() => {
    resetSocketConnection();
  });

  return (
    <div class={styles.App}>
      <Sidebar />
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
