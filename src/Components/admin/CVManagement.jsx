import React, { useState, useEffect } from "react";
import { fetchCV, deleteCVById, updateCVById, createCV } from "../../Utils/CvsApi";
import CVView from "../CvView";
import CVForm from "../CVForm";

// CVManagement må ha med hvilken bruker det skal knyttes til
// Lag custom hooks
const CVManagement = () => {
    const [cvs, setCvs] = useState([]);
    const [viewingCV, setViewingCV] = useState(null);
    const [editingCV, setEditingCV] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        const loadCVs = async () => {
            try {
                const allCVs = await fetchCV();
                setCvs(allCVs);
            } catch (error) {
                console.error(error.message);
            }
        };
        loadCVs();
    }, []);

    const handleDeleteCV = async (id) => {
        try {
            await deleteCVById(id);
            setCvs((prev) => prev.filter((cv) => cv._id !== id));
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleEditCV = (cv) => {
        setEditingCV(cv);
        setIsCreating(false); 
    };

    const handleCreateCV = () => {
        setEditingCV(null);
        setIsCreating(true);
    };

    const handleSaveCV = async (cvData) => {
        try {
            if (isCreating) {
                console.log("Creating CV:", cvData);
                const newCV = await createCV(cvData);
                setCvs((prev) => [...prev, newCV]);
            } else if (editingCV) {
                console.log("Updating CV:", editingCV._id, cvData);

                const sanitizedCVData = { ...cvData };
                delete sanitizedCVData._id; 

                const isUpdated = await updateCVById(editingCV._id, sanitizedCVData);

                if (isUpdated) {
                    setCvs((prev) =>
                        prev.map((cv) =>
                            cv._id === editingCV._id ? { ...cv, ...sanitizedCVData } : cv
                        )
                    );
                } else {
                    console.error("Failed to update CV.");
                }
            }
            setEditingCV(null);
            setIsCreating(false);
        } catch (error) {
            console.error("Error saving CV:", error);
        }
    };

    const handleCancelEdit = () => {
        setEditingCV(null);
        setIsCreating(false);
    };

    return (
        <div>
            <h2>Alle CVer</h2>
            {viewingCV ? (
                <CVView cv={viewingCV} onClose={() => setViewingCV(null)} />
            ) : editingCV || isCreating ? (
                <CVForm
                    initialData={editingCV} 
                    onSave={handleSaveCV} 
                    onCancel={handleCancelEdit} 
                />
            ) : (
                <>
                    <button onClick={handleCreateCV}>Opprett Ny CV</button>
                    <ul>
                        {cvs.map((cv) => (
                            <li key={cv._id}>
                                <h3 onClick={() => setViewingCV(cv)}>
                                    {cv.personalInfo?.name || "Ukjent navn"}
                                </h3>
                                <button onClick={() => handleEditCV(cv)}>Rediger</button>
                                <button onClick={() => handleDeleteCV(cv._id)}>Slett</button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default CVManagement;
