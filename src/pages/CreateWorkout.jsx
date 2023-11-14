//hooks and react components
import { useEffect, useState } from 'react';
import { useCollection } from '../hooks/useCollection';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
//styles
import '../stylesheets/create.scss';
//firebase functions
import { Timestamp } from 'firebase/firestore';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseconfig';

const workouts = [
  { value: 'Open Wod Basic', label: 'Open Wod Basic' },
  { value: 'Open Wod Beginner', label: 'Open Wod Beginner' },
  { value: 'Open WOD Endurance', label: 'Open WOD Endurance' },
  { value: 'Open WOD Team', label: 'Open WOD Team' },
  { value: 'Gymnastics', label: 'Gymnastics' },
];

const times = [
  { value: '18:00 - 19:00', label: '18:00 - 19:00' },
  { value: '19:15 - 20:15', label: '19:15 - 20:15' },
];

const customStyles = {
  control: (base, state) => ({
    ...base,
    background: '#eeeded80',
    textColor: '#eeeded',
    borderRadius: state.isFocused ? '12px' : '12px',
    borderColor: state.isFocused ? '#eeeded80' : '#4f9c40',
    boxShadow: state.isFocused ? '#eeeded 0px 0px 10px' : null,
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: '#eeeded',
      };
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: '12px',
    background: '#eeeded',
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    padding: 7,
  }),
};

function CreateWorkout() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [category, setCategory] = useState('');
  const [assignedCoaches, setAssignedCoaches] = useState('');
  const [formError, setFormError] = useState(null);
  const [coaches, setCoaches] = useState([]);

  const { user } = useAuthContext();
  const { documents } = useCollection('users');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError('Please select a Workout');
      return;
    }
    if (assignedCoaches.length < 1) {
      setFormError('Please assign the Workout to at least one Coach');
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      id: user.uid,
    };

    const assignedCoachesList = assignedCoaches.map((coach) => {
      return {
        displayName: coach.value.displayName,
        id: coach.value.id,
      };
    });

    await addDoc(collection(db, 'workouts'), {
      category: category.value,
      date: Timestamp.fromDate(new Date(date)),
      time: time.value,
      signUpList: [],
      createdBy: createdBy,
      assignedCoachesList,
    });

    navigate('/home');
  };

  useEffect(() => {
    if (documents) {
      const options = documents.map((coach) => {
        if (coach.isCoach === true) {
          return { value: coach, label: coach.displayName };
        }
      });
      setCoaches(options);
    }
  }, [documents]);

  return (
    <div className="create-workout-form">
      <h2>New Workout</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <label>
          <span>Workout</span>
          <Select
            placeholder={'Choose a Workout'}
            styles={customStyles}
            onChange={(option) => setCategory(option)}
            options={workouts}
          />
        </label>
        <label>
          <span>Workout Time</span>
          <Select
            placeholder={'Choose a Time'}
            styles={customStyles}
            onChange={(option) => setTime(option)}
            options={times}
          />
        </label>
        <label>
          <span>Workout Date</span>
          <input required type="date" onChange={(e) => setDate(e.target.value)} value={date}></input>
        </label>
        <label>
          <span>Coach</span>
          <Select
            placeholder={'Choose a Coach'}
            styles={customStyles}
            onChange={(option) => setAssignedCoaches(option)}
            options={coaches}
            isMulti
          />
        </label>
        <div className="create-form-button">
          <button className="btn">Add Workout</button>
        </div>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}

export default CreateWorkout;
