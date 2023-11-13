//hooks
import { useCollection } from '../hooks/useCollection';
import { useState } from 'react';
//components
import WorkoutList from '../components/WorkoutList';
import WorkoutFilter from '../components/WorkoutFilter';

//styles
import '../stylesheets/fitness.scss';

function Ftiness() {
  const [scheduleFilter, setScheduleFilter] = useState('all');
  const { documents, error } = useCollection('workouts');

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
      {filterByDay && <WorkoutList workouts={filterByDay} />}
    </div>
  );
}

export default Ftiness;
