import { Outlet, useNavigate } from "solid-app-router";
import {
  Component,
  createComputed,
  lazy,
  onCleanup,
  Show,
  Suspense,
} from "solid-js";
import { useStore } from "../store";
import styles from "./styles/App.module.css";
const Sidebar = lazy(() => import("../components/Sidebar"));

const App: Component = () => {
  const nav = useNavigate();
  const [store, { resetSocketConnection, loadDirects }] = useStore();

  if (!store.token) {
    nav("/auth");
  }

  createComputed(() => {
    loadDirects(store.profile?.email ? store.profile?.email : null);
  });

  onCleanup(() => {
    store.socketConnection && resetSocketConnection();
  });

  return (
    <div class={styles.App}>
      <Suspense fallback={"loading...."}>
        <Sidebar />
      </Suspense>
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
