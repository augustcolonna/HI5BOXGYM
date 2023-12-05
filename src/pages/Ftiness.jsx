//hooks
import { useCollection } from "../hooks/useCollection";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
//components
import WorkoutList from "../components/WorkoutList";
import WorkoutFilter from "../components/WorkoutFilter";
import { Link } from "react-router-dom";
//styles
import "../stylesheets/fitness.scss";

function Ftiness() {
  const [scheduleFilter, setScheduleFilter] = useState("all");
  const { documents, error } = useCollection("workouts");
  const { user } = useAuthContext();
  const changeFilter = (newfilter) => {
    setScheduleFilter(newfilter);
  };

  const filterByDay = documents
    ? documents.filter((document) => {
        switch (scheduleFilter) {
          case "all": {
            if (
              document.date.toDate().toLocaleDateString() <
              new Date().toLocaleDateString()
            ) {
              return !document;
            }
            let isCurrent = documents.sort((a, b) => {
              return b.date - a.date;
            });
            return isCurrent;
          }
          case "today": {
            if (
              new Date().toLocaleDateString() ==
              document.date.toDate().toLocaleDateString()
            ) {
              return document;
            }
            break;
          }
          case "mine": {
            document.signUpList.filter((client) => {
              if (client.id == user.uid) {
                return document;
              }
            });
            if (
              document.date.toDate().toLocaleDateString() <
              new Date().toLocaleDateString()
            ) {
              return !document;
            }
            documents.sort((a, b) => {
              return b.date - a.date;
            });

            break;
          }
          default:
            return true;
        }
      })
    : null;

  return (
    <div className="fitness-container">
      {error && <p>{error}</p>}
      {documents && (
        <WorkoutFilter
          changeFilter={changeFilter}
          scheduleFilter={scheduleFilter}
        />
      )}

      <Link to="/create-workout" className="create-workout-link">
        <button className="btn">Create New Workout</button>
      </Link>

      {filterByDay && <WorkoutList workouts={filterByDay} />}
    </div>
  );
}

export default Ftiness;
