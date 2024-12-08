const BASE_URL = "https://crudcrud.com/api/6203786faf284d84aee5f7072199e1c8";
export const fetchCV = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/cvs`);
        if (!response.ok) {
            throw new Error(`Failed to fetch CVs: ${response.status}`);
        }
        const allCVs = await response.json();
        // Filtrer CV-er basert på brukerens ID
        const userCVs = allCVs.filter((cv) => cv.userId === userId);
        return userCVs;
    } catch (error) {
        console.error("Error fetching CVs:", error);
        throw error;
    }
};


// Opprett en ny CV
export const createCV = async (cvData, userId) => {
    try {
        const response = await fetch(`${BASE_URL}/cvs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...cvData, userId }), // Legg til userId
        });
        if (!response.ok) {
            throw new Error(`Failed to create CV: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error creating CV:", error);
        throw error;
    }
};

// Oppdater eksisterende CV basert på CV-ID
export const updateCVById = async (cvId, cvData) => {
    try {
        const response = await fetch(`https://crudcrud.com/api/6203786faf284d84aee5f7072199e1c8/cvs/${cvId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cvData),
        });

        if (response.status === 200) {
            console.log("CV updated successfully");
            return true; // Returner true for å indikere at oppdateringen er vellykket
        } else {
            console.error(`Failed to update CV: ${response.statusText}`);
            return false; // Returner false hvis statusen ikke er 200
        }
    } catch (error) {
        console.error("Error updating CV:", error);
        throw error; // Kaster feilen videre
    }
};


// Slett en CV basert på CV-ID
export const deleteCVById = async (cvId) => {
    try {
        const response = await fetch(`${BASE_URL}/cvs/${cvId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Failed to delete CV: ${response.status}`);
        }
    } catch (error) {
        console.error("Error deleting CV:", error);
        throw error;
    }
};