//hooks
import { useCollection } from '../hooks/useCollection';
import { useState } from 'react';
//components
import Workouts from '../components/Workouts';
import WorkoutFilter from '../components/WorkoutFilter';

function Ftiness() {
  const [scheduleFilter, setScheduleFilter] = useState('all');
  const { documents, error } = useCollection('workouts');

  const changeFilter = (newfilter) => {
    setScheduleFilter(newfilter);
  };

  const filterByDay = documents
    ? documents.filter((document) => {
        switch (scheduleFilter) {
          case 'all':
            return true;
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
      {filterByDay && <Workouts workouts={filterByDay} />}
    </div>
  );
}

export default Ftiness;
