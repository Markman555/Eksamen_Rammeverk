const BASE_URL = "https://crudcrud.com/api/6203786faf284d84aee5f7072199e1c8";
export const fetchCVByUserId = async (userId) => {
    try {
        const response = await fetch(`${BASE_URL}/cvs?userId=${userId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch CV: ${response.status}`);
        }
        const data = await response.json();
        return data; // Forventet å returnere en liste over CV-er
    } catch (error) {
        console.error("Error fetching CV:", error);
        throw error;
    }
};

// Opprett en ny CV
export const createCV = async (cvData) => {
    try {
        const response = await fetch(`${BASE_URL}/cvs`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cvData),
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
export const updateCVById = async (cvId, updatedCVData) => {
    try {
        const response = await fetch(`${BASE_URL}/cvs/${cvId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCVData),
        });
        if (!response.ok) {
            throw new Error(`Failed to update CV: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating CV:", error);
        throw error;
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