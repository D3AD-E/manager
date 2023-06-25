import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { MainPage } from "./../../pages/index";
import { TokenPage } from "../../pages/tokenPage";
import { Header } from "../header";
import { TokensPage } from "../../pages/tokensPage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Router: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/tokens/:id" element={<TokenPage />} />
        <Route path="/tokens" element={<TokensPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default Router;
