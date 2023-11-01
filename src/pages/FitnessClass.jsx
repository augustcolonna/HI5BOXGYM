//hooks
import { useState } from 'react';
//styles
import '../stylesheets/fitnessclass.scss';
//components
import FitnessSchedule from '../components/FitnessSchedule';
//data
import classData from '../utilities/scheduleData.json';

function FitnessClass() {
  const [schedule, setSchedule] = useState(classData);

  return (
    <div className="fitness-class-container">
      {schedule.map((workout) => {
        return (
          <div>
            <h2 className="day">{workout.day}</h2>
            <FitnessSchedule key={workout._id} schedule={workout} />
          </div>
        );
      })}
    </div>
  );
}

export default FitnessClass;
