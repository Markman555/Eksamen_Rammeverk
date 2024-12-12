import React, { useState, useEffect } from "react";

const existingInstitutions = [
    "Gokstad Akademiet",
    "University of Oslo",
    "OsloMet",
    "Norges teknisk-naturvitenskapelige universitet",
    "Universitetet i Bergen",
];

const existingSkills = [
    "JavaScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "C#",
    "HTML",
    "CSS",
    "SQL",
    "Docker",
    "Kubernetes",
    "Git",
];

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

    const [institutionSuggestions, setInstitutionSuggestions] = useState([]);
    const [skillSuggestions, setSkillSuggestions] = useState([]);
    const [selectedInstitution, setSelectedInstitution] = useState("");
    const [searchingSkill, setSearchingSkill] = useState("");

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

    const handleSkillChange = (index, value) => {
        setSearchingSkill(value);
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.map((skill, i) => (i === index ? value : skill)),
        }));

        if (value) {
            const filteredSkills = existingSkills.filter((skill) =>
                skill.toLowerCase().includes(value.toLowerCase())
            );
            setSkillSuggestions(filteredSkills);
        } else {
            setSkillSuggestions([]);
        }
    };

    const handleSkillSelect = (skill, index) => {
        setSearchingSkill("");
        setSkillSuggestions([]);

        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.map((_, i) => (i === index ? skill : prev.skills[i])),
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

    const handleInstitutionChange = (e, index) => {
        const value = e.target.value;
        setSelectedInstitution(value);
        if (value) {
            const filteredSuggestions = existingInstitutions.filter((institution) =>
                institution.toLowerCase().includes(value.toLowerCase())
            );
            setInstitutionSuggestions(filteredSuggestions);
        } else {
            setInstitutionSuggestions([]);
        }

        setFormData((prev) => {
            const updatedEducation = [...prev.education];
            updatedEducation[index] = {
                ...updatedEducation[index],
                institution: value,
            };
            return {
                ...prev,
                education: updatedEducation,
            };
        });
    };

    const handleInstitutionSelect = (institution, index) => {
        setSelectedInstitution(institution);
        setInstitutionSuggestions([]);

        setFormData((prev) => {
            const updatedEducation = [...prev.education];
            updatedEducation[index] = {
                ...updatedEducation[index],
                institution: institution,
            };
            return {
                ...prev,
                education: updatedEducation,
            };
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{initialData ? "Edit CV" : "Create CV"}</h2>
            <h4>Personal Info</h4>
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

            <h4>Skills</h4>
            {formData.skills.map((skill, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={skill}
                        placeholder="Search for skill"
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                    />
                    {skillSuggestions.length > 0 && searchingSkill && (
                        <div className="skill-suggestions">
                            {skillSuggestions.map((suggestion, idx) => (
                                <div
                                    key={idx}
                                    className="suggestion-item"
                                    onClick={() => handleSkillSelect(suggestion, index)}
                                >
                                    {suggestion}
                                </div>
                            ))}
                        </div>
                    )}
                    <button type="button" onClick={() => handleRemoveSkill(index)}>
                        Remove
                    </button>
                </div>
            ))}
            <button type="button" onClick={handleAddSkill}>
                Add Skill
            </button>

            <h4>Education</h4>
            {formData.education.map((education, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Institution"
                        value={education.institution || selectedInstitution}
                        onChange={(e) => handleInstitutionChange(e, index)}
                    />
                    {institutionSuggestions.length > 0 && (
                        <div className="institution-suggestions">
                            {institutionSuggestions.map((institution, idx) => (
                                <div
                                    key={idx}
                                    className="suggestion-item"
                                    onClick={() => handleInstitutionSelect(institution, index)}
                                >
                                    {institution}
                                </div>
                            ))}
                        </div>
                    )}
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

            <h4>Experience</h4>
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

            <h4>References</h4>
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
