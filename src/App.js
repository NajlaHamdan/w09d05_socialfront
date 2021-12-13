import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Confirm from "./components/Confirm";
import {Routes,Route} from "react-router-dom";
import ForgetPassword from "./components/ForgetPassword";
import Home from "./components/Home";
function App() {

  return (
    <div className="App">
      <header className="App-header">
        {/* <Login /> */}
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/confirmAccount/:email" element={<Confirm />} />
          <Route exact path="/" element={<Register />} />
          <Route exact path="/forgetPassword" element={<ForgetPassword />} />
          <Route exact path="/home" element={<Home />} />
          {/* <Route exact path="/admin" element={<Admin />} /> */}
        </Routes>
        {/* <Register /> */}
      </header>
    </div>
  );
}

export default App;
