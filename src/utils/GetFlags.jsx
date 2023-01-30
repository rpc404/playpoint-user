import clubFlags from "../helpers/EPLFlags.json";
import CarabaoClubFlags from "../helpers/EFLFlags.json";
import EPLFlags from "../helpers/EPLFlags.json";
import CountryFlags from "../helpers/CountryFlags.json";

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
            width={"30"}
            height={"30"}
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
            width={"30"}
            height={"30"}
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
            width={"30"}
            height={"30"}
          />
        );
      }
    });
  } else if (marketplaceSlug === "fifa-worldcup") {
    return CountryFlags.map((country, i) => {
      return (
        (country.name === team ||
          (country.name === "United States" && team === "USA") ||
          (country.name === "South Korea" && team === "Korea Republic")) && (
          <img
            src={country?.image}
            alt={country.name}
            key={i}
            loading="lazy"
            className="Away__Image"
            width={"30"}
            height={"30"}
          />
        )
      );
    });
  }
};

export default GetFlags;
