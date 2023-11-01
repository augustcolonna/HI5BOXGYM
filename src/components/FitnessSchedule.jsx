function FitnessSchedule({ schedule }) {
  return (
    <div>
      <div className="fitness-class-schedule">
        {schedule.workout.map((workout) => {
          return (
            <div className="title-time-container" key={workout._id}>
              <p className="workout-title">{workout.title}</p>
              <p className="workout-time">{workout.time}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FitnessSchedule;
