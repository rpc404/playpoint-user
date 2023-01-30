import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
const { default: moment } = await import("moment");
import { formatNumber } from "../../utils/NumberFomatter";
import GetFlags from "../../utils/GetFlags";
import { useTranslation } from "react-i18next";

export default function FixtureTable({ leaderboard, currPage, loading }) {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">🏆 {t("Rank")}</TableCell>
            <TableCell align="center">🎢 {t("Fixture")}</TableCell>
            <TableCell align="center">🎫 {t("Marketplace")}</TableCell>
            <TableCell className="mostActiveUser" align="center">
              🤠 {t("MostActiveUser")}
            </TableCell>
            <TableCell className="gameInformation" align="center">
              🎲 {t("GameInformation")}
            </TableCell>
            <TableCell align="center">🎮 {t("TotalUsers")}</TableCell>
            <TableCell align="center">💵 {t("TotalVolume(PPTT)")}</TableCell>
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
                        {/* @note Why is this marketplace hard coded */}
                        <Link to="/fixture">{row.fixture.marketplaceSlug}</Link>
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
                              height={"30"}
                              width={"30"}
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
            : [0, 1, 2, 3, 4, 5, 6, 7].map((_skeleton, i) => {
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
