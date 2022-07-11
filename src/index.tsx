import { render } from "solid-js/web";
import { createComputed } from "solid-js";
import "./index.css";
import App from "./screens/App";
import { Provider, useStore } from "./store/";
import { Router, Route, Routes } from "solid-app-router";
import Auth from "./screens/Auth";
import Welcome from "./components/Welcome";
import Channel from "./components/Channel";
import DirectChat from "./components/DirectChat";

const AppWithAuth = () => {
  const [store, { loadProfile }] = useStore();

  createComputed(() => {
    loadProfile(store.token);
  });

  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="channel/:name" element={<Channel />} />
        <Route path="user/:email" element={<DirectChat />} />
        <Route path="*" element={<Welcome />} />
      </Route>
      <Route path="auth" element={<Auth />} />
    </Routes>
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
