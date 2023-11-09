//prop types
import PropTypes from 'prop-types';
//import images
import addIcon from '../assets/add-user.svg';
import removeIcon from '../assets/remove-user.svg';

function WorkoutList({ workouts }) {
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
              <div className="add-and-remove-class">
                <button className="btn">
                  <img src={addIcon} />
                </button>
                <button className="btn">
                  <img src={removeIcon} />
                </button>
              </div>
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
