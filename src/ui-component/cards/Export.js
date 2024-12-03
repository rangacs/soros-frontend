import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import analysisService from '_services/analysis.services';

export default function ({ startTime, endTime, intervalHour, page, rowsPerPage }) {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (startTime, endTime, intervalHour, page, rowsPerPage) => {
        analysisService
            .hourlyAverage(startTime, endTime, intervalHour, page, rowsPerPage)
            .then((results) => {
                console.log(results);
                // alert(JSON.stringify(results));
                const { data } = results;
                const ws = XLSX.utils.json_to_sheet(data);
                const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
                const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                const edata = new Blob([excelBuffer], { type: fileType });
                FileSaver.saveAs(edata, `Analysis${fileExtension}`);
            })
            .catch((err) => {
                // toast.error('Error in loading average page ');
            });
    };

    // eslint-disable-next-line react/button-has-type
    return <button onClick={(e) => exportToCSV(startTime, endTime, intervalHour, page, rowsPerPage)}>Export</button>;
}
