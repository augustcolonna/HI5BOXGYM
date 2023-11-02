//hooks
import PropTypes from 'prop-types';

// import { useCollection } from '../hooks/useCollection';
import { useAuthContext } from '../hooks/useAuthContext';

//firebase
import { db } from '../firebase/firebaseconfig';
import { Timestamp } from 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore';

//misc
import addIcon from '../assets/add.svg';

function FitnessSchedule({ schedule }) {
  // const [classsignUp, setClassSignUp] = useState([]);

  const { user } = useAuthContext();
  // const { documents } = useCollection('users');

  const handleChoice = async (workoutId, workouTitle, workoutTime) => {
    console.log(workoutId, workouTitle, workoutTime);

    const userId = user.uid;
    const nameOfParticiant = user.displayName;

    // const signUpInfo = {

    // };

    await addDoc(collection(db, 'classes'), {
      userId: userId,
      name: nameOfParticiant,
      workoutId: workoutId,
      workout: workouTitle,
      time: workoutTime,
      signUpTime: Timestamp.now(),
    });
  };

  return (
    <div className="fitness-class-schedule">
      <h2>{schedule.day}</h2>
      <div className="class-details">
        {schedule.workout.map((workout) => {
          return (
            <div className="title-time-container" key={workout._id}>
              <p>{workout.title} </p>
              <p> {workout.time}</p>
              <img
                onClick={() => {
                  handleChoice(workout._id, workout.title, workout.time);
                }}
                src={addIcon}
                alt="add class to schedule"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

FitnessSchedule.propTypes = {
  schedule: PropTypes.object.isRequired,
  selectSpecificDay: PropTypes.func,
};

export default FitnessSchedule;
