import React, { useState, useEffect } from "react";

const CVForm = ({ initialData, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        personalInfo: {
            name: "",
            email: "",
            phone: "",
        },
        skills: [], //Gjør om til objekt?
        education: [],
        experience: [],
        references: [],
    });


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

    const handleArrayChange = (e, field, index) => {
        const newValue = e.target.value;
        setFormData((prev) => ({
            ...prev,
            [field]: prev[field].map((item, i) => (i === index ? newValue : item)),
        }));
    };
    
    const handleAddItem = (field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: [...prev[field], ""],
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
           {formData.skills.map((skill, index) => (
               <div key={index}>
               <input
                type="text"
                value={skill}
                onChange={(e) => handleArrayChange(e, "skills", index)}
            />
            <button type="button" onClick={() => handleRemoveItem("skills", index)}>
                Remove
            </button>
           </div>
            ))}
          <button type="button" onClick={() => handleAddItem("skills")}>
        Add Skill
       </button>
      </label>
            <label>
                Education:
                {formData.education.map((education, index) => (
                    <div key={index}>
                        <input 
                         type="text"
                         value={education}
                         onChange={(e) => handleArrayChange(e, "education", index)}
                         />
                         <button type="button" onClick={() => handleRemoveItem("education", index)}>
                            Remove
                         </button>
                    </div>
                ))}
                   <button type="button" onClick={() => handleAddItem("education")}>
                    Add Education
                   </button>
            </label>
            <label>
                Experience:
                {formData.experience.map((experience, index) => (
                    <div key={index}>
                        <input 
                         type="text"
                         value={experience}
                         onChange={(e) => handleArrayChange(e, "experience", index)}
                         />
                         <button type="button" onClick={() => handleRemoveItem("experience", index)}>
                            Remove
                         </button>
                    </div>
                ))}
                   <button type="button" onClick={() => handleAddItem("experience")}>
                    Add experience
                   </button>
            </label>
            <label>
                References:
                {formData.references.map((references, index) => (
                    <div key={index}>
                        <input 
                         type="text"
                         value={references}
                         onChange={(e) => handleArrayChange(e, "references", index)}
                         />
                         <button type="button" onClick={() => handleRemoveItem("references", index)}>
                            Remove
                         </button>
                    </div>
                ))}
                   <button type="button" onClick={() => handleAddItem("references")}>
                    Add references
                   </button>
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
};

export default CVForm;