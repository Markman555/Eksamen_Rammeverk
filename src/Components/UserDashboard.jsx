import React, { useState, useEffect } from "react";
import CVForm from "./CVForm";
import { fetchCV, createCV, updateCVById, deleteCVById } from "../Utils/CvsApi";
import { useAuth } from "../Context/AuthContext";

const UserDashboard = () => {
    const { user } = useAuth(); // Hent brukerinformasjon fra AuthContext
    const [cvs, setCvs] = useState([]);
    const [selectedCV, setSelectedCV] = useState(null);
    const [isCreating, setIsCreating] = useState(false); // Skiller mellom "create" og "edit"
    const [isFormVisible, setIsFormVisible] = useState(false);

    // Hent CV-er når komponenten laster inn
    useEffect(() => {
        if (user?.username) {
            const fetchUserCVs = async () => {
                try {
                    const allCVs = await fetchCV();
                    const userCVs = allCVs.filter(cv => cv.createdBy === user.username); // Filtrer for brukeren
                    setCvs(userCVs);
                } catch (error) {
                    console.error("Error fetching CVs:", error);
                }
            };

            fetchUserCVs();
        }
    }, [user]);

    // Håndter opprettelse av ny CV
    const handleCreateNewCV = () => {
        setSelectedCV(null); // Nullstiller tidligere valgt CV
        setIsCreating(true); // Marker at vi lager en ny CV
        setIsFormVisible(true); // Viser skjemaet
    };

    const handleSaveCV = async (cvData) => {
        try {
            if (isCreating) {
                console.log("Creating CV:", cvData);
                const newCV = await createCV({ ...cvData, createdBy: user.username });
                setCvs(prev => [...prev, newCV]);
            } else if (selectedCV) {
                console.log("Updating CV:", selectedCV._id, cvData);
    
                const sanitizedCVData = { ...cvData, createdBy: user.username };
                delete sanitizedCVData._id; // Fjern _id før vi sender dataen til serveren
    
                const isUpdated = await updateCVById(selectedCV._id, sanitizedCVData);
    
                if (isUpdated) {
                    // Hvis oppdateringen var vellykket, oppdater listen med CV-er
                    setCvs(prev => prev.map(cv => (cv._id === selectedCV._id ? { ...cv, ...sanitizedCVData } : cv)));
                } else {
                    console.error("Failed to update CV.");
                }
            }
            setIsFormVisible(false);
        } catch (error) {
            console.error("Error saving CV:", error);
        }
    };


    // Håndter sletting av CV
    const handleDeleteCV = async (cvId) => {
        try {
            await deleteCVById(cvId);
            setCvs(prev => prev.filter(cv => cv._id !== cvId)); // Fjern fra listen
        } catch (error) {
            console.error("Error deleting CV:", error);
        }
    };

    // Håndter redigering av CV
    const handleEditCV = (cv) => {
        setSelectedCV(cv); // Sett valgt CV
        setIsCreating(false); // Marker at vi redigerer
        setIsFormVisible(true); // Vis skjemaet
    };

    return (
        <div>
            <h1>Velkommen, {user?.username || "Bruker"}!</h1>
            <button onClick={handleCreateNewCV}>Create CV</button>

            {isFormVisible && (
                <CVForm
                    initialData={selectedCV} // Send valgt CV (eller null)
                    onSave={handleSaveCV}
                    onCancel={() => setIsFormVisible(false)}
                />
            )}

            <ul>
                {cvs.map(cv => (
                    <li key={cv._id}>
                        <h3>{cv.personalInfo?.name || "Ukjent navn"}</h3>
                        <button onClick={() => handleEditCV(cv)}>Edit</button>
                        <button onClick={() => handleDeleteCV(cv._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserDashboard;
