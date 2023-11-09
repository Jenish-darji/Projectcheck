import React from 'react';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import { faUser, faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import ProjectCard from '../components/projectcard';


const AdminMainPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-md-10">
      
          <Navbar Addtaskorproject = "Add new Project"
          pagelink = "/addproject"/>
          {/* Main content area */}
          <div className="main-content d-flex gap-4 p-4 justify-content-evenly row">
            {/* Your main content goes here */}
            <ProjectCard 
                userIcon = {faUser}
                description = "description"
                projectname = "Project1"
                projectStatus = "completed"
                projectStatusIcon = {faUpRightFromSquare}
                color="#748CF1"
            />
             <ProjectCard 
                userIcon = {faUser}
                description = "description"
                projectname = "Project2"
                projectStatus = "completed"
                projectStatusIcon = {faUpRightFromSquare}
                color="#05BFDB"
            />
             <ProjectCard 
                userIcon = {faUser}
                description = "description"
                projectname = "Project3"
                projectStatus = "completed"
                projectStatusIcon = {faUpRightFromSquare}
                color="#A7F"
            />
             <ProjectCard 
                userIcon = {faUser}
                description = "description"
                projectname = "Project4"
                projectStatus = "completed"
                projectStatusIcon = {faUpRightFromSquare}
                color="#3C84AB" 
            />
          </div>
          

          
        </div>
      </div>
    </div>
  );
};

export default AdminMainPage;
