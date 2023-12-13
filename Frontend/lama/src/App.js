import './App.css';
import React, { useState } from 'react';

const ToggleSwitch = () => {
  const [isToggled, setToggled] = useState(false);

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  return (
    <div>
      <label className="switch">
        <input type="checkbox" checked={isToggled} onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
      <p>{isToggled ? 'ON' : 'OFF'}</p>
    </div>
  );
};




function App() {
  return (
    <div >
      {/* <AllRoutes/> */}
      <ToggleSwitch/>
    </div>
  );
}

export default App;
