import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import Navbar from "./components/navbar/Navbar";
import {BrowserRouter} from "react-router-dom";;


const navbar = ReactDOM.createRoot(document.getElementById('navbar'));
navbar.render(
    <React.StrictMode>
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    </React.StrictMode>
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <App />
  </React.StrictMode>
);
