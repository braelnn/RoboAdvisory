export const downloadReport = () => {
    const reports = JSON.stringify(localStorage.getItem('reports') || []);
    const blob = new Blob([reports], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'investment_reports.json';
    link.click();
};
