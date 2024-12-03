import React from 'react';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import analysisService from '_services/analysis.services';

import { tagQueuedServices } from '_services';

export default function ({ tagID, page, rowsPerPage, interval }) {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (tagID, page, rowsPerPage, interval) => {
        tagQueuedServices
            .getData(tagID, page, 5000, interval)
            .then(async (results) => {
                const { data } = results;
                console.log(data);
                const ws = XLSX.utils.json_to_sheet(data?.data);
                const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
                const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
                const edata = new Blob([excelBuffer], { type: fileType });
                FileSaver.saveAs(edata, `TagData${fileExtension}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // eslint-disable-next-line react/button-has-type
    return <button onClick={(e) => exportToCSV(tagID, page, rowsPerPage, interval)}>Export</button>;
}
