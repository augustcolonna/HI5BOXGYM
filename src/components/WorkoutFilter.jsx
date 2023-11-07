//prop types
import PropTypes from 'prop-types';

const filters = ['all', 'today'];

function WorkoutFilter({ scheduleFilter, changeFilter }) {
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };

  return (
    <div className="workout-filter">
      <nav>
        <p>Filter Workouts by </p>
        {filters.map((filter) => {
          return (
            <button
              key={filter}
              className={scheduleFilter === filter ? 'active' : ''}
              onClick={() => handleClick(filter)}
            >
              {filter}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

WorkoutFilter.propTypes = {
  scheduleFilter: PropTypes.any,
  changeFilter: PropTypes.any,
};

export default WorkoutFilter;
