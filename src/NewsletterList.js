import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "./NewsletterList.css";

const NewsletterList = ({ selectedYear, onMonthSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  // ✅ UPDATED DATA (based on your folders)
  const newsletters = {
    "2023": [
      "february.pdf",
      "march.pdf",
      "april.pdf",
      "may.pdf",
      "june.pdf",
      "july.pdf",
      "august.pdf",
      "september.pdf",
      "october.pdf",
      "november.pdf",
      "december.pdf"
    ],

    "2024": [
      "january.pdf",
      "february.pdf",
      "march.pdf",
      "april.pdf",
      "may.pdf",
      "june.pdf",
      "july.pdf",
      "august.pdf",
      "september.pdf",
      "october.pdf",
      "november.pdf"
    ],

    "2025": [
      "january.pdf",
      "february.pdf",
      "march.pdf",
      "april.pdf",
      "may.pdf",
      "june.pdf",
      "july.pdf",
      "august.pdf",
      "september.pdf",
      "october.pdf",
      "november.pdf",
      "december.pdf"
    ],

    "2026": [
      "january.pdf"
    ]
  };

  const defaultLayout = defaultLayoutPlugin();
  const currentNewsletters = newsletters[selectedYear] || [];

  const handleFileSelection = (file) => {
    setSelectedFile(
      `${process.env.PUBLIC_URL}/newsletters/${selectedYear}/${file}`
    );
    setSelectedMonth(file);

    if (onMonthSelect) {
      onMonthSelect();
    }
  };

  useEffect(() => {
    setSelectedMonth(null);
    setSelectedFile(null);
  }, [selectedYear]);

  const renderRow = (files) => {
    return files.map((file, index) => (
      <li key={index} className="newsletter-item">
        <span
          className={`newsletter-button ${
            selectedMonth === file ? "selected" : ""
          }`}
          onClick={() => handleFileSelection(file)}
        >
          {file.replace(".pdf", "").slice(0, 3).toUpperCase()}
        </span>
      </li>
    ));
  };

  return (
    <div className="newsletter-container">
      <div className="newsletter-row">
        <ul className="newsletter-list">{renderRow(currentNewsletters)}</ul>
      </div>

      {selectedFile && (
        <div className="pdf-viewer-container">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <div className="pdf-viewer">
              <Viewer fileUrl={selectedFile} plugins={[defaultLayout]} />
            </div>
          </Worker>
        </div>
      )}
    </div>
  );
};

export default NewsletterList;