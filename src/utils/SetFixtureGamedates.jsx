import React from "react";
import Moment from "moment";
import { getFixtures } from "../api/Fixture";

export default function SetFixtureGamedates({ setGameDates, marketplaceSlug }) {
  /**
   * @dev convert game dates to more readable format
   */
  React.useEffect(() => {
    var dates = [];
    var groupADates = [];
    var groupBDates = [];
    var groupCDates = [];
    var groupDDates = [];
    var groupEDates = [];
    var groupFDates = [];
    var groupGDates = [];
    var groupHDates = [];

    (async () => {
      let fixtures = await getFixtures(marketplaceSlug);
      fixtures = fixtures?.data?.fixtures;

      fixtures.forEach((data) => {
        dates.push(Moment(data.DateUtc).format("LL"));
      });
      fixtures.forEach((data) => {
        if (data.Group === "Group A")
          groupADates.push(Moment(data.DateUtc).format("LL"));
      });
      fixtures.forEach((data) => {
        if (data.Group === "Group B")
          groupBDates.push(Moment(data.DateUtc).format("LL"));
      });
      fixtures.forEach((data) => {
        if (data.Group === "Group C")
          groupCDates.push(Moment(data.DateUtc).format("LL"));
      });
      fixtures.forEach((data) => {
        if (data.Group === "Group D")
          groupDDates.push(Moment(data.DateUtc).format("LL"));
      });
      fixtures.forEach((data) => {
        if (data.Group === "Group E")
          groupEDates.push(Moment(data.DateUtc).format("LL"));
      });
      fixtures.forEach((data) => {
        if (data.Group === "Group F")
          groupFDates.push(Moment(data.DateUtc).format("LL"));
      });
      fixtures.forEach((data) => {
        if (data.Group === "Group G")
          groupGDates.push(Moment(data.DateUtc).format("LL"));
      });
      fixtures.forEach((data) => {
        if (data.Group === "Group H")
          groupHDates.push(Moment(data.DateUtc).format("LL"));
      });

      setGameDates({
        all: [...new Set(dates)],
        groupA: [...new Set(groupADates)],
        groupB: [...new Set(groupBDates)],
        groupC: [...new Set(groupCDates)],
        groupD: [...new Set(groupDDates)],
        groupE: [...new Set(groupEDates)],
        groupF: [...new Set(groupFDates)],
        groupG: [...new Set(groupGDates)],
        groupH: [...new Set(groupHDates)],
      });
    })();
  }, []);
}
