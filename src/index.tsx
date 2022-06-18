import { render } from "solid-js/web";

import "./index.css";
import App from "./screens/App";
import { Provider, useStore } from "./store/";
import { Router, Route, Routes, useNavigate } from "solid-app-router";
import Auth from "./screens/Auth";
import Channel from "./components/Channel";
import Welcome from "./components/Welcome";
import DirectChat from "./components/DirectChat";

const AppWithAuth = () => {
  const nav = useNavigate();
  const [{ token }, { addToDirects }] = useStore();

  if (!token?.length) {
    nav("/auth");
  }

  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="channel/:name" element={<Channel />} />
        <Route
          path="user/:username"
          data={(route) => {
            console.log(route);
            //addToDirects();
            // TODO : fetch chats
            // TODO : return chats
            return [];
          }}
          element={<DirectChat />}
        />
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
