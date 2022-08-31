import { Outlet, useNavigate } from 'solid-app-router';
import { createComputed, lazy, onCleanup, Show } from 'solid-js';
import { useStore } from '../store';
import styles from './styles/App.module.css';
const Sidebar = lazy(() => import('../components/Sidebar'));

function App() {
  const nav = useNavigate();
  const [store, { resetSocketConnection, loadDirects, loadRooms }] = useStore();

  if (!store.token) {
    nav('/auth');
  }

  createComputed(() => {
    const currUser = store.profile?.email ? store.profile.email : null;
    loadDirects(currUser);
    loadRooms(currUser);
  });

  onCleanup(() => {
    store.socketConnection && resetSocketConnection();
  });

  return (
    <div class={styles.App}>
      <Sidebar />
      <Show when={store.socketConnection} fallback={<h2 class={styles.socketConnection}>connecting...</h2>}>
        <h2 class={styles.socketConnection}> connected </h2>
      </Show>
      <Outlet />
    </div>
  );
}

export default App;
