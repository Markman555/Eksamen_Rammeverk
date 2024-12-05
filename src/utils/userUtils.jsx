import { useAddUserMutation } from "../features/apiSlice";

// Funksjon for å opprette en ny bruker
export const handleCreateUser = async (newUser, addUser) => {
  if (newUser.name && newUser.email && newUser.password) {
    try {
      await addUser({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role, // Rolle som 'user' eller 'admin'
      }).unwrap();
      return true;
    } catch (error) {
      console.error('Error creating user:', error);
      return false;
    }
  }
  return false;
};