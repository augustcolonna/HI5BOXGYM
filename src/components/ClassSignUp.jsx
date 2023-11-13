//import hooks
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
//firebase imports
import { Timestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig';
//import images
import addIcon from '../assets/add-user.svg';
import removeIcon from '../assets/remove-user.svg';
//prop types
import PropTypes from 'prop-types';

function ClassSignUp({ workout }) {
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const handleAddClass = async () => {
    const newsignUp = {
      displayName: user.displayName,
      id: user.uid,
      signedUpAt: Timestamp.fromDate(new Date()),
    };
    console.log(newsignUp);

    const docRef = doc(db, 'workouts', workout.id);
    await updateDoc(docRef, {
      signUpList: [...workout.signUpList, newsignUp],
    });
  };

  const handleCancelClass = async (id) => {
    const cancelUserId = user.uid;
    const docRef = doc(db, 'workouts', id);
    await updateDoc(docRef, {
      signUpList: workout.signUpList.filter((user) => {
        return user.id !== cancelUserId;
      }),
    });
    navigate('/workouts');
  };

  return (
    <div className="add-and-remove-class">
      <button onClick={handleAddClass} className="btn">
        <img src={addIcon} />
        <p className="add">Sign Up</p>
      </button>
      <button onClick={handleCancelClass} className="btn">
        <img src={removeIcon} />
        <p className="cancel">Cancel</p>
      </button>
      {workout.signUpList.length > 0 ? (
        <p>
          {workout.signUpList[0].displayName}, {workout.signUpList[1].displayName}, {workout.signUpList[2].displayName}{' '}
          + {workout.signUpList.length - 3} more are going.
        </p>
      ) : (
        <p>No one has signed up yet</p>
      )}
    </div>
  );
}

ClassSignUp.propTypes = {
  workout: PropTypes.any,
};

export default ClassSignUp;
