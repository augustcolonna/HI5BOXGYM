//prop types
import PropTypes from 'prop-types';

function WorkoutCard({ workout }) {
  return (
    <div className="workout-details">
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
      </div>
    </div>
  );
}

WorkoutCard.propTypes = {
  workout: PropTypes.any,
};

export default WorkoutCard;
