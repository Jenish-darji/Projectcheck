import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const TaskBox = (props) => {
  const {  name, number, color } = props;

  return (
    <div className="card text-center py-5 col" style={{background: color}}>
      <div className="">
        <FontAwesomeIcon icon={faUser} style={{ fontSize: '2rem' }}></FontAwesomeIcon>
        
        <h5 className="card-title">{name}</h5>
        <p className="card-text"> {number}</p>
      </div>
    </div>
  );
};

export default TaskBox;
