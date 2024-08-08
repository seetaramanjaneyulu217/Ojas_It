import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/admin" element={<Admin/>} />
    </Routes>
  )
}

export default App;
