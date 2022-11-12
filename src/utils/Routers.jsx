import React from "react";
import { Route, Routes } from "react-router-dom";
import Fixture from "../pages/fixture";
import Predict from "../pages/predict";
import NotFound from "../pages/404";
import Home from "../pages/home";

import socketIO from "socket.io-client";
const socket = socketIO.connect(import.meta.env.VITE_SOCKET_URI);

export default function PageRouters() {
  const [activeFixtureBackground, setActiveFixtureBackground] = React.useState("")
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home setActiveFixtureBackground={setActiveFixtureBackground}/>} />
      <Route path="fixture/:marketplaceSlug" element={<Fixture activeFixtureBackground={activeFixtureBackground}/>} />
      <Route path="predict/:fixtureId" element={<Predict socket={socket} />} />
    </Routes>
  );
}
