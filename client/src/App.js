import Login from './components/login/login';
import Register from './components/Register/Register';
import Header from "./components/header/header"
import Createbook from "./components/Createbook/createbook"
import { BrowserRouter, Routes, Route } from "react-router-dom"
function App() {
  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Login />} ></Route>
        <Route path='/createbook' element={<Createbook />} ></Route>
        <Route path='/register' element={<Register />} >  </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
