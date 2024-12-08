import React, { useState, useEffect } from "react";

const CVForm = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        personalInfo: {
            name: "",
            email: "",
            phone: "",
        },
        skills: "",
        education: "",
        experience: "",
        references: "",
    });

    // Når initialData endrer seg, oppdater formData
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in formData.personalInfo) {
            setFormData(prev => ({
                ...prev,
                personalInfo: {
                    ...prev.personalInfo,
                    [name]: value,
                },
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData); // Send data tilbake til UserDashboard
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{initialData ? "Edit CV" : "Create CV"}</h2>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.personalInfo.name}
                    onChange={handleChange}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.personalInfo.email}
                    onChange={handleChange}
                />
            </label>
            <label>
                Phone:
                <input
                    type="text"
                    name="phone"
                    value={formData.personalInfo.phone}
                    onChange={handleChange}
                />
            </label>
            <label>
                Skills:
                <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                />
            </label>
            <label>
                Education:
                <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                />
            </label>
            <label>
                Experience:
                <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                />
            </label>
            <label>
                References:
                <input
                    type="text"
                    name="references"
                    value={formData.references}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
};

export default CVForm;
