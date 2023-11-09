import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Statistics = (props) => {
  const { name, leftIconClass, rightIconClass } = props;

  console.log(name, leftIconClass, rightIconClass);

  return (
    <div className="d-flex justify-content-between align-items-center border-bottom py-5 col h-80">
      <div className="d-flex align-items-center gap-2 fs-5 ">
        <FontAwesomeIcon icon={leftIconClass} style={{ fontSize: '1.2rem' }}/>
        <span className="ml-2">{name}</span>
      </div>
        <FontAwesomeIcon icon={rightIconClass} style={{ fontSize: '1.2rem' }}/>
    </div>
  );
};

export default Statistics;
