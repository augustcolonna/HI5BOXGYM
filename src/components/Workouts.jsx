//hooks
// import { useAuthContext } from '../hooks/useAuthContext';
import PropTypes from 'prop-types';
//componenents
import WorkoutList from './WorkoutList';
//styles
import '../stylesheets/fitness.scss';

function Workouts({ workouts }) {
  // const { user } = useAuthContext();

  return <div className="workouts">{workouts && <WorkoutList workouts={workouts} />}</div>;
}

Workouts.propTypes = {
  workouts: PropTypes.array,
};

export default Workouts;
