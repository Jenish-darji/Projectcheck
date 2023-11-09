import React from 'react';
import '../components/css/taskbox.css'
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import TaskBox from '../components/taskbox';
import Statistics from '../components/staticsbox';

import { faChartColumn, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';


const MainPage = () => {
  return (
    <div className="container-fluid " style={{background:'#EAEEF3'}}>
      <div className="row">
        <Sidebar />
        <div className="col-md-10">
          <Navbar Addtaskorproject = "Add new task"
          pagelink = "/AddTask"/>
          {/* Main content area */}
          <div className="main-content d-flex gap-4 p-4 justify-content-evenly row">
            {/* Your main content goes here */}
            <TaskBox id="t1" name="Total task" number="60" color="#05BFDB" />
            <TaskBox name="Pending" number="60" color="#748CF1"/>
            <TaskBox name="In Progress" number="60" color="#A7F"/>
            <TaskBox name="Completed" number="60" color="#3C84AB"/>
          </div>
          

          {/* statics */}
          <div className="main-content d-flex gap-4 p-5 justify-content-evenly row">

            <Statistics name="Sprint progress & statistics"
              leftIconClass={faChartColumn}
              rightIconClass={faUpRightFromSquare} />

            <Statistics name="Sprint progress & statistics"
              leftIconClass={faChartColumn}
              rightIconClass={faUpRightFromSquare} />


          </div>

        </div>
      </div>
    </div>
  );
};

export default MainPage;
