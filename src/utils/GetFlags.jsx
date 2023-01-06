import clubFlags from "../helpers/EPLFlags.json";
import CarabaoClubFlags from "../helpers/EFLFlags.json";
import EPLFlags from "../helpers/EPLFlags.json";

const GetFlags = (marketplaceSlug, team) => {
  if (marketplaceSlug === "English-Football-League397") {
    return clubFlags.map((club, i) => {
      if (club.name === team) {
        return (
          <img
            src={club.image_url}
            alt={club.name}
            key={i}
            className="home__Image"
          />
        );
      }
    });
  } else if (marketplaceSlug === "Carabao-Cup237") {
    return CarabaoClubFlags.map((club, i) => {
      if (club.name === team) {
        return (
          <img
            src={club.image_url}
            alt={club.name}
            key={i}
            className="home__Image"
          />
        );
      }
    });
  } else if (marketplaceSlug === "premiere-league") {
    return EPLFlags.map((club, i) => {
      if (
        club.name.replace(" ", "").toLowerCase().trim() ===
        String(team).replace(" ", "").toLowerCase().trim() 
      ) {
        return (
          <img
            src={club.image_url}
            alt={club.name}
            key={i}
            className="home__Image"
          />
        );
      }
    });
  }
};

export default GetFlags;
