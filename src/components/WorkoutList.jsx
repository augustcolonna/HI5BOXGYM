//hooks
import { useDocument } from '../hooks/useDocument';
//prop types
import PropTypes from 'prop-types';
//components
import ClassSignUp from './ClassSignUp';

function WorkoutList({ workouts }) {
  const id = workouts[0].id;
  const { document, error } = useDocument('workouts', id);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!document) {
    return <div className="loading">loading documents...</div>;
  }

  return (
    <div className="workout-card">
      {workouts.length === 0 ? (
        <p>No workouts are Scheduled yet</p>
      ) : (
        workouts.map((workout) => {
          return (
            <div className="workout" key={workout.id}>
              <div className="details">
                <h2>{workout.category}</h2>
                {workout.assignedCoachesList.map((coach) => {
                  return (
                    <p className="coach" key={coach.id}>
                      Coach {coach.displayName}{' '}
                    </p>
                  );
                })}
                <p className="time-and-date">{workout.date.toDate().toDateString()}</p>
                <p className="time-and-date">{workout.time}</p>
              </div>
              <ClassSignUp workout={document} />
            </div>
          );
        })
      )}
    </div>
  );
}

WorkoutList.propTypes = {
  workouts: PropTypes.any,
};

export default WorkoutList;
