import React, { useState } from "react";
import createPDFWithTemplate from "../../Utils/ExportToPdf";

const CVCustomizer = ({ cv, onClose }) => {
    const [selectedSkills, setSelectedSkills] = useState(new Set(cv.skills));
    const [selectedExperience, setSelectedExperience] = useState(new Set(cv.experience));
    const [selectedEducation, setSelectedEducation] = useState(new Set(cv.education));
    const [selectedTemplate, setSelectedTemplate] = useState("default");

    const toggleSelection = (set, item) => {
        set((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(item)) {
                newSet.delete(item);
            } else {
                newSet.add(item);
            }
            return newSet;
        });
    };

    const handleExport = () => {
        // Samle alt data, inkludert personlig informasjon
        const customizedCV = {
            personalInfo: cv.personalInfo,
            skills: Array.from(selectedSkills),
            experience: Array.from(selectedExperience),
            education: Array.from(selectedEducation),
        };

        // Bruk template og eksporter til PDF
        createPDFWithTemplate(customizedCV, selectedTemplate);
    };

    return (
        <div>
            <h2>Tilpass CV</h2>
            <h3>Personlig Informasjon</h3>
            <p><strong>Navn:</strong> {cv.personalInfo.name}</p>
            <p><strong>Adresse:</strong> {cv.personalInfo.address}</p>
            <p><strong>Telefon:</strong> {cv.personalInfo.phone}</p>
            <p><strong>E-post:</strong> {cv.personalInfo.email}</p>

            <h3>Velg mal</h3>
            <select onChange={(e) => setSelectedTemplate(e.target.value)} value={selectedTemplate}>
                <option value="default">Standard</option>
                <option value="modern">Moderne</option>
            </select>

            <h3>Ferdigheter</h3>
            <ul>
                {cv.skills.map((skill, index) => (
                    <li key={index}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedSkills.has(skill)}
                                onChange={() => toggleSelection(setSelectedSkills, skill)}
                            />
                            {skill}
                        </label>
                    </li>
                ))}
            </ul>

            <h3>Erfaring</h3>
            <ul>
                {cv.experience.map((exp, index) => (
                    <li key={index}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedExperience.has(exp)}
                                onChange={() => toggleSelection(setSelectedExperience, exp)}
                            />
                            {exp.title} at {exp.company}
                        </label>
                    </li>
                ))}
            </ul>

            <h3>Utdanning</h3>
            <ul>
                {cv.education.map((edu, index) => (
                    <li key={index}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedEducation.has(edu)}
                                onChange={() => toggleSelection(setSelectedEducation, edu)}
                            />
                            {edu.institution} - {edu.degree}
                        </label>
                    </li>
                ))}
            </ul>

            <button onClick={handleExport}>Eksporter til PDF</button>
            <button onClick={onClose} className="close-btn">Lukk</button>
        </div>
    );
};

export default CVCustomizer;
