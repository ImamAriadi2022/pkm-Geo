import React, { useEffect } from "react";

const AnalyzeReport = ({ report, onAnalysisResult }) => {
  // Simulasi AI: Hasil kategori berdasarkan panjang deskripsi
  const getCategory = (description) => {
    if (description.length > 100) return "High Risk";
    if (description.length > 50) return "Medium Risk";
    return "Low Risk";
  };

  useEffect(() => {
    const result = getCategory(report.description);
    onAnalysisResult(result);
  }, [report.description, onAnalysisResult]);

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