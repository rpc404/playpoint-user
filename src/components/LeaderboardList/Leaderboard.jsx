import Leaderboards from "../Leaderboards/Leaderboards";

const LeaderBoardList = ({ fixture, open }) => {
    return (
      <div className={`leaderboards ${open}`}>
        <h3 className="leaderboardsTitle">Leaderboards</h3>
        <div className="leaderboardItemsTitle">
          <p>
            Game<i className="ri-game-line"></i>
          </p>
          <p>
            Users<i className="ri-magic-line"></i>
          </p>
          <p>
            Volume<i className="ri-money-dollar-circle-line"></i>
          </p>
        </div>
        {fixture && <Leaderboards />}{" "}
        {/* {fixture[0].length >=1 && fixture.map((data) => {
          return (
            <div className="leaderboardItem__container" key={data}>
              <p>AUS/QTR</p>
              <p>123k</p>
              <p>$432k</p>
            </div>
          );
        })} */}
      </div>
    );
  };

  export default LeaderBoardList