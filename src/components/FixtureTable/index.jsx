import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Skeleton, Stack } from "@mui/material";
import moment from "moment";
import { formatNumber } from "../../utils/NumberFomatter";
import GetFlags from "../../utils/GetFlags";

export default function FixtureTable({ leaderboard, currPage, loading }) {
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
                          {GetFlags(
                            row.fixture.marketplaceSlug,
                            row.fixture.HomeTeam
                          )}
                          <p>vs</p>
                          {GetFlags(
                            row.fixture.marketplaceSlug,
                            row.fixture.AwayTeam
                          )}
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
                        {moment(row.fixture.DateUtc.split(" ")[0]).format("LL")}
                      </TableCell>
                      <TableCell align="center">
                        {formatNumber(row.userCount)}
                      </TableCell>
                      <TableCell align="center">
                        {formatNumber(row.volume / 0.02)}
                      </TableCell>
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
