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

export const createUser = async (user) => {

    const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

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

    if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Feil ved oppdatering:", errorDetails);
        throw new Error("Kunne ikke oppdatere bruker");
    }


    const responseText = await response.text();
    console.log("Responsinnhold:", responseText);

    if (responseText.trim() === "") {
        return {};  
    }

    try {
        const responseData = JSON.parse(responseText);
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

