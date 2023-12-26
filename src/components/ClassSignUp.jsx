//import hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
//firebase imports
import { Timestamp, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";
//import images
import addIcon from "../assets/add-user.svg";
import removeIcon from "../assets/remove-user.svg";
//prop types
import PropTypes from "prop-types";

function ClassSignUp({ workout }) {
  const { user } = useAuthContext();
  const { id } = useParams();

  const handleAddClass = async () => {
    const newsignUp = {
      displayName: user.displayName,
      id: user.uid,
      signedUpAt: Timestamp.fromDate(new Date()),
    };
    console.log(newsignUp);

    const docRef = doc(db, "workouts", workout.id);
    await updateDoc(docRef, {
      signUpList: [...workout.signUpList, newsignUp],
    });
  };

  const handleCancelClass = async () => {
    const cancelUserId = user.uid;
    console.log(cancelUserId);
    const docRef = doc(db, "workouts", id);
    await updateDoc(docRef, {
      signUpList: workout.signUpList.filter((user) => {
        return user.id !== cancelUserId;
      }),
    });
  };

  return (
    <div className="add-and-remove-class">
      <button
        disabled={workout.signUpList}
        onClick={handleAddClass}
        className="btn"
      >
        <img src={addIcon} />
        <p className="add">Sign Up</p>
      </button>
      <button onClick={handleCancelClass} className="btn">
        <img src={removeIcon} />
        <p className="cancel">Cancel</p>
      </button>
      {workout.signUpList.length > 0 ? (
        <p>
          {workout.signUpList.length === 1
            ? `${workout.signUpList[0].displayName} is going.`
            : null}{" "}
          {workout.signUpList.length === 2
            ? `${workout.signUpList[0].displayName} and ${workout.signUpList[1].displayName} are going`
            : null}{" "}
          {workout.signUpList.length > 3
            ? `${workout.signUpList[0].displayName} + ${
                workout.signUpList.length - 3
              } more are going`
            : null}{" "}
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
