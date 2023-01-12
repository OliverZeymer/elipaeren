import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import IpContext from "./contexts/IpContext";
import { useContext, useEffect, useState } from "react";
import { getCookie } from "react-use-cookie";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const tokenContext = useContext(TokenContext);
  const [token, setToken] = useState(null);
  const [bridgeIpContext, setBridgeIpContext] = useState(null);

  useEffect(() => {
    const tokenCookie = getCookie("hueToken");
    const bridgeIpCookie = getCookie("bridgeIp");
    if (tokenCookie) {
      setToken(tokenCookie);
      setBridgeIpContext(bridgeIpCookie);
    }
  }, []);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      <IpContext.Provider value={{ bridgeIpContext, setBridgeIpContext }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {!token ? (
              <Route path="/" element={<ConnectLayout />}>
                <Route index element={<Connect />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Error />} />
              </Route>
            ) : (
              <>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="/lights" element={<Lights />} />
                  <Route path="/rooms" element={<Rooms />} />
                  <Route path="/room/:roomId" element={<RoomPage />} />
                  <Route path="/light/:lightId" element={<LightPage />} />
                </Route>
                <Route
                  path="*"
                  element={
                    <ConnectLayout>
                      <Error />
                    </ConnectLayout>
                  }
                />
              </>
            )}
          </Routes>
        </AnimatePresence>
      </IpContext.Provider>
    </TokenContext.Provider>
  );
}

export default App;
