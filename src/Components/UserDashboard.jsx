import React, { useState, useEffect } from 'react';
import CVForm from './CVForm';
import { fetchCVByUserId, deleteCVById } from '../Utils/CvsApi'; // Import CRUD functions

const UserDashboard = ({ userId }) => {
  const [isCreatingCV, setIsCreatingCV] = useState(false);
  const [cvData, setCvData] = useState(null);
  const [existingCVs, setExistingCVs] = useState([]);

  // Hent eksisterende CV-er for brukeren når komponenten er montert
  useEffect(() => {
    const getCVs = async () => {
      try {
        const cvs = await fetchCVByUserId(userId);
        setExistingCVs(cvs);
      } catch (error) {
        console.error("Error fetching CVs:", error);
      }
    };
    getCVs();
  }, [userId]);

  const handleCreateCV = () => {
    setIsCreatingCV(true);
  };

  const handleSaveCV = (cv) => {
    setExistingCVs((prevCVs) => [...prevCVs, cv]);
    setIsCreatingCV(false);
  };

  const handleCancel = () => {
    setIsCreatingCV(false);
  };

  const handleEditCV = (cv) => {
    setCvData(cv); // Set cv data to be edited
    setIsCreatingCV(true);
  };

  // Define the handleDeleteCV function to delete the CV
  const handleDeleteCV = async (cvId) => {
    try {
      await deleteCVById(cvId);
      setExistingCVs((prevCVs) => prevCVs.filter(cv => cv._id !== cvId));
    } catch (error) {
      console.error("Error deleting CV:", error);
    }
  };

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      
      {/* Display Existing CVs */}
      <div>
        <h2>Your CVs</h2>
        <ul>
          {existingCVs.map((cv) => (
            <li key={cv._id}>
              <p>{cv.personalInfo.name}</p>
              <button onClick={() => handleEditCV(cv)}>Edit</button>
              <button onClick={() => handleDeleteCV(cv._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Create or Edit CV */}
      {!isCreatingCV && !cvData && (
        <button onClick={handleCreateCV}>Create CV</button>
      )}
      {isCreatingCV && (
        <CVForm
          cvData={cvData}
          onSave={handleSaveCV}
          onCancel={handleCancel}
          userId={userId}
        />
      )}
    </div>
  );
};

export default UserDashboard;
