import React from "react";

const CVView = ({ cv, onClose }) => {
    if (!cv) return null;

    return (
        <div>
            <h2>CV Information</h2>
            <p><strong>Name:</strong> {cv.personalInfo?.name}</p>
            <p><strong>Email:</strong> {cv.personalInfo?.email}</p>
            <p><strong>Phone:</strong> {cv.personalInfo?.phone}</p>

            <h3>Skills</h3>
            <ul>
                {cv.skills?.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>

            <h3>Education</h3>
            <ul>
                {cv.education?.map((edu, index) => (
                    <li key={index}>
                        {edu.institution}, {edu.degree} ({edu.year})
                    </li>
                ))}
            </ul>

            <h3>Experience</h3>
            <ul>
                {cv.experience?.map((exp, index) => (
                    <li key={index}>
                        {exp.title} at {exp.company} ({exp.years})
                    </li>
                ))}
            </ul>

            <h3>References</h3>
            <ul>
                {cv.references?.map((ref, index) => (
                    <li key={index}>
                        {ref.name} - {ref.contactInfo}
                    </li>
                ))}
            </ul>

            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default CVView;
