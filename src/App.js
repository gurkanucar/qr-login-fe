import logo from "./logo.svg";
import "./App.css";
import HomePage from "./page/HomePage/HomePage";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import NotFoundPage from "./page/NotFoundPage/NotFoundPage";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import LoginPage from "./page/LoginPage/LoginPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/home" element={<HomePage />} />

          {/* <Route path="/addresses/details/:id" element={<DetailPage />} /> */}
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
