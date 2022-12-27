import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CountryFlags from "../../helpers/CountryFlags.json";
import { Link } from "react-router-dom";
import { Skeleton, Stack } from "@mui/material";

export default function FixtureTable({ leaderboard, currPage, loading }) {
  const HomeTeamFlag = (d, c, i) => {
    return (
      (c.name === d?.HomeTeam ||
        (c.name === "United States" && d?.HomeTeam === "USA") ||
        (c.name === "South Korea" && d?.HomeTeam === "Korea Republic")) && (
        <img
          src={c.image}
          alt={c.name}
          key={i}
          loading="lazy"
          className="home__Image"
          style={{ flex: "1", alignItems: "center" }}
        />
      )
    );
  };

  const AwayTeamFlag = (d, c, i) => {
    return (
      (c.name === d?.AwayTeam ||
        (c.name === "United States" && d?.AwayTeam === "USA") ||
        (c.name === "South Korea" && d?.AwayTeam === "Korea Republic")) && (
        <img
          src={c?.image}
          alt={c.name}
          key={i}
          loading="lazy"
          className="Away__Image"
          style={{ flex: "1" }}
        />
      )
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Rank</TableCell>
            <TableCell>Fixture</TableCell>
            <TableCell align="center">Marketplace</TableCell>
            <TableCell className="mostActiveUser" align="center">
              Most Active User
            </TableCell>
            <TableCell className="gameInformation" align="center">
              Game Information
            </TableCell>
            <TableCell align="center">Total Users</TableCell>
            <TableCell align="center">Total Volume(PPTT)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading && leaderboard.length >= 1
            ? leaderboard.map((row, i) => {
                return (
                  i < currPage * 10 &&
                  i >= (currPage - 1) * 10 && (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        #{i + 1}
                      </TableCell>
                      <TableCell>
                        <div
                          className="fixtureContent"
                          style={{ display: "flex" }}
                        >
                          <div
                            className="homeTeam"
                            style={{ flex: "1", alignItems: "center" }}
                          >
                            {row.fixture.HomeTeam}
                          </div>
                          {CountryFlags.map((country, index) => {
                            return HomeTeamFlag(row.fixture, country, index);
                          })}
                          <p>vs</p>
                          {CountryFlags.map((country, index) => {
                            return AwayTeamFlag(row.fixture, country, index);
                          })}
                          <div className="awayTeam" style={{ flex: "1" }}>
                            {row.fixture.AwayTeam}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <Link to="/fixture">Fifa Worldcup</Link>
                      </TableCell>
                      <TableCell align="center">
                        {row.topuser ? (
                          <div
                            className="userContent"
                            style={{
                              display: "flex",
                              justifyContent: "flex-start",
                              paddingLeft: "50px",
                            }}
                          >
                            <img
                              src={`https://robohash.org/${
                                row.topuser.name || "_0"
                              }`}
                              loading="lazy"
                            />
                            <Link to="/profile">{row.topuser.name}</Link>
                          </div>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.fixture.DateUtc}
                      </TableCell>
                      <TableCell align="center">{row.userCount}</TableCell>
                      <TableCell align="center">{row.volume / 0.02}</TableCell>
                    </TableRow>
                  )
                );
              })
            : [0, 1, 2, 3, 4, 5, 6, 7].map((skeleton, i) => {
                return (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={30}
                        height={30}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack
                        sx={{
                          display: "flex",
                          gap: "15px",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          width={60}
                          height={30}
                        />
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          width={30}
                          height={30}
                        />
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          width={30}
                          height={30}
                        />
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          width={30}
                          height={30}
                        />
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          width={60}
                          height={30}
                        />
                      </Stack>
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={60}
                        height={30}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={60}
                        height={30}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={100}
                        height={30}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={40}
                        height={30}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        width={70}
                        height={30}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
