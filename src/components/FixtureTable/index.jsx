import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

export default function FixtureTable({ leaderboard }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell align="center">Fixture</TableCell>
            <TableCell align="center">Marketplace</TableCell>
            <TableCell className="mostActiveUser" align="center">Most Active User</TableCell>
            <TableCell className="gameInformation" align="center">Game Information</TableCell>
            <TableCell align="center">Total Users</TableCell>
            <TableCell align="center">Total Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaderboard.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="center">
                <div className="fixtureContent">
                  <div className="homeTeam">
                    {row.fixture.HomeTeam}
                    <img
                      src="https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BR.svg"
                      loading="lazy"
                      alt=""
                    />{" "}
                  </div>
                  <p>vs</p>
                  <div className="awayTeam">
                    <img
                      src="https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AR.svg"
                      loading="lazy"
                      alt=""
                    />
                    {row.fixture.AwayTeam}
                  </div>
                </div>
              </TableCell>
              <TableCell align="center">
                <Link to="/fixture">Fifa Worldcup</Link>
              </TableCell>
              <TableCell align="center">
              {row.topuser[0]?.name ? 
                <div className="userContent">
                  <img
                    src={`https://robohash.org/${
                      row.topuser[0]?.name || "_0"
                    }`}
                    loading="lazy"
                  />
                  <Link to="/profile">{row.topuser[0]?.name}</Link>
                </div> : "-" }
              </TableCell>
              <TableCell align="center">{row.fixture.DateUtc}</TableCell>
              <TableCell align="center">{row.userCount}</TableCell>
              <TableCell align="center">{row.volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
