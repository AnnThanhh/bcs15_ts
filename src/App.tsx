import "./assets/index.scss";
import { createBrowserHistory } from "history";
import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeTemplate from "./template/HomeTemplate";
import Home from "./pages/Home/Home";
import Details from "./pages/Details/Details";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import { store } from "./redux/store";
import { Provider } from "react-redux";

export const history: any = createBrowserHistory();

function App() {
  return (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path="" element={<HomeTemplate />}>
            <Route index element={<Home />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="cart" element={<Cart />}></Route>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="search" element={<Search />}></Route>
            <Route path="detail">
              <Route path=":id" element={<Details />}></Route>
            </Route>
            <Route path="*" element={<Navigate to={"/"} />}></Route>
          </Route>
        </Routes>
      </HistoryRouter>
    </Provider>
  );
}

export default App;
