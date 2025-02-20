import React, { useState, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import ReportCard from './ReportCard';
import ChartDisplay from './ChartDisplay';
import { fetchReportsByPortfolio, createReportForPortfolio } from '../utilis/fetchReports';
import { downloadReport } from '../utilis/downloadReport';
import moment from 'moment-timezone'; // Import moment-timezone
 

const Reports = ({ selectedPortfolio }) => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        if (selectedPortfolio) {
            fetchReportsByPortfolio(selectedPortfolio._id).then(data => setReports(data));
        }
    }, [selectedPortfolio]);

    const handleNewReport = async () => {
        if (!selectedPortfolio) {
            alert("Please select a portfolio first!");
            return;
        }
    
        const newReport = {
            title: `Performance Report - ${selectedPortfolio.name}`,
            summary: `A detailed analysis of ${selectedPortfolio.name.toUpperCase()}, 
                      valued at $${selectedPortfolio.amount.toLocaleString()}. 
                      The portfolio has a risk levelof ${selectedPortfolio.riskLevel.toUpperCase()}, 
                      with the following Asset Allocation: ${JSON.stringify(selectedPortfolio.allocations).toUpperCase()}.`,
            value: selectedPortfolio.amount, // ✅ Uses actual portfolio amount
            date: moment().tz('Africa/Nairobi').format() // ✅ Ensures EAT timezone
        };
    
        console.log(`📢 Generating report for: ${selectedPortfolio.name}`, newReport); // ✅ Debugging
    
        const createdReport = await createReportForPortfolio(selectedPortfolio._id, newReport);
        
        if (createdReport) {
            console.log(`✅ New Report Added:`, createdReport); // ✅ Debugging
            setReports(prevReports => [...prevReports, createdReport]);  // ✅ Updates UI
        } else {
            alert("❌ Report generation failed! Check console logs.");
        }
    };

    return (
        <div className="reports-section">
            <h2>📈 Investment Reports for {selectedPortfolio?.name || "Portfolio"}</h2>
            <div className="report-actions">
                <button className="download-btn" onClick={downloadReport}>
                    <FaDownload size={20} /> Download Reports
                </button>
                <button className="add-report-btn" onClick={handleNewReport}>
                    ➕ Generate Report
                </button>
            </div>
            <ChartDisplay data={reports} />
            <div className="report-list">
                {reports.length > 0 ? (
                    reports.map(report => (
                        <ReportCard key={report._id} report={{ ...report, date: moment(report.date).tz('Africa/Nairobi').format('YYYY-MM-DD HH:mm:ss') }} />
                    ))
                ) : (
                    <p>No reports available. Generate one!</p>
                )}
            </div>
        </div>
    );
};

export default Reports;
