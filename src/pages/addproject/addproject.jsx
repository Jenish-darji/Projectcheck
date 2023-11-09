import { useState } from 'react';
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';
// import { check, validationResult } from 'express-validator';

const AddNewProject = () => {
  const initialFormData = {
    name: '',
    end_date: '',
    p_status: '',
    photo_url: '',
    teamMembers: [],
  };

//   const [profilePhotoUrl, setprofilePhotoUrl] = useState("");
//   const [projectDescription, setprojectDescription] = useState("");
//   const [end_date, setend_date] = useState("");
//   const [name, setname] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [validationErrors, setValidationErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name) {
      errors.name = 'Project Name is required';
    }
    if (!formData.end_date) {
      errors.end_date = 'Project Deadline is required';
    }
    // Add other validation rules for other fields

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid; you can perform actions like submitting the data
      console.log('Form data:', JSON.stringify(formData));

      // Show the success message
      setShowSuccessMessage(true);

      // Send data to the server
      const response = await fetch('http://localhost:3001/projects/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      console.log('Server response:', result);

      // Clear the form
      setFormData(initialFormData);

      // Hide the success message after a few seconds (optional)
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000); // Hide after 3 seconds (adjust as needed)
    }
  };
  const handleCancelClick = () => {
    // Add functionality to handle cancel here
    console.log('Cancel button clicked');
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <div className="col-md-10">
          <Navbar 
          />
          {/* Main content area */}
          <div className="">
            {/* Your main content goes here */}

            <div className="container mt-5">
              <div className="row">
                <div className="col-md-6">
                  <form onSubmit={handleFormSubmit}>
                    {/* Project Name */}
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Project Name</label>
                      <input
                        type="text"
                        className={`form-control ${validationErrors.name ? 'is-invalid' : ''}`}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {validationErrors.name && (
                        <div className="invalid-feedback">{validationErrors.name}</div>
                      )}
                    </div>
                    {/* Project Deadline */}
                    <div className="mb-3">
                      <label htmlFor="end_date" className="form-label">Project Deadline</label>
                      <input
                        type="date"
                        className={`form-control ${validationErrors.end_date ? 'is-invalid' : ''}`}
                        id="end_date"
                        name="end_date"
                        value={formData.end_date}
                        onChange={handleInputChange}
                      />
                      {validationErrors.end_date && (
                        <div className="invalid-feedback">{validationErrors.end_date}</div>
                      )}
                    </div>
                    {/* Project Description */}
                    <div className="mb-3">
                      <label htmlFor="projectDescription" className="form-label">Project Description</label>
                      <textarea
                        className="form-control"
                        id="projectDescription"
                        name="p_status"
                        value={formData.p_status}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    {/* Profile Photo URL */}
                    <div className="mb-3">
                      <label htmlFor="profilePhotoUrl" className="form-label">Profile Photo URL</label>
                      <input
                        type="text"
                        className={`form-control ${validationErrors.profilePhotoUrl ? 'is-invalid' : ''}`}
                        id="profilePhotoUrl"
                        name="photo_url"
                        value={formData.photo_url}
                        onChange={handleInputChange}
                      />
                      {validationErrors.profilePhotoUrl && (
                        <div className="invalid-feedback">{validationErrors.profilePhotoUrl}</div>
                      )}
                    </div>
                    {/* Team Members */}
                    <div className="mb-3">
                      <label htmlFor="teamMembers" className="form-label">Team Members</label>
                      <input
                        type="text"
                        className={`form-control ${validationErrors.teamMembers ? 'is-invalid' : ''}`}
                        id="teamMembers"
                        name="teamMembers"
                        value={formData.teamMembers}
                        onChange={handleInputChange}
                      />
                      {validationErrors.teamMembers && (
                        <div className="invalid-feedback">{validationErrors.teamMembers}</div>
                      )}
                    </div>

                    <div className="d-flex justify-content-start pt-3">
                      <button type="submit" className="btn btn-primary me-2">Create Project</button>
                      <button type="button" className="btn btn-secondary" onClick={handleCancelClick}>Cancel</button>
                    </div>
                  </form>
                </div>
                <div className="col-md-6">
                  {/* Display success message */}
                  {showSuccessMessage && (
                    <div className="alert alert-success mt-3" role="alert">
                      Project created successfully!
                      {/* Optionally, you can add a close button to hide the message */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewProject;
