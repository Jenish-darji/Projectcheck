import React from 'react';
//import css file
import '../components/css/sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <nav id="sidebar" className=" col-md-2 ">
      <div className="sidebar">
        {/* User logo and project name */}
        <div className="text-center p-3">
          <img
            src="user-logo.png"
            alt="User Logo"
            className="img-fluid rounded-circle"
            style={{ width: '80px' }}
          />
          <h5 className="mt-2">Project name</h5>
        </div>

        <div class="divider"></div>
        

        {/* Add your sidebar icons here */}
        <div className="   align-content-center">
          <div class="">
          <ul className="nav flex-column gap-3 align-content-center">
            <li className="nav-item ">
            <a className="nav-link" href="/">
               <FontAwesomeIcon icon={faHome}style={{ color:'lightgray', fontSize: '2rem' }}></FontAwesomeIcon>
              </a>
            </li>
            <li className="">
              <a className="nav-link" href="#">
               <FontAwesomeIcon icon={faGear}style={{ color:'lightgray', fontSize: '2rem' }}></FontAwesomeIcon>
              </a>
            </li>
            <li className="nav-item">
            <a className="nav-link" href="#">
               {/* <FontAwesomeIcon icon={}style={{ color:'lightgray', fontSize: '2rem' }}></FontAwesomeIcon> */}
              </a>
            </li>
          </ul>
          </div>
          
          <div class="divider"></div>
          
          <div className="d-flex justify-content-center">
            
            <hr />
            {/* Logout button as an icon */}
            <button className="sidebar-logout-icon btn btn-danger">Logout</button>
          </div>
        </div>




      </div>

    </nav>
  );
};

export default Sidebar;
