import { jsPDF } from "jspdf";

const exportToPDF = (cvData) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("CV Information", 10, 10);

    doc.setFontSize(12);
    doc.text("Ferdigheter:", 10, 20);
    cvData.skills.forEach((skill, i) => {
        doc.text(`- ${skill}`, 10, 30 + i * 10);
    });

    let y = 40 + cvData.skills.length * 10;
    doc.text("Erfaring:", 10, y);
    cvData.experience.forEach((exp, i) => {
        doc.text(`- ${exp.title} at ${exp.company}`, 10, y + (i + 1) * 10);
    });

    y += cvData.experience.length * 10 + 10;
    doc.text("Utdanning:", 10, y);
    cvData.education.forEach((edu, i) => {
        doc.text(`- ${edu.institution} (${edu.degree})`, 10, y + (i + 1) * 10);
    });

    doc.save("cv.pdf");
};

export default exportToPDF;