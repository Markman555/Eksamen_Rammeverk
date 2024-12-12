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
        personalInfo: { name: "", email: "", phone: "" },
        skills: [],
        education: [],
        experience: [],
        references: [],
    });
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState({ skills: [], institutions: [] });

    useEffect(() => {
        if (initialData) setFormData(initialData);
    }, [initialData]);

    const updateFormField = (field, value) =>
        setFormData((prev) => ({ ...prev, [field]: value }));

    const handleNestedChange = (field, index, key, value) =>
        updateFormField(
            field,
            formData[field].map((item, i) => (i === index ? { ...item, [key]: value } : item))
        );

    const handleAddItem = (field, newItem) =>
        updateFormField(field, [...formData[field], newItem]);

    const handleRemoveItem = (field, index) =>
        updateFormField(field, formData[field].filter((_, i) => i !== index));

    const handleSearch = (type, term) => {
        setSearchTerm(term);
        const list = type === "skills" ? existingSkills : existingInstitutions;
        setSuggestions((prev) => ({
            ...prev,
            [type]: list.filter((item) =>
                item.toLowerCase().includes(term.toLowerCase())
            ),
        }));
    };

    const handleSuggestionSelect = (type, value, index = null) => {
        setSearchTerm("");
        setSuggestions((prev) => ({ ...prev, [type]: [] }));
        if (type === "skills") {
            if (!formData.skills.includes(value))
                updateFormField("skills", [...formData.skills, value]);
        } else if (type === "institutions" && index !== null) {
            handleNestedChange("education", index, "institution", value);
        }
    };

    const renderListItems = (field, structure, placeholder) =>
        formData[field].map((item, index) => (
            <div key={index}>
                {Object.keys(structure).map((key) => (
                    <input
                        key={key}
                        type="text"
                        placeholder={structure[key]}
                        value={item[key] || ""}
                        onChange={(e) =>
                            handleNestedChange(field, index, key, e.target.value)
                        }
                    />
                ))}
                <button
                    type="button"
                    onClick={() => handleRemoveItem(field, index)}
                >
                    Remove
                </button>
            </div>
        ));

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{initialData ? "Edit CV" : "Create CV"}</h2>

            <h4>Personal Info</h4>
            {["name", "email", "phone"].map((key) => (
                <label key={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                    <input
                        type={key === "email" ? "email" : "text"}
                        name={key}
                        value={formData.personalInfo[key]}
                        onChange={(e) =>
                            updateFormField("personalInfo", {
                                ...formData.personalInfo,
                                [e.target.name]: e.target.value,
                            })
                        }
                    />
                </label>
            ))}

            <h4>Skills</h4>
            <input
                type="text"
                placeholder="Search for skills"
                value={searchTerm}
                onChange={(e) => handleSearch("skills", e.target.value)}
            />
            {suggestions.skills.length > 0 && (
                <div className="suggestions">
                    {suggestions.skills.map((skill, i) => (
                        <div
                            key={i}
                            onClick={() => handleSuggestionSelect("skills", skill)}
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            )}
            <div>
                {formData.skills.map((skill, i) => (
                    <div key={i}>
                        {skill}
                        <button
                            type="button"
                            onClick={() => handleRemoveItem("skills", i)}
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <h4>Education</h4>
            {renderListItems(
                "education",
                { institution: "Institution", degree: "Degree", year: "Year" }
            )}
            <button
                type="button"
                onClick={() =>
                    handleAddItem("education", { institution: "", degree: "", year: "" })
                }
            >
                Add Education
            </button>

            <h4>Experience</h4>
            {renderListItems(
                "experience",
                { title: "Title", company: "Company", years: "Years" }
            )}
            <button
                type="button"
                onClick={() =>
                    handleAddItem("experience", { title: "", company: "", years: "" })
                }
            >
                Add Experience
            </button>

            <h4>References</h4>
            {renderListItems(
                "references",
                { name: "Name", contactInfo: "Contact Info" }
            )}
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
