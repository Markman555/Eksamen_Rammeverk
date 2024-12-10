import React, { useState, useEffect } from "react";

const CVForm = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        personalInfo: {
            name: "",
            email: "",
            phone: "",
        },
        skills: [],
        education: [],
        experience: [],
        references: [],
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                [name]: value,
            },
        }));
    };

    // Handle skills array
    const handleSkillChange = (index, value) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.map((skill, i) => (i === index ? value : skill)),
        }));
    };

    const handleAddSkill = () => {
        setFormData((prev) => ({
            ...prev,
            skills: [...prev.skills, ""],
        }));
    };

    const handleRemoveSkill = (index) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index),
        }));
    };

    // Generic handlers for object arrays
    const handleArrayChange = (field, index, key, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].map((item, i) =>
                i === index ? { ...item, [key]: value } : item
            ),
        }));
    };

    const handleAddItem = (field, newItem) => {
        setFormData((prev) => ({
            ...prev,
            [field]: [...prev[field], newItem],
        }));
    };

    const handleRemoveItem = (field, index) => {
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{initialData ? "Edit CV" : "Create CV"}</h2>
            <h3>Personal Info</h3>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.personalInfo.name}
                    onChange={handlePersonalInfoChange}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.personalInfo.email}
                    onChange={handlePersonalInfoChange}
                />
            </label>
            <label>
                Phone:
                <input
                    type="text"
                    name="phone"
                    value={formData.personalInfo.phone}
                    onChange={handlePersonalInfoChange}
                />
            </label>

            <h3>Skills</h3>
            {formData.skills.map((skill, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                    />
                    <button type="button" onClick={() => handleRemoveSkill(index)}>
                        Remove
                    </button>
                </div>
            ))}
            <button type="button" onClick={handleAddSkill}>
                Add Skill
            </button>

            <h3>Education</h3>
            {formData.education.map((education, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Institution"
                        value={education.institution || ""}
                        onChange={(e) =>
                            handleArrayChange("education", index, "institution", e.target.value)
                        }
                    />
                    <input
                        type="text"
                        placeholder="Degree"
                        value={education.degree || ""}
                        onChange={(e) =>
                            handleArrayChange("education", index, "degree", e.target.value)
                        }
                    />
                    <input
                        type="text"
                        placeholder="Year"
                        value={education.year || ""}
                        onChange={(e) =>
                            handleArrayChange("education", index, "year", e.target.value)
                        }
                    />
                    <button type="button" onClick={() => handleRemoveItem("education", index)}>
                        Remove
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() =>
                    handleAddItem("education", { institution: "", degree: "", year: "" })
                }
            >
                Add Education
            </button>

            <h3>Experience</h3>
            {formData.experience.map((experience, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={experience.title || ""}
                        onChange={(e) =>
                            handleArrayChange("experience", index, "title", e.target.value)
                        }
                    />
                    <input
                        type="text"
                        placeholder="Company"
                        value={experience.company || ""}
                        onChange={(e) =>
                            handleArrayChange("experience", index, "company", e.target.value)
                        }
                    />
                    <input
                        type="text"
                        placeholder="Years"
                        value={experience.years || ""}
                        onChange={(e) =>
                            handleArrayChange("experience", index, "years", e.target.value)
                        }
                    />
                    <button type="button" onClick={() => handleRemoveItem("experience", index)}>
                        Remove
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() =>
                    handleAddItem("experience", { title: "", company: "", years: "" })
                }
            >
                Add Experience
            </button>

            <h3>References</h3>
            {formData.references.map((reference, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={reference.name || ""}
                        onChange={(e) =>
                            handleArrayChange("references", index, "name", e.target.value)
                        }
                    />
                    <input
                        type="text"
                        placeholder="Contact Info"
                        value={reference.contactInfo || ""}
                        onChange={(e) =>
                            handleArrayChange("references", index, "contactInfo", e.target.value)
                        }
                    />
                    <button type="button" onClick={() => handleRemoveItem("references", index)}>
                        Remove
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() =>
                    handleAddItem("references", { name: "", contactInfo: "" })
                }
            >
                Add Reference
            </button>

            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
};

export default CVForm;
