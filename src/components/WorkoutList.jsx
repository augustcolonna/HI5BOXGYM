//prop types
import PropTypes from 'prop-types';

function WorkoutList({ workouts }) {
  return (
    <div className="workout-card">
      {workouts.length === 0 ? (
        <p>No workouts are Scheduled yet</p>
      ) : (
        workouts.map((workout) => {
          return (
            <div key={workout.id}>
              <h2>{workout.category}</h2>
              {workout.assignedCoachesList.map((coach) => {
                return <p key={coach.id}>Coached by {coach.displayName} </p>;
              })}
              <p>{workout.date.toDate().toDateString()}</p>
              <p>{workout.time}</p>
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
