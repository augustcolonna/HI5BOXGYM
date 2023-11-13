//hooks
import { useDocument } from '../hooks/useDocument';
import { useParams } from 'react-router-dom';
//components
import WorkoutCard from '../components/WorkoutCard';
import ClassSignUp from '../components/ClassSignUp';

function Workout() {
  const { id } = useParams();
  const { document, error } = useDocument('workouts', id);

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!document) {
    return <div className="loading">loading documents...</div>;
  }
  return (
    <div className="workout-card">
      <WorkoutCard workout={document} />
      <ClassSignUp workout={document} />
    </div>
  );
}

export default Workout;
