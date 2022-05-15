import React, { useState } from 'react';
import './CheckBoxs.css';

const CheckBoxs = () => {
  /*const [values, setValues] = useState({
    coding: false,
    music: false,
    reading: false
  });*/
  const [coding, setCoding] = useState(false);
  const [music, setMusic] = useState(false);
  const [reading, setReading] = useState(false);
  
  const allSelected = coding && music && reading;
  
  const handleCheckAllClick = evt => {
    const checked = evt.target.checked;
    setMusic(checked);
    setCoding(checked);
    setReading(checked);
  }
  return (
    <div className="check-boxs">
      <legend>Choose your interests</legend>
      <div>
        <input
          type="checkbox"
          name="all"
          checked={ allSelected }
          onChange={ handleCheckAllClick }
        />
        <label>All</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="coding"
          onChange={ () => setCoding(currentCoding => !currentCoding) }
          checked={ coding }
        />
        <label>Coding</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="music"
          onChange={ () => setMusic(currentMusic => !currentMusic) }
          checked={ music }
        />
        <label>Music</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="reading"
          onChange={ () => setReading(currentReading => !currentReading) }
          checked={ reading }
        />
        <label>Reading books</label>
      </div>
    </div>
  );
};

export default CheckBoxs;
