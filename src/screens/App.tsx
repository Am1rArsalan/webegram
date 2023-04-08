import { Outlet, useNavigate } from '@solidjs/router';
import { createComputed, createSignal, lazy, Show } from 'solid-js';
import { useStore } from '../store';
import styles from './styles/App.module.css';

// Why ....
const Sidebar = lazy(() => import('../components/Sidebar'));

function App() {
	const nav = useNavigate();
	const [store, { loadDirects, loadRooms }] = useStore();
	const [contentLoaded, setContentLoaded] = createSignal(false);

	if (!store.token) {
		nav('/auth');
	} else {
		const currUser = store.profile?.email ? store.profile.email : null;
		createComputed(() => {
			// ****
			// this is wrong
			// ****
			loadDirects(currUser);
			loadRooms(currUser);

			// TODO: Change this later ...
			if (store.rooms.length > 0) {
				setContentLoaded(true);
			}
		});
	}

	// TODO use skeleton instead of loading....
	return (
		<div class={styles.App}>
			<Sidebar />
			<Show
				when={store.socket.connectionStatus}
				fallback={<h2 class={styles.socketConnection}>connecting...</h2>}
			>
				<h2 class={styles.socketConnection}> connected </h2>
			</Show>
			<Show when={contentLoaded()}>
				<Outlet />
			</Show>
		</div>
	);
}

export default App;
