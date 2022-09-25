import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./view/Dashboard";
import Login from "./view/Login";
import Navbar from "./view/Navbar";
import Register from "./view/Register";
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={
          <>
            <Navbar/>
            <Dashboard/>
          </>
        }/>
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;