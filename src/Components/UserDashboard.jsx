import React, { useState } from "react";
import useCVs from "../Hooks/UseCvs";
import CVForm from "./CV/CVForm";
import CVView from "./CV/CvView";
import CVCustomizer from "./CV/CvCustomizer";
import exportToPDF from "../Utils/ExportToPdf";
import { useAuth } from "../Context/AuthContext";

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const { cvs, addCV, updateCV, deleteCV, loading, error } = useCVs(false, user);
    const [selectedCV, setSelectedCV] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [viewingCV, setViewingCV] = useState(null);
    const [customizingCV, setCustomizingCV] = useState(null);
    const [hoveredCV, setHoveredCV] = useState(null);

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

    const handleSave = (cvData) => {
        if (isCreating) {
            addCV(cvData);
        } else {
            updateCV(selectedCV._id, cvData);
        }
        setIsFormVisible(false);
    };

    return (
        <div>
            <div className="dashboard-header">
                <h2>Mine CVer</h2>
                <button className="action-btn" onClick={logout}>Logg ut</button>
            </div>
            {loading && <p>Laster...</p>}
            {error && <p>Error: {error}</p>}
            {viewingCV ? (
                <div>
                    <CVView cv={viewingCV} onClose={() => setViewingCV(null)} />
                </div>
            ) : (
                <>
                    <button className="action-btn" onClick={handleCreateNewCV}>Opprett ny CV</button>
                    {!isFormVisible && (
                        <ul className="cv-list">
                            {cvs.map((cv) => (
                                <li
                                    key={cv._id}
                                    className={`cv-item ${hoveredCV === cv._id ? "hovered" : ""}`}
                                    onMouseEnter={() => setHoveredCV(cv._id)}
                                    onMouseLeave={() => setHoveredCV(null)}
                                >
                                    <h3
                                        onClick={() => setViewingCV(cv)}
                                        className="cv-title"
                                    >
                                        {cv.personalInfo?.name || "Ukjent navn"}
                                    </h3>
                                    {hoveredCV === cv._id && (
                                        <div className="cv-actions">
                                            <button
                                                className="action-btn"
                                                onClick={() => setViewingCV(cv)}
                                            >
                                                Se CV
                                            </button>
                                            <button
                                                className="action-btn"
                                                onClick={() => handleEditCV(cv)}
                                            >
                                                Rediger
                                            </button>
                                            <button
                                                className="action-btn"
                                                onClick={() => setCustomizingCV(cv)}
                                            >
                                                Tilpass CV
                                            </button>
                                            <button
                                                className="action-btn"
                                                onClick={() => deleteCV(cv._id)}
                                            >
                                                Slett
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                    {isFormVisible && (
                        <CVForm
                            initialData={isCreating ? null : selectedCV}
                            onSave={handleSave}
                            onCancel={handleCancelEdit}
                        />
                    )}
                    {customizingCV && (
                        <div className="cv-customizer">
                            <CVCustomizer 
                                cv={customizingCV} 
                                onExport={(cvData) => exportToPDF(cvData)} 
                                onClose={() => setCustomizingCV(null)} 
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default UserDashboard;
