import React from "react";
import { Route, Routes } from "react-router-dom";

/**
 * @dev Code Splitting at route level... these pages will be called whenever we change our route.
 */
const Fixture = React.lazy(() => import("../pages/fixture"));
const Predict = React.lazy(() => import("../pages/predict"));
const Home = React.lazy(() => import("../pages/home"));
const Profile = React.lazy(() => import("../pages/profile"));
const MarketPlace = React.lazy(() => import("../pages/Marketplace"));
const Leaderboards = React.lazy(() => import("../pages/Leaderboard/index"));
const Prediction = React.lazy(() => import("../pages/predictions/index"));
const PrivacyPolicy = React.lazy(() => import("../pages/privacyPolicy"));
const TermsAndConditions = React.lazy(() =>
  import("../pages/termsAndConditions")
);
const NotFound = React.lazy(() => import("../pages/404"));
const Challenges = React.lazy(() => import("../pages/challenges"));
const SignIn = React.lazy(() => import("../pages/SignIn"));
const EditProfile = React.lazy(() =>
  import("../components/EditProfile/EditProfile")
);
const Transaction = React.lazy(() => import("../pages/transaction"));
const Discussion = React.lazy(() => import("../pages/Discussion"));

export default function PageRouters({ socket }) {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="profile" element={<Profile />}>
        <Route path="transaction" element={<Transaction />} />
        <Route path="edit" element={<EditProfile />} />
      </Route>
      <Route path="fixture/:slug" element={<Fixture />} />
      <Route path="predict/:fixtureId" element={<Predict socket={socket} />} />
      <Route path="marketplace" element={<MarketPlace />} />
      <Route path="leaderboards" element={<Leaderboards />} />
      <Route path="prediction/:pid" element={<Prediction />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="terms-conditions" element={<TermsAndConditions />} />
      <Route path="challenges" element={<Challenges />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="discussion" element={<Discussion />} />
    </Routes>
  );
}
