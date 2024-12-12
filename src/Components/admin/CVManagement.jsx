// Admin kan toggle CVManagement. I denne filen kan Admin opprette ny CV, oppdatere og slette CV. Jeg bruker custom hook, useCVs for den mer komplekse biten,
// Men også for at det skal kunne gjenbrukes i userDashboard og dermed ikke repetere kode. 
import React, { useState } from "react"; 
import useCVs from "../../Hooks/UseCvs";
import CVForm from "../CV/CVForm";
import CVView from '../CV/CvView';
import CVCustomizer from "../CV/CvCustomizer";
import ConfirmationModal from "../UI-Popup/ConfirmationModal";

const CVManagement = () => {
    const { cvs, addCV, updateCV, deleteCV, loading, error } = useCVs(true, null);
    const [editingCV, setEditingCV] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [hoveredCV, setHoveredCV] = useState(null); 
    const [customizingCV, setCustomizingCV] = useState(null); 
    const [viewingDetails, setViewingDetails] = useState(null); 
    const [showModal, setShowModal] = useState(false); 
    const [cvToDelete, setCvToDelete] = useState(null); 


    // Funksjonen håndterer state og veksler mellom å opprette ny og å redigere et eksisterende cv
    const handleEditCV = (cv) => {
        setEditingCV(cv);
        setIsCreating(false);
    };
    
    // Samme som over, men omvendt
    const handleCreateCV = () => {
        setIsCreating(true);
        setEditingCV(null);
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

    const toggleCVCustomizer = (cv) => {
        if (customizingCV?._id === cv._id) {
            setCustomizingCV(null); 
        } else {
            setCustomizingCV(cv); 
        }
    };

    const toggleViewCV = (cv) => {
        if (viewingDetails?._id === cv._id) {
            setViewingDetails(null); 
        } else {
            setViewingDetails(cv); 
        }
    };

    const handleDeleteCV = (cv) => {
        console.log('handleDeleteCV called with CV:', cv);
        setCvToDelete(cv);
        setShowModal(true);
    }

    const confirmDeleteCv = (cv) => {
        deleteCV(cvToDelete._id);
        setShowModal(true);
        setCvToDelete(null);
    }

    const cancelDeleteCv = () => {
        setShowModal(false);
        setCvToDelete(null);
    }

    return (
        <div>
            <h2>Liste over CV til brukere</h2>
            {loading && <p>Laster...</p>}
            {error && <p>Error: {error}</p>}

            {isCreating || editingCV ? (
                <CVForm
                    initialData={isCreating ? null : editingCV}
                    onSave={handleSave}
                    onCancel={handleCancelEdit}
                />
            ) : (
                <>
                    <button onClick={handleCreateCV}>Opprett ny CV</button>
                    <ul className="cv-list">
                        {cvs.map((cv) => (
                            <li 
                                key={cv._id}
                                onMouseEnter={() => setHoveredCV(cv._id)} 
                                onMouseLeave={() => setHoveredCV(null)}   
                                className={hoveredCV === cv._id ? 'cv-item hovered' : 'cv-item'} 
                            >
                                <h3
                                    onClick={() => toggleViewCV(cv)} 
                                    className="cv-title"
                                >
                                    {cv.personalInfo?.name || "Ukjent navn"}
                                </h3>
                                {hoveredCV === cv._id && ( 
                                    <div className="cv-actions">
                                        <button 
                                            onClick={() => toggleViewCV(cv)} 
                                            className="action-btn">
                                            {viewingDetails?._id === cv._id ? 'Lukk Se CV' : 'Se CV'}
                                        </button>
                                        <button 
                                            onClick={() => handleEditCV(cv)} 
                                            className="action-btn">Rediger</button>
                                        <button 
                                            onClick={() => handleDeleteCV(cv)} 
                                            className="action-btn">Slett</button>
                                        <button 
                                            onClick={() => toggleCVCustomizer(cv)} 
                                            className="action-btn">
                                            {customizingCV?._id === cv._id ? 'Lukk Tilpass CV' : 'Tilpass CV'}
                                        </button>
                                    </div>
                                )}

                            
                                {viewingDetails?._id === cv._id && ( 
                                    <CVView cv={cv} onClose={() => setViewingDetails(null)} />
                                )}

                                {customizingCV?._id === cv._id && (
                                    <CVCustomizer 
                                        cv={cv} 
                                        onClose={() => setCustomizingCV(null)} 
                                    />
                                )}

                                {editingCV?._id === cv._id && (
                                    <div className="cv-edit-form">
                                        <CVForm
                                            initialData={cv}
                                            onSave={handleSave}
                                            onCancel={handleCancelEdit}
                                        />
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </>
            )}
            {showModal && (
                <ConfirmationModal
                    message="Are you sure you want to delete this CV?"
                    onConfirm={confirmDeleteCv}
                    onCancel={cancelDeleteCv}
                />
            )}
        </div>
    );
};

export default CVManagement;
