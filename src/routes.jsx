import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./components/home/Home";
import Coin from "./components/coin/Coin";
import Favorites from "./components/favorites/Favorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "coin/:id", element: <Coin /> },
     { path: "favorites", element: <Favorites /> },
    ],
  },
]);

export default router;