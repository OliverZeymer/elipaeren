import { Routes, Route, useLocation } from "react-router-dom";
import Connect from "./pages/Connect";
import ConnectLayout from "./ConnectLayout";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Lights from "./pages/Lights";
import Rooms from "./pages/Rooms";
import RoomPage from "./pages/RoomPage";
import LightPage from "./pages/LightPage";
import TokenContext from "./contexts/TokenContext";
import { useContext, useState } from "react";

function App() {
  const location = useLocation();
  const tokenContext = useContext(TokenContext);
  const [token, setToken] = useState(null);
  return (
    <TokenContext.Provider value={(token, setToken)}>
      <Routes location={location} key={location.pathname}>
        {!token ? (
          <Route path="/" element={<ConnectLayout />}>
            <Route index element={<Connect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/error" element={<Error />} />
          </Route>
        ) : (
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/lights" element={<Lights />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/room/:roomId" element={<RoomPage />} />
            <Route path="/light/:lightId" element={<LightPage />} />
          </Route>
        )}
      </Routes>
    </TokenContext.Provider>
  );
}

export default App;
