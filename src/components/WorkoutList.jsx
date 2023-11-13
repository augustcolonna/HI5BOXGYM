//prop types
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
//components

function WorkoutList({ workouts }) {
  return (
    <div className="workout-list">
      {workouts.length === 0 ? (
        <p>no workouts scheduled yet</p>
      ) : (
        workouts.map((workout) => {
          return (
            <Link to={`/fitness/${workout.id}`} key={workout.id}>
              <div className="workout" key={workout.id}>
                <h2>{workout.category}</h2>
                <p className="time-and-date">{workout.date.toDate().toDateString()}</p>
                <p className="time-and-date">{workout.time}</p>
              </div>
              <div className="link-to-signup">
                <p>Want to Sign Up?</p>
              </div>
            </Link>
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
