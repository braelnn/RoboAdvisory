import React from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { FaFilePdf, FaCalendarAlt, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';

const ReportCard = ({ report }) => {
    if (!report) {
        return <p>Loading report...</p>;
    }

    // Extract risk level from the summary using regex
    const riskMatch = report.summary.match(/risk levelof (\w+)/i);
    const extractedRiskLevel = riskMatch ? riskMatch[1].toUpperCase() : "NOT SPECIFIED";

    const generatePDF = async () => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 500]);

        const { title, summary, date, value } = report;

        // Handle missing values safely
        const formattedTitle = title || "Untitled Report";
        const formattedDate = date || "N/A";
        const formattedValue = value ? `$${value.toLocaleString()}` : "N/A";
        const formattedSummary = summary || "No summary available.";

        // Embed standard font
        const font = await pdfDoc.embedFont('Helvetica');

        // Draw Title
        page.drawText(`Report Title: ${formattedTitle}`, {
            x: 50,
            y: 450,
            size: 20,
            color: rgb(0, 0.47, 0.71), // LinkedIn Blue
            font
        });

        // Draw Date
        page.drawText(`Date: ${formattedDate}`, {
            x: 50,
            y: 420,
            size: 12,
            color: rgb(0, 0, 0),
            font
        });

        // Draw Portfolio Value
        page.drawText(`Portfolio Value: ${formattedValue}`, {
            x: 50,
            y: 390,
            size: 12,
            color: rgb(0, 0, 0),
            font
        });

        // Draw Extracted Risk Level
        page.drawText(`Risk Level: ${extractedRiskLevel}`, {
            x: 50,
            y: 360,
            size: 12,
            color: rgb(0.8, 0, 0), // Red for risk
            font
        });

        // Draw Summary Label
        page.drawText(`Summary:`, {
            x: 50,
            y: 330,
            size: 14,
            color: rgb(0, 0, 0),
            font
        });

        // Draw Summary Content
        page.drawText(formattedSummary, {
            x: 50,
            y: 310,
            size: 12,
            color: rgb(0, 0, 0),
            maxWidth: 500,
            font
        });

        // Save and Open the PDF
        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url);
    };

    return (
        <div className="report-card">
            <h3 className="report-title"><FaFilePdf /> {report.title || "Untitled Report"}</h3>
            <p className="report-date"><FaCalendarAlt /> {report.date || "N/A"}</p>
            <p className="report-value"><FaChartLine /> Value: {report.value ? `$${report.value.toLocaleString()}` : "N/A"}</p>
            <p className="report-risk"><FaExclamationTriangle /> Risk Level: {extractedRiskLevel}</p>
            <p className="report-summary">{report.summary || "No summary available."}</p>
            <button className="view-btn" onClick={generatePDF}><FaFilePdf /> View Report</button>
        </div>
    );
};

export default ReportCard;
