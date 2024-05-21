import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { JoinScreen } from "./components/join-screen/JoinScreen";
import { RecoilRoot } from "recoil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "room",
    element: <JoinScreen />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
  <RouterProvider router={router} />
  </RecoilRoot>
);
