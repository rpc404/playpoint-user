import React from "react";
import { Route, Routes } from "react-router-dom";
import Fixture from "../pages/fixture";
import Predict from "../pages/predict";
import NotFound from "../pages/404";
import Home from "../pages/home";
import Profile from "../pages/profile";
import MarketPlace from "../pages/Marketplace";
import Leaderboards from "../pages/Leaderboard/index";
import Prediction from "../pages/predictions/index";
import Transaction from "../pages/transaction/index";
import PrivacyPolicy from "../pages/privacyPolicy";
import TermsAndConditions from "../pages/termsAndConditions";
import Challenges from "../pages/challenges";

export default function PageRouters({ socket }) {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="profile" element={<Profile />} />
      <Route path="fixture/:slug" element={<Fixture />} />
      <Route path="predict/:fixtureId" element={<Predict socket={socket} />} />
      <Route path="marketplace" element={<MarketPlace />} />
      <Route path="leaderboards" element={<Leaderboards />} />
      <Route path="prediction/:pid" element={<Prediction />} />
      <Route path="transaction" element={<Transaction />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="terms-conditions" element={<TermsAndConditions />} />
      <Route path="challenges" element={<Challenges />} />
    </Routes>
  );
}
