//prop types
import PropTypes from 'prop-types';
//styles
import '../stylesheets/fitness.scss';

const filters = ['all', 'today', 'mine'];

function WorkoutFilter({ scheduleFilter, changeFilter }) {
  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };

  return (
    <div className="workout-filter">
      <p>Filter </p>
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
    </div>
  );
}

WorkoutFilter.propTypes = {
  scheduleFilter: PropTypes.any,
  changeFilter: PropTypes.any,
};

export default WorkoutFilter;
