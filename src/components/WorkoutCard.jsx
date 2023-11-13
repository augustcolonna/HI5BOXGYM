//prop types
import PropTypes from 'prop-types';

function WorkoutCard({ workout }) {
  return (
    <div className="workout-card-details" key={workout.id}>
      <h2>{workout.category}</h2>
      {workout.assignedCoachesList.map((coach) => {
        return (
          <p className="workout-card-coach" key={coach.id}>
            Coach {coach.displayName}{' '}
          </p>
        );
      })}
      <p className="workout-card-time-and-date">{workout.date.toDate().toDateString()}</p>
      <p className="workout-card-time-and-date">{workout.time}</p>
    </div>
  );
}

WorkoutCard.propTypes = {
  workout: PropTypes.any,
};

export default WorkoutCard;
