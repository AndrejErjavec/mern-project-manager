import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './css/index.css';

function App() {

  return (
    <main>
      <Router>
        <div className="container">
          <Routes>
            <Route path='/' element={<Dashboard/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer></ToastContainer>
    </main>
  );
}

export default App;
