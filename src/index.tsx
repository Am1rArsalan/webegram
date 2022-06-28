import { render } from "solid-js/web";

import "./index.css";
import App from "./screens/App";
import { Provider, useStore } from "./store/";
import { Router, Route, Routes, useNavigate } from "solid-app-router";
import Auth from "./screens/Auth";
import Channel from "./components/Channel";
import Welcome from "./components/Welcome";
import DirectChat from "./components/DirectChat";
import { createComputed, createSignal, Show } from "solid-js";

const AppWithAuth = () => {
  const nav = useNavigate();
  const [store, { loadProfile }] = useStore();

  if (!store.token?.length) {
    nav("/auth");
  }

  const [appLoaded, setAppLoaded] = createSignal(false);

  createComputed(() => {
    loadProfile(store.token);
    store.profile && setAppLoaded(true);
  });

  return (
    <Show when={appLoaded()}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="channel/:name" element={<Channel />} />
          <Route path="user/:email" element={<DirectChat />} />
          <Route path="*" element={<Welcome />} />
        </Route>
        <Route path="auth" element={<Auth />} />
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
  document.getElementById("root") as HTMLElement
);
