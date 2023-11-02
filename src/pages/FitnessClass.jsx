//hooks
import { useState } from 'react';
//styles
import '../stylesheets/fitnessclass.scss';
//components
import FitnessSchedule from '../components/FitnessSchedule';
//data
import classData from '../utilities/scheduleData.json';
//misc

function FitnessClass() {
  // eslint-disable-next-line no-unused-vars
  const [schedule, setSchedule] = useState(classData);

  return (
    <div className="fitness-class-container">
      <div className="day-container">
        {schedule.map((workout) => {
          return (
            <div className="day" key={workout._id}>
              <FitnessSchedule schedule={workout} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FitnessClass;
