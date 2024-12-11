import React, { useState } from "react";
import useCVs from "../../Hooks/UseCvs";
import CVForm from "../CV/CVForm";
import CVView from '../CV/CvView';
import exportToPDF from "../../Utils/ExportToPdf";
import CVCustomizer from "../CV/CvCustomizer";

const CVManagement = () => {
    const { cvs, addCV, updateCV, deleteCV, loading, error } = useCVs(true, null);
    const [editingCV, setEditingCV] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [viewingCV, setViewingCV] = useState(null);

    const handleExport = (customizedCV) => {
        exportToPDF(customizedCV);
    };

    const handleEditCV = (cv) => {
        setEditingCV(cv);
        setIsCreating(false);
    };

    const handleCreateCV = () => {
        setEditingCV(null);
        setIsCreating(true);
    };

    const handleCancelEdit = () => {
        setEditingCV(null);
        setIsCreating(false);
    };

    const handleSave = (cvData) => {
        if (isCreating) {
            addCV(cvData); 
        } else if (editingCV?._id) {
            updateCV(editingCV._id, cvData); 
        }
        setEditingCV(null);
        setIsCreating(false); 
    };

    return (
        <div>
            <h2>Liste over CV til brukere</h2>
            {loading && <p>Laster...</p>}
            {error && <p>Error: {error}</p>}
            {viewingCV ? (
                <>
                    <CVView cv={viewingCV} onClose={() => setViewingCV(null)} />
                    <CVCustomizer cv={viewingCV} onExport={handleExport} />
                </>
            ) : (
                <>
                    <button onClick={handleCreateCV}>Opprett ny CV</button>
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
                    {(isCreating || editingCV) && (
                        <CVForm
                            initialData={isCreating ? null : editingCV}
                            onSave={handleSave}
                            onCancel={handleCancelEdit}
                        />
                    )}
                    {editingCV && (
                        <CVCustomizer cv={editingCV} onExport={handleExport} />
                    )}
                </>
            )}
        </div>
    );
};

export default CVManagement;
