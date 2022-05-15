import './Welcome.css';
import PropTypes from 'prop-types';

const Welcome = ({ name, age, color }) => {
  return (
    <div style={ { backgroundColor: color } }>
      <h1>Hello { name }</h1>
      <h2>Age: { age }</h2>
    </div>
  );
}

Welcome.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired
}

export default Welcome;
