/* eslint-disable no-unused-vars */
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import News from "./components/News/News";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<News />} />
          <Route path="/:category" element={<News />} />
          {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
