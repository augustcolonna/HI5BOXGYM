//hooks
// import { useAuthContext } from '../hooks/useAuthContext';
import PropTypes from 'prop-types';
//componenents
import WorkoutList from './WorkoutList';

function Workouts({ workouts }) {
  // const { user } = useAuthContext();

  return (
    <div className="list-all-workouts">
      <div className="workouts">{workouts && <WorkoutList workouts={workouts} />}</div>
    </div>
  );
}

Workouts.propTypes = {
  workouts: PropTypes.array,
};

export default Workouts;
