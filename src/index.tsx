import { render } from 'solid-js/web';
import { createComputed, createSignal, lazy, onCleanup, Show } from 'solid-js';
import './index.css';
import App from './screens/App';
import { Provider, useStore } from './store/';
import { Router, Route, Routes } from '@solidjs/router';
import Auth from './screens/Auth';
import Welcome from './components/Welcome';

const DirectChat = lazy(() => import('./components/DirectChat'));
const Channel = lazy(() => import('./components/Channel'));

const AppWithAuth = () => {
	const [store, { loadProfile, resetSocketConnection }] = useStore();
	const [appLoaded, setAppLoaded] = createSignal(false);

	if (!store.token) {
		setAppLoaded(true);
	} else {
		loadProfile(store.token);
		createComputed(() => {
			if (store.profile) {
				setAppLoaded(true);
			}
		});
	}

	onCleanup(() => {
		resetSocketConnection();
	});

	return (
		<Show when={appLoaded()}>
			<Routes>
				<Route
					path="/"
					component={App}
					data={() => {
						/// ...
					}}
				>
					<Route path="channel/:slug" component={Channel} />
					<Route path="user/:email" component={DirectChat} />
					<Route path="*" component={Welcome} />
				</Route>
				<Route path="auth" component={Auth} />
			</Routes>
		</Show>
	);
};

render(
	() => (
		<Provider>
			<Router>
				<AppWithAuth />
			</Router>
		</Provider>
	),
	document.getElementById('root') as HTMLElement
);
