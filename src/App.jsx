// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import LoanTypesRouting from "./routingPages/LoanTypesRouting";
import PersonalLoanBanner from "./LoanPagesBanners/PersonalLoanBanner";
import Footer from "./Components/Footer";

import AutoSellValuation from "./LoanForms/forms/components/AutoSellForm/AutoSellValuation";
import BikeValuationLoan from "./LoanForms/forms/components/BikeSellLoanForm/BikeValuationLoan";

// 🧩 Common layout for pages that should show Nav + Home
const MainLayout = () => (
  <div className="w-full min-h-screen bg-gray-100">
    <Nav />
    <Home />
    <Footer />
  </div>
);

const App = () => {
  return (
    <Routes>
      {/* 👇 Normal routes (Nav + Home visible) */}
      <Route
        path="/loan/personal"
        element={
          <div className="w-full min-h-screen bg-sky-50">
            <Nav />
            <PersonalLoanBanner />
          </div>
        }
      />

      {/* 👇 Only the form page (NO Nav, NO Home, only form) */}
      <Route path="/forms/loanType" element={<LoanTypesRouting />} />
     

      <Route path="/Car-Valuation" element={<AutoSellValuation/>}/>
        <Route path="/Bike-Valuation" element={<BikeValuationLoan/>}/>
      {/* 👇 Home route (with Nav + Home) */}
      <Route path="/" element={<MainLayout />} />
    </Routes>
  );
};

export default App;
