import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';

import { ToastContainer } from 'react-toastify';//for notification
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';

function App(){
  return (
    <>
    <Routes>
      <Route path="/" element={< HomePage />} />
      <Route path="/dashboard" element={<PrivateRoute/>}>
      <Route path="" element={< Dashboard />} />
      </Route>
     
      <Route path="/register" element={ <Register />} />
      <Route path="/login" element={ <Login />} />
      <Route path="/about" element={< About />} />
      <Route path="/contact" element={< Contact />} />
      <Route path="/policy" element={< Policy />} />
      <Route path="/*" element={< Pagenotfound />} />
     
  
    </Routes>
    <ToastContainer />
    </>
  )
}

export default App;