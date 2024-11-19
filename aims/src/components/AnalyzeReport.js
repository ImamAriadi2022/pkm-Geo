import React from "react";

const AnalyzeReport = ({ report }) => {
  // Simulasi AI: Hasil kategori berdasarkan panjang deskripsi
  const getCategory = (description) => {
    if (description.length > 100) return "High Risk";
    if (description.length > 50) return "Medium Risk";
    return "Low Risk";
  };

  return (
    <div>
      <h5>Report Analysis</h5>
      <p>
        <strong>Description:</strong> {report.description}
      </p>
      <p>
        <strong>Category:</strong> {getCategory(report.description)}
      </p>
    </div>
  );
};

export default AnalyzeReport;
