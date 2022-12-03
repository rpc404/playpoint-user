import { Pagination } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import FixtureTable from "../FixtureTable";
import "./styles/style.css";

export default function LeaderboardMain() {
  return (
    <main className="leaderboardMain__container">
      <div className="fixturesLeaderboard__container">
        <h2>📈 Top Ranked Fixtures</h2>
        <FixtureTable />
        <Pagination style={{ marginTop: 15 }} count={10} />
      </div>

      <div className="usersLeaderboard__container">
        <h2>⛹️ Top Ranked Users</h2>

        <div className="topThreeUsers">
          <div className="topUser">
            <div className="user__avatar">
              <img
                src="https://avatars.githubusercontent.com/u/102910615?v=4"
                loading="lazy"
              />
            </div>
            <div className="user__info">
              <h1>🥇1st Place</h1>
              <h4>
                <Link to="/">Jessica, 0xb05c64...119e37</Link>
              </h4>
            </div>
            <div className="gameDetails">
              <div>
                <p>Wins</p>
                <span>12</span>
              </div>
              <div>
                <p>Games</p>
                <span>12</span>
              </div>
              <div>
                <p>Volume</p>
                <span>12</span>
              </div>
            </div>
          </div>

          <div className="top3User">
            <div className="user__avatar">
              <img
                src="https://avatars.githubusercontent.com/u/102910615?v=4"
                loading="lazy"
              />
            </div>
            <div className="user__info">
              <h4>
                <Link to="/">🥈Jessica, 0xb05...9e37</Link>
              </h4>
              <div className="gameDetails">
                <div>
                  <p>Wins</p>
                  <span>12</span>
                </div>
                <div>
                  <p>Games</p>
                  <span>12</span>
                </div>
                <div>
                  <p>Volume</p>
                  <span>12</span>
                </div>
              </div>
            </div>
          </div>

          <div className="top3User">
            <div className="user__avatar">
              <img
                src="https://avatars.githubusercontent.com/u/102910615?v=4"
                loading="lazy"
              />
            </div>
            <div className="user__info">
              <h4>
                <Link to="/">🥉 Jessica, 0xb05...9e37</Link>
              </h4>
              <div className="gameDetails">
                <div>
                  <p>Wins</p>
                  <span>12</span>
                </div>
                <div>
                  <p>Games</p>
                  <span>12</span>
                </div>
                <div>
                  <p>Volume</p>
                  <span>12</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
