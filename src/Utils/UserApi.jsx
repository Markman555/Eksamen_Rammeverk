const BASE_URL = "https://crudcrud.com/api/6203786faf284d84aee5f7072199e1c8";

export const fetchUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/users`);

        if (!response.ok) {
            throw new Error("Kunne ikke hente brukere");
        }

        const data = await response.json();

        // Logg responsen for å se hvordan dataene ser ut
        console.log("Hentet brukere:", data);

        return data;
    } catch (error) {
        console.error("Feil ved henting av brukere:", error.message);
        throw new Error("Kunne ikke hente brukere");
    }
};


// Hent en bruker etter ID. Kanskje slett?
export const fetchUserById = async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) {
        throw new Error("Kunne ikke hente bruker");
    }
    return await response.json();
};


export const createUser = async (user) => {
    console.log("Sender data til serveren:", user); // Logg dataene før de sendes

    const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    // Logg serverens svar
    const responseData = await response.json();
    console.log("Serverens svar:", responseData);

    if (!response.ok) {
        throw new Error("Kunne ikke opprette bruker");
    }
    
    return responseData;
};

export const updateUser = async (id, updatedData) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    });

    console.log("Respons fra serveren:", response);

    // Håndter feil ved oppdatering
    if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Feil ved oppdatering:", errorDetails);
        throw new Error("Kunne ikke oppdatere bruker");
    }

    // Håndter spesifikke 204 No Content-tilfeller
    if (response.status === 204) {
        console.log("Serveren returnerte ingen innhold (204)");
        return {};  // Returner et tomt objekt
    }

    // Hvis responsen ikke er tom, prøv å parse JSON
    const responseText = await response.text();
    console.log("Responsinnhold:", responseText);

    // Sjekk om det finnes noe innhold i responsen
    if (responseText.trim() === "") {
        console.log("Serveren returnerte ingen data.");
        return {};  // Returner et tomt objekt hvis responsen er tom
    }

    // Prøv å parse JSON
    try {
        const responseData = JSON.parse(responseText);
        console.log("Responsdata etter oppdatering:", responseData);
        return responseData;
    } catch (error) {
        console.error("Kunne ikke parse JSON:", error);
        throw new Error("Serveren returnerte ugyldig JSON");
    }
};



export const deleteUser = async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Kunne ikke slette bruker");
    }
};
//Kanskje slett?
export const fetchUserByUsername = async (username) => {
    const users = await fetchUsers();
    return users.find((u) => u.username === username);
};
