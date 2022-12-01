import React from "react";
import { Divider } from "@mui/material";
import "./styles/style.css";

const Leaderboard = () => {
  return (
    <div className="leaderboard__container">
      <div className="searchinfo"> 
        <p>Search by marketplaces and fixtures</p>
      </div>
      <div className="filterarea">
        <select name="" id="" defaultValue={"hey"}>
          <option value="">Select marketplace</option>
          <option value="">Fifa World Cup</option>
          <option value="">Premiere League</option>
        </select>
        <select name="" id="">
          <option value="">Japan vs Brazil</option>
          <option value="">Argentina vs urugay</option>
        </select>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default Leaderboard;
