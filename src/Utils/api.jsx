const BASE_URL = "https://crudcrud.com/api/6203786faf284d84aee5f7072199e1c8";

// Hent alle brukere
export const fetchUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) {
        throw new Error("Kunne ikke hente brukere");
    }
    return await response.json();
};

// Opprett en ny bruker
export const createUser = async (user) => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error("Kunne ikke opprette bruker");
    }
    return await response.json();
};

// Oppdater en bruker
export const updateUser = async (id, updatedData) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
        throw new Error("Kunne ikke oppdatere bruker");
    }
};

// Slett en bruker
export const deleteUser = async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Kunne ikke slette bruker");
    }
};

// Hent en bruker ved brukernavn
export const fetchUserByUsername = async (username) => {
    const users = await fetchUsers();
    return users.find((u) => u.username === username);
};
