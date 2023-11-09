//hooks and react components
import { useEffect, useState } from 'react';
import { useCollection } from '../hooks/useCollection';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
//styles

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
        return { value: coach, label: coach.displayName };
      });
      setCoaches(options);
    }
  }, [documents]);

  return (
    <div className="create-proj-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Workout</span>
          <Select onChange={(option) => setCategory(option)} options={workouts} />
        </label>
        <label>
          <span>Workout Time</span>
          <Select onChange={(option) => setTime(option)} options={times} />
        </label>
        <label>
          <span>Workout Date</span>
          <input required type="date" onChange={(e) => setDate(e.target.value)} value={date}></input>
        </label>

        <label>
          <span>Coach</span>
          <Select onChange={(option) => setAssignedCoaches(option)} options={coaches} isMulti />
        </label>
        <button className="btn">Add Workout</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}

export default CreateWorkout;
