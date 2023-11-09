

import React, { useState } from 'react';
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';




const Addtask = () => {
    const initialFormData = {
        title: '',
        assignTo: 'user1',
        priority: 'low',
        createdBy: '',
        description: '',
        taskStatus: 'new',
    };

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

        if (!formData.title) {
            errors.title = 'Title is required';
        }
        if (!formData.assignTo) {
            errors.assignTo = 'Assign To is required';
        }
        if (!formData.priority) {
            errors.priority = 'Priority is required';
        }
        if (!formData.createdBy) {
            errors.createdBy = 'Created By is required';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
          // Form is valid; you can perform actions like submitting the data
          console.log('Form data:', formData);
    
          // Show the success message
          setShowSuccessMessage(true);
    
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
                    <Navbar />
                    {/* Main content area */}
                    <div className="">
                        {/* Your main content goes here */}

                        <div className="container mt-5">
                            <div className="row">
                                <div className="col-md-6">
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Title</label>
                                            <input
                                                type="text"
                                                className={`form-control ${validationErrors.title ? 'is-invalid' : ''}`}
                                                id="title"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleInputChange}
                                            />
                                            {validationErrors.title && (
                                                <div className="invalid-feedback">{validationErrors.title}</div>
                                            )}
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col">
                                                <label htmlFor="assignTo" className="form-label">Assign To</label>
                                                <select
                                                    className={`form-select ${validationErrors.assignTo ? 'is-invalid' : ''}`}
                                                    id="assignTo"
                                                    name="assignTo"
                                                    value={formData.assignTo}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="user1">User 1</option>
                                                    <option value="user2">User 2</option>
                                                    {/* Add more options as needed */}
                                                </select>
                                                {validationErrors.assignTo && (
                                                    <div className="invalid-feedback">{validationErrors.assignTo}</div>
                                                )}
                                            </div>
                                            <div className="col">
                                                <label htmlFor="priority" className="form-label">Priority</label>
                                                <select
                                                    className={`form-select ${validationErrors.priority ? 'is-invalid' : ''}`}
                                                    id="priority"
                                                    name="priority"
                                                    value={formData.priority}
                                                    onChange={handleInputChange}
                                                >
                                                    <option value="low">Low</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="high">High</option>
                                                </select>
                                                {validationErrors.priority && (
                                                    <div className="invalid-feedback">{validationErrors.priority}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="createdBy" className="form-label">Created By</label>
                                            <input
                                                type="text"
                                                className={`form-control ${validationErrors.createdBy ? 'is-invalid' : ''}`}
                                                id="createdBy"
                                                name="createdBy"
                                                value={formData.createdBy}
                                                onChange={handleInputChange}
                                            />
                                            {validationErrors.createdBy && (
                                                <div className="invalid-feedback">{validationErrors.createdBy}</div>
                                            )}
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="description" className="form-label">Description</label>
                                            <textarea
                                                className="form-control"
                                                id="description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                            ></textarea>
                                        </div>
                                        <div className="d-flex justify-content-start pt-3">

                                            <button type="submit" className="btn btn-primary me-2">Add Task</button>
                                            <button type="button" className="btn btn-secondary" onClick={handleCancelClick}>Cancel</button>
                                        </div>

                                    </form>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label htmlFor="taskStatus" className="form-label">Task Status</label>
                                        <select
                                            className={`form-select ${validationErrors.taskStatus ? 'is-invalid' : ''}`}
                                            id="taskStatus"
                                            name="taskStatus"
                                            value={formData.taskStatus}
                                            onChange={handleInputChange}
                                        >
                                            <option value="new">New</option>
                                            <option value="inProgress">In Progress</option>
                                            <option value="completed">Completed</option>
                                            <option value="canceled">Canceled</option>
                                        </select>
                                        {validationErrors.taskStatus && (
                                            <div className="invalid-feedback">{validationErrors.taskStatus}</div>
                                        )}
                                        {/* Success Message */}
                                        {showSuccessMessage && (
                                            <div className="alert alert-success mt-3" role="alert">
                                                Task added successfully!
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
        </div>
    );
};

export default Addtask;