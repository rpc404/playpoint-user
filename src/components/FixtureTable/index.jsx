import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function FixtureTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Fixture</TableCell>
            <TableCell align="center">Marketplace</TableCell>
            <TableCell className="mostActiveUser" align="center">Most Active User</TableCell>
            <TableCell className="gameInformation" align="center">Game Information</TableCell>
            <TableCell align="center">Total Users</TableCell>
            <TableCell align="center">Total Volume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell>
                <div className="fixtureContent">
                  <div className="homeTeam">
                    BZL{" "}
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
                    />{" "}
                    AGA
                  </div>
                </div>
              </TableCell>
              <TableCell align="center">
                <Link to="/fixture">Fifa Worldcup</Link>
              </TableCell>
              <TableCell align="center" className="mostActiveUser">
                <div className="userContent">
                  <img
                    src="https://avatars.githubusercontent.com/u/102910615?v=4"
                    alt=""
                  />
                  <Link to="/profile">jckamaicha</Link>
                </div>
              </TableCell>
              <TableCell className="gameInformation" align="center">21:45 PM, 20th Nov 2022</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="center">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
