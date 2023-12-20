//hooks
import { Link } from "react-router-dom";

//misc
import FitnessLogo from "../assets/fitness.svg";
import SynthetikeisLogo from "../assets/puck.svg";
import FootballLogo from "../assets/soccer-ball.svg";
import InfoLogo from "../assets/information.svg";
// import ClimbingLogo from '../assets/karabiner.svg';

//styles
import "../stylesheets/navbar.scss";

const allActivities = [
  { name: "fitness", logo: FitnessLogo },
  { name: "hockey", logo: SynthetikeisLogo },
  { name: "football", logo: FootballLogo },
  { name: "information", logo: InfoLogo },
];

function Activity() {
  return (
    <div className="activities">
      {allActivities.map((activity) => {
        return (
          <Link to={`/${activity.name}`} key={activity.name}>
            <div className="activity">
              <img
                className="activity-icon"
                src={activity.logo}
                alt={activity.name}
              />
              <p className="activity-name">{activity.name.toUpperCase()}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Activity;
