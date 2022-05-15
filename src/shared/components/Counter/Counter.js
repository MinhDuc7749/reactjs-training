import './Counter.css';
import { useEffect } from 'react';

const Counter = ({ value, setValue }) => {
  console.log('Counter re render with value = ', value);
  const handleAddClick = () => {
    setValue(value + 1);
  }
  const handleMinusClick = () => {
    setValue(value - 1);
  };
  
  useEffect(()=> {
    document.title = `Current counter value: ${value}`
  }, [value]);
  
  return (
    <div className="counter">
      <button
        className="counter__button"
        onClick={ handleMinusClick }
      >
        -
      </button>
      <span className="counter__value">{ value }</span>
      <button
        className="counter__button"
        onClick={ handleAddClick }
      >
        +
      </button>
    </div>
  )
};

export default Counter;
