import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignIn from './pages/login';
import Dashboard from './pages/dashboard';
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
    <ToastContainer position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light" />
   <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<SignIn/>} />
      <Route  path="/dashboard" element={<Dashboard />} />
    </Routes>
   </BrowserRouter>
    </Fragment>
  );
}

export default App;
