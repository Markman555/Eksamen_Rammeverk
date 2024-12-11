import React, { useState } from "react";

const CVCustomizer = ({ cv, onExport }) => {
    const [selectedSkills, setSelectedSkills] = useState(new Set(cv.skills));
    const [selectedExperience, setSelectedExperience] = useState(new Set(cv.experience));
    const [selectedEducation, setSelectedEducation] = useState(new Set(cv.education));

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

    return (
        <div>
            <h2>Tilpass CV</h2>
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

            <button onClick={() => onExport({
                skills: Array.from(selectedSkills),
                experience: Array.from(selectedExperience),
                education: Array.from(selectedEducation),
            })}>
                Eksporter til PDF
            </button>
        </div>
    );
};

export default CVCustomizer;
