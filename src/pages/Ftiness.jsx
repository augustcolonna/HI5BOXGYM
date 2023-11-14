//hooks
import { useCollection } from '../hooks/useCollection';
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
//components
import WorkoutList from '../components/WorkoutList';
import WorkoutFilter from '../components/WorkoutFilter';
import { Link } from 'react-router-dom';
//styles
import '../stylesheets/fitness.scss';

function Ftiness() {
  const [scheduleFilter, setScheduleFilter] = useState('all');
  const { documents, error } = useCollection('workouts');
  const { user } = useAuthContext();
  const changeFilter = (newfilter) => {
    setScheduleFilter(newfilter);
  };

  const filterByDay = documents
    ? documents.filter((document) => {
        switch (scheduleFilter) {
          case 'all': {
            let isCurrent = documents
              .sort((a, b) => {
                return b.date - a.date;
              })
              .filter((document) => {
                let today = new Date().toLocaleDateString('de-DE');
                if (document.date.toDate().toLocaleDateString('de-DE') >= today) {
                  return document;
                }
              });

            return isCurrent;
          }
          case 'today': {
            let isToday = false;
            let today = new Date().toLocaleDateString('de-DE');
            if (today === document.date.toDate().toLocaleDateString('de-DE')) {
              isToday = true;
            }
            return isToday;
          }
          default:
            return true;
        }
      })
    : null;

  return (
    <div className="fitness-container">
      {error && <p>{error}</p>}
      {documents && <WorkoutFilter changeFilter={changeFilter} scheduleFilter={scheduleFilter} />}
      {user.isCoach && (
        <Link to="/create-workout" className="create-workout-link">
          <button className="btn">Create Workout</button>
        </Link>
      )}
      {filterByDay && <WorkoutList workouts={filterByDay} />}
    </div>
  );
}

export default Ftiness;
