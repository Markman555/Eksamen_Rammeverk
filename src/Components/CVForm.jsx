import React, { useState, useEffect } from 'react';
import { createCV, updateCVById } from '../Utils/CvsApi'; // Anta at api.js inneholder dine CRUD-funksjoner

const CVForm = ({ cvData, onSave, onCancel, userId }) => {
    const [formData, setFormData] = useState({
      personalInfo: {
        name: '',
        email: '',
        phone: '',
      },
      skills: '',
      education: '',
      experience: '',
      references: '',
    });
  
    useEffect(() => {
      if (cvData) {
        setFormData(cvData); // Hvis det er en eksisterende CV, fyll skjemaet med data
      }
    }, [cvData]);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      // Sjekk om feltet tilhører personalInfo eller andre felt og oppdater tilstanden
      if (name.startsWith('personalInfo')) {
        const [field] = name.split('.').slice(-1);
        setFormData((prevData) => ({
          ...prevData,
          personalInfo: {
            ...prevData.personalInfo,
            [field]: value,
          },
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (cvData && cvData._id) {
          // Hvis det er en eksisterende CV (oppdater)
          const updatedCV = await updateCVById(cvData._id, formData);
          onSave(updatedCV); // Send oppdatert CV til UserDashboard
        } else {
          // Hvis det er en ny CV (opprett)
          const newCV = await createCV({ ...formData, userId });
          onSave(newCV); // Send nytt CV til UserDashboard
        }
      } catch (error) {
        console.error("Error saving CV:", error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>{cvData ? "Update Your CV" : "Create Your CV"}</h2>
  
        {/* Personal Info Section */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="personalInfo.name"
            value={formData.personalInfo.name || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="personalInfo.email"
            value={formData.personalInfo.email || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="personalInfo.phone"
            value={formData.personalInfo.phone || ''}
            onChange={handleChange}
          />
        </div>
  
        {/* Skills Section */}
        <div>
          <label>Skills:</label>
          <input
            type="text"
            name="skills"
            value={formData.skills || ''}
            onChange={handleChange}
          />
        </div>
  
        {/* Education Section */}
        <div>
          <label>Education:</label>
          <input
            type="text"
            name="education"
            value={formData.education || ''}
            onChange={handleChange}
          />
        </div>
  
        {/* Experience Section */}
        <div>
          <label>Experience:</label>
          <input
            type="text"
            name="experience"
            value={formData.experience || ''}
            onChange={handleChange}
          />
        </div>
  
        {/* References Section */}
        <div>
          <label>References:</label>
          <input
            type="text"
            name="references"
            value={formData.references || ''}
            onChange={handleChange}
          />
        </div>
  
        <button type="submit">Save CV</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </form>
    );
  };
  
  export default CVForm;