import { Outlet, useNavigate } from "solid-app-router";
import { createComputed, lazy, onCleanup, Show, Suspense } from "solid-js";
import { useStore } from "../store";
import styles from "./styles/App.module.css";
const Sidebar = lazy(() => import("../components/Sidebar"));

function App() {
  const nav = useNavigate();
  const [store, { resetSocketConnection, loadDirects, loadRooms }] = useStore();
  let popoverContainerRef;

  if (!store.token) {
    nav("/auth");
  }

  createComputed(() => {
    const currUser = store.profile?.email ? store.profile.email : null;
    loadDirects(currUser);
    loadRooms(currUser);
  });

  onCleanup(() => {
    store.socketConnection && resetSocketConnection();
  });

  // TODO: add skeleton for the sidebar
  return (
    <div class={styles.App}>
      <div class={styles.Nav} ref={popoverContainerRef}>
        <Suspense fallback={"loading...."}>
          <Sidebar popoverContainerRef={popoverContainerRef} />
        </Suspense>
      </div>
      <Show
        when={store.socketConnection}
        fallback={<h2 class={styles.socketConnection}>connecting...</h2>}
      >
        <h2 class={styles.socketConnection}> connected </h2>
      </Show>
      <Outlet />
    </div>
  );
}

export default App;
