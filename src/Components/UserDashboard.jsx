import React, { useState } from "react";
import useCVs from "../Hooks/UseCvs";
import CVForm from "./CVForm";
import CVView from "./CvView";

const UserDashboard = ({ user }) => {
    const { cvs, addCV, updateCV, deleteCV, loading, error } = useCVs(false, user);
    const [selectedCV, setSelectedCV] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [viewingCV, setViewingCV] = useState(null);

    const handleCreateNewCV = () => {
        setSelectedCV(null);
        setIsCreating(true);
        setIsFormVisible(true);
    };

    const handleEditCV = (cv) => {
        setSelectedCV(cv);
        setIsCreating(false);
        setIsFormVisible(true);
    };

    const handleCancelEdit = () => {
        setSelectedCV(null);
        setIsCreating(false);
        setIsFormVisible(false);
    };

    return (
        <div>
            <h2>Mine CVer</h2>
            {loading && <p>Laster...</p>}
            {error && <p>Error: {error}</p>}
            {viewingCV ? (
                <CVView cv={viewingCV} onClose={() => setViewingCV(null)} />
            ) : (
                <>
                    <button onClick={handleCreateNewCV}>Opprett ny CV</button>
                    <ul>
                        {cvs.map((cv) => (
                            <li key={cv._id}>
                                <h3
                                    onClick={() => setViewingCV(cv)}
                                    style={{ cursor: "pointer", textDecoration: "underline" }}
                                >
                                    {cv.personalInfo?.name || "Ukjent navn"}
                                </h3>
                                <button onClick={() => handleEditCV(cv)}>Rediger</button>
                                <button onClick={() => deleteCV(cv._id)}>Slett</button>
                            </li>
                        ))}
                    </ul>
                    {isFormVisible && (
                        <CVForm
                            initialData={isCreating ? null : selectedCV}
                            onSave={(cvData) => {
                                if (isCreating) {
                                    addCV(cvData);
                                } else {
                                    updateCV(selectedCV._id, cvData);
                                }
                                setIsFormVisible(false);
                            }}
                            onCancel={handleCancelEdit}
                        />
                    )}
                </>
            )}
        </div>
    );
    
};

export default UserDashboard;
