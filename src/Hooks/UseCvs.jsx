import { useState, useEffect } from "react";
import { fetchCV, createCV, updateCVById, deleteCVById } from "../Utils/CvsApi";
import { useAuth } from "../Context/AuthContext";

const useCVs = (isAdmin) => {
    const { user } = useAuth();
    const [cvs, setCvs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadCVs = async () => {
            setLoading(true);
            try {
                const allCVs = await fetchCV();
                if (isAdmin) {
                    setCvs(allCVs);
                } else {
                    const userCVs = allCVs.filter((cv) => cv.createdBy === user?.username);
                    setCvs(userCVs);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadCVs();
    }, [isAdmin, user]);

    const addCV = async (cvData) => {
        try {
            const newCV = await createCV({ ...cvData, createdBy: user?.username });
            setCvs((prev) => [...prev, newCV]);
        } catch (error) {
            setError(error.message);
        }
    };

    const updateCV = async (id, updatedData) => {
        try {
            const sanitizedData = { ...updatedData };
            delete sanitizedData._id; // Fjern _id før oppdatering
            await updateCVById(id, sanitizedData);
            setCvs((prev) =>
                prev.map((cv) => (cv._id === id ? { ...cv, ...updatedData } : cv))
            );
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteCV = async (id) => {
        try {
            await deleteCVById(id);
            setCvs((prev) => prev.filter((cv) => cv._id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    return { cvs, loading, error, addCV, updateCV, deleteCV };
};

export default useCVs;
