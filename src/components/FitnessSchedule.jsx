//hooks
import { useState } from 'react';
import PropTypes from 'prop-types';

// import { useCollection } from '../hooks/useCollection';
// import { useAuthContext } from '../hooks/useAuthContext';

//firebase
// import { db } from '../firebase/firebaseconfig';
// import { Timestamp } from 'firebase/firestore';
// import { addDoc, collection } from 'firebase/firestore';

function FitnessSchedule({ schedule }) {
  const [hideClasses, setHideClasses] = useState(false);
  const [chooseWorkout, setChooseWorkout] = useState(schedule.workout);

  // const { user } = useAuthContext();
  // const { documents } = useCollection('users');

  function selectWorkout(workoutId) {
    const filterWorkout = schedule.workout.filter((workout) => {
      return workout._id === workoutId;
    });

    setChooseWorkout(filterWorkout);
    console.log(chooseWorkout);
  }

  const handleHideClasses = () => {
    setHideClasses(!hideClasses);
  };

  return (
    <div className="fitness-class-schedule">
      <button
        className="btn"
        onClick={() => {
          handleHideClasses();
        }}
      >
        {hideClasses ? 'Hide' : 'Classes!'}
      </button>
      {hideClasses ? (
        <div
          className="class-details"
          onClick={() => {
            selectWorkout(schedule.workout._id);
          }}
        >
          {schedule.workout.map((workout) => {
            return (
              <div className="title-time-container" key={workout._id}>
                <p className="workout-title">{workout.title}</p>
                <p className="workout-time">{workout.time}</p>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

FitnessSchedule.propTypes = {
  schedule: PropTypes.object.isRequired,
  selectSpecificDay: PropTypes.func,
};

export default FitnessSchedule;
