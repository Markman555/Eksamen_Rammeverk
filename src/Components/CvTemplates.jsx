// CVTemplates.js
import React from "react";

export const Template1 = React.forwardRef((props, ref) => (
    <div ref={ref} style={{ fontFamily: "Arial, sans-serif", padding: "20px", lineHeight: "1.5" }}>
        <h1 style={{ textAlign: "center" }}>{props.data.personalInfo.name}</h1>
        <h3 style={{ textAlign: "center" }}>{props.data.personalInfo.email}</h3>
        <h3 style={{ textAlign: "center" }}>{props.data.personalInfo.phone}</h3>
        <hr />
        <h2>Skills</h2>
        <ul>
            {props.data.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
            ))}
        </ul>
        <h2>Education</h2>
        <ul>
            {props.data.education.map((edu, index) => (
                <li key={index}>
                    {edu.institution} - {edu.degree} ({edu.year})
                </li>
            ))}
        </ul>
        <h2>Experience</h2>
        <ul>
            {props.data.experience.map((exp, index) => (
                <li key={index}>
                    {exp.title} at {exp.company} ({exp.years})
                </li>
            ))}
        </ul>
        <h2>References</h2>
        <ul>
            {props.data.references.map((ref, index) => (
                <li key={index}>
                    {ref.name}: {ref.contactInfo}
                </li>
            ))}
        </ul>
    </div>
));

// Du kan definere flere maler her, f.eks. Template2, Template3
export const Template2 = React.forwardRef((props, ref) => (
    <div ref={ref} style={{ fontFamily: "Times New Roman, serif", padding: "20px" }}>
        {/* Alternativ layout */}
        <h1>{props.data.personalInfo.name}</h1>
        <h3>{props.data.personalInfo.email} | {props.data.personalInfo.phone}</h3>
        {/* Fortsett med alternativ layout for andre seksjoner */}
    </div>
));
