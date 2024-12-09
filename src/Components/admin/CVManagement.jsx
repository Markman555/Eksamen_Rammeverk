import React, { useState, useEffect } from "react";
import { fetchCV, deleteCVById, updateCVById } from "../../Utils/CvsApi";
import CVView from "../CvView";
import CVForm from "../CVForm"; 

const CVManagement = () => {
    const [cvs, setCvs] = useState([]);
    const [viewingCV, setViewingCV] = useState(null);
    const [editingCV, setEditingCV] = useState(null);

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
    };

    const handleUpdateCV = async (updatedData) => {
        try {
            await updateCVById(editingCV._id, updatedData); 
            setCvs((prev) =>
                prev.map((cv) => (cv._id === editingCV._id ? { ...cv, ...updatedData } : cv))
            );
            setEditingCV(null); 
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleCancelEdit = () => {
        setEditingCV(null); 
    };

    return (
        <div>
            <h2>Alle CVer</h2>
            {viewingCV ? (
                <CVView cv={viewingCV} onClose={() => setViewingCV(null)} />
            ) : editingCV ? (
                <CVForm
                    initialData={editingCV} 
                    onSave={handleUpdateCV} 
                    onCancel={handleCancelEdit} 
                />
            ) : (
                <ul>
                    {cvs.map((cv) => (
                        <li key={cv._id}>
                            <h3 onClick={() => setViewingCV(cv)}>{cv.personalInfo?.name || "Ukjent navn"}</h3>
                            <button onClick={() => handleEditCV(cv)}>Rediger</button>
                            <button onClick={() => handleDeleteCV(cv._id)}>Slett</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CVManagement;
