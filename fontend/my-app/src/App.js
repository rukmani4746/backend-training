import "./App.css";
import Homepage from "./component/homepage/homepage";
import Login from "./component/login/login";
import Register from "./component/register/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";



function App() {
  const [mode, setmode] = useState("light");
  const changeMode = () => {
    if (mode === "light") {
      setmode("dark");
      document.body.style.backgroundColor = "black";
    } else {
      setmode("light");
      document.body.style.backgroundColor = "white";
    }
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Homepage
            title="TextUtils"
            Home="Home"
            mode={mode}
            changeMode={changeMode} />
          </>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}
export default App;
