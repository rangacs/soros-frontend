const collections = {
    categories: [
        {
            name: 'Employee',
            fields: [
                {
                    name: 'Employee Number'
                },
                {
                    name: 'Employee Name'
                },
                {
                    name: 'joindate'
                },
                { name: 'dob' },
                { name: 'Birthday' },
                { name: 'status' },
                { name: 'Employee Reference Number' },
                {
                    name: 'sex'
                },
                {
                    name: 'confirmdate'
                },
                {
                    name: 'First Hire Date'
                },
                {
                    name: 'Residential Status'
                },
                {
                    name: 'Background Check Status'
                },
                {
                    name: 'Background Verification Completed On'
                },
                {
                    name: 'Agency Name'
                },
                {
                    name: 'Background Check Remarks'
                },
                {
                    name: 'Emergency Contact Name'
                },
                {
                    name: 'Emergency Contact Number'
                },
                {
                    name: 'Nick Name'
                },
                {
                    name: 'Extension Number'
                },
                {
                    name: 'First Name'
                },
                {
                    name: 'Middle Name'
                },
                {
                    name: 'Last Name'
                },
                {
                    name: 'fathername'
                },
                {
                    name: 'spousename'
                },
                {
                    name: 'Is Physical Challanged'
                },
                {
                    name: 'Is International Employee'
                },
                {
                    name: 'Employees Initials'
                },
                {
                    name: 'title'
                },
                {
                    name: 'Mobile Number'
                },
                {
                    name: 'leftorg'
                },
                {
                    name: 'email'
                },
                {
                    name: 'Personal Email address'
                },
                {
                    name: 'panno'
                },
                {
                    name: 'leavingdate'
                },
                {
                    name: 'reportingmanager'
                },
                {
                    name: 'maritalstatus'
                },
                {
                    name: 'Marriage Date'
                },
                {
                    name: 'nationality'
                },
                {
                    name: 'religion'
                },
                {
                    name: 'bloodgroup'
                },
                {
                    name: 'Is Director'
                },
                {
                    name: 'ipaddress'
                },
                {
                    name: 'Login User Name'
                },
                {
                    name: 'Probation Period'
                },
                {
                    name: 'Notice Period'
                },
                {
                    name: 'retirementdate'
                },
                {
                    name: 'Do not process payroll'
                },
                {
                    name: 'Remarks'
                },
                {
                    name: 'Aadhaar Card  Enrolment No'
                },
                {
                    name: 'Name As Per Aadhaar'
                },
                {
                    name: 'Aadhaar Card Number'
                },
                {
                    name: 'Driving Licence'
                },
                {
                    name: 'Voter ID'
                },
                {
                    name: 'Alternate Employee Number'
                },
                {
                    name: 'Is employee covered under LWF?'
                },
                {
                    name: 'Country Of Origin'
                },
                {
                    name: 'Disable portal access'
                }
            ]
        },
        {
            name: 'Employee Resignation',
            fields: [
                { name: 'Employee Number' },
                { name: 'Leaving Date' },
                { name: 'Resignation Submission Date' },
                { name: 'Date Of Releiving' },
                { name: 'Reason For Leaving' },
                { name: 'Has Left The Organization?' },
                { name: 'Is Deceased?' },
                { name: 'Date Of Death' },
                { name: 'isfittoberehired' },
                { name: 'employeefeedback' },
                { name: 'finalsettlementdate' },
                { name: 'exitintviewcondon' },
                { name: 'remarks' },
                { name: 'noduecertificateisuued' },
                { name: 'isnoticerequired' },
                { name: 'isnoticeserved' },
                { name: 'noticeperiod' },
                { name: 'pfleavingreason' },
                { name: 'Separation Mode' },
                { name: 'Retirement Date' },
                { name: 'Exclude from final settlement' }
            ]
        },
        {
            name: 'LOP Reversal Importer',
            fields: [{ name: 'Employee Number' }, { name: 'LOP Payroll' }, { name: 'LOP Days' }, { name: 'Remarks' }]
        },
        { name: 'Employee LOP', fields: [{ name: 'Employee Number' }, { name: 'LOP Days' }, { name: 'Remarks' }] },
        {
            name: 'Employee Category',
            fields: [
                { name: 'Employee Number' },
                { name: 'Effective From' },
                { name: 'Reason' },
                { name: 'Designation' },
                { name: 'Department' },
                { name: 'Division' },
                { name: 'CostCenter' },
                { name: 'Company' },
                { name: 'Grade' },
                { name: 'Shift' },
                { name: 'Branch' }
            ]
        },
        {
            name: 'Employee Bank Details',
            fields: [
                { name: 'Employee Number' },
                { name: 'Bank Account Number' },
                { name: 'IFSC Code' },
                { name: 'Bank Account Type' },
                { name: 'Bank Name' },
                { name: 'Bank Branch' },
                { name: 'Salary Payment Mode' },
                { name: 'DD Payable At ' },
                { name: 'Name As Per Bank' },
                { name: 'IBAN' }
            ]
        },
        {
            name: 'Employee Loan Details',
            fields: [
                { name: 'Employee Number' },
                { name: 'Loan Component' },
                { name: 'Loan Period (In Months)' },
                { name: 'Loan Amount' },
                { name: 'Rate Of Interest' },
                { name: 'Start Date' },
                { name: 'Loan Type' },
                { name: 'Perquisite Rate' },
                { name: 'Demand Promissory Note' },
                { name: 'Remarks' }
            ]
        },
        {
            name: 'Add Employee Importer',
            fields: [
                { name: 'Employee Number' },
                { name: 'Name' },
                { name: 'Joining Date' },
                { name: 'Date Of Birth' },
                { name: 'Birthday' },
                { name: 'Employee Status' },
                { name: 'Employee Reference Number' },
                { name: 'Gender' },
                { name: 'confirmdate' },
                { name: 'Nick Name' },
                { name: 'Extension Number' },
                { name: 'First Name' },
                { name: 'Middle Name' },
                { name: 'Last Name' },
                { name: 'Email Address' },
                { name: 'Personal Email Address' },
                { name: 'PAN Number' },
                { name: 'Marital Status' },
                { name: 'Marriage Date' },
                { name: 'Blood Group' },
                { name: 'Managers Employee No' },
                { name: 'Fathers Name' },
                { name: 'spousename' },
                { name: 'ipaddress' },
                { name: 'Login User Name' },
                { name: 'Probation Period' },
                { name: 'Notice Period' },
                { name: 'Is Physical Challanged' },
                { name: 'Is International Employee' },
                { name: 'Background Check Status' },
                { name: 'Background Verification Completed On' },
                { name: 'Agency Name' },
                { name: 'Background Check Remarks' },
                { name: 'Emergency Contact Name' },
                { name: 'Emergency Contact Number' },
                { name: 'Bank Account Number' },
                { name: 'IFSC Code' },
                { name: 'Bank Account Type' },
                { name: 'Bank Name' },
                { name: 'Bank Branch' },
                { name: 'Salary Payment Mode' },
                { name: 'DD Payable At ' },
                { name: 'Name As Per Bank Records' },
                { name: 'IBAN' },
                { name: 'Is employee eligible for PF?' },
                { name: 'PF Number' },
                { name: 'PF Scheme' },
                { name: 'PF Joining Date' },
                { name: 'Is employee eligible for excess EPF contribution?' },
                { name: 'Is employee eligible for excess EPS contribution?' },
                { name: 'Is existing member of PF?' },
                { name: 'Is employee eligible for ESI?' },
                { name: 'ESI Number' },
                { name: 'Is employee covered under LWF?' },
                { name: 'Aadhaar Card Enrolment No' },
                { name: 'Name (As on Aadhaar Card)' },
                { name: 'Aadhaar Card Number' },
                { name: 'Universal Account Number' },
                { name: 'Mobile Number' },
                { name: 'Country Of Origin' },
                { name: 'Designation' },
                { name: 'Department' },
                { name: 'Division' },
                { name: 'CostCenter' },
                { name: 'Company' },
                { name: 'Grade' },
                { name: 'Shift' },
                { name: 'Branch' },
                { name: 'Certification' },
                { name: 'Batch' },
                { name: 'Location' },
                { name: 'Employee Number Series' }
            ]
        }
    ]
};

export default collections;
