import { Routes, Route, useLocation } from "react-router-dom"
import Home from "./pages/Home"

function App() {
  const location = useLocation()
  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App
