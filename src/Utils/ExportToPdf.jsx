import { jsPDF } from "jspdf";

const createPDFWithTemplate = (cvData, template) => {
  const doc = new jsPDF();

  if (template === "default") {
    // Standard mal
    doc.setFontSize(16);
    doc.text("CV Information", 10, 10);

    // Personlig informasjon
    doc.setFontSize(14);
    doc.text(`Navn: ${cvData.personalInfo.name}`, 10, 20);
    doc.text(`Adresse: ${cvData.personalInfo.address}`, 10, 30);
    doc.text(`Telefon: ${cvData.personalInfo.phone}`, 10, 40);
    doc.text(`E-post: ${cvData.personalInfo.email}`, 10, 50);

    // Ferdigheter
    doc.setFontSize(12);
    doc.text("Ferdigheter:", 10, 60);
    cvData.skills.forEach((skill, i) => {
      doc.text(`- ${skill}`, 10, 70 + i * 10);
    });

    let y = 80 + cvData.skills.length * 10;
    doc.text("Erfaring:", 10, y);
    cvData.experience.forEach((exp, i) => {
      doc.text(`- ${exp.title} at ${exp.company}`, 10, y + (i + 1) * 10);
    });

    y += cvData.experience.length * 10 + 10;
    doc.text("Utdanning:", 10, y);
    cvData.education.forEach((edu, i) => {
      doc.text(`- ${edu.institution} (${edu.degree})`, 10, y + (i + 1) * 10);
    });

  } else if (template === "modern") {
    // Moderne mal med bakgrunn
    doc.setFillColor(240, 240, 240);  // Lysegrå bakgrunn
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F");

    doc.setFontSize(18);
    doc.text("Curriculum Vitae", 10, 10);

    // Personlig informasjon
    doc.setFontSize(14);
    doc.text(`Navn: ${cvData.personalInfo.name}`, 10, 30);
    doc.text(`Adresse: ${cvData.personalInfo.address}`, 10, 40);
    doc.text(`Telefon: ${cvData.personalInfo.phone}`, 10, 50);
    doc.text(`E-post: ${cvData.personalInfo.email}`, 10, 60);

    // Ferdigheter
    doc.setFontSize(12);
    doc.text("Ferdigheter:", 10, 70);
    cvData.skills.forEach((skill, i) => {
      doc.text(`- ${skill}`, 10, 80 + i * 10);
    });

    let y = 90 + cvData.skills.length * 10;
    doc.text("Erfaring:", 10, y);
    cvData.experience.forEach((exp, i) => {
      doc.text(`- ${exp.title} at ${exp.company}`, 10, y + (i + 1) * 10);
    });

    y += cvData.experience.length * 10 + 10;
    doc.text("Utdanning:", 10, y);
    cvData.education.forEach((edu, i) => {
      doc.text(`- ${edu.institution} (${edu.degree})`, 10, y + (i + 1) * 10);
    });
  }

  doc.save("cv.pdf");
};

export default createPDFWithTemplate;
