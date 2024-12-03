import Designation from '../LookUpData/Designation';
import Banks from '../LookUpData/Banks';
import State from '../LookUpData/State';
import States from '../LookUpData/States';
import Department from '../LookUpData/Department';
import NomineeState from '../LookUpData/NomineeState';
import NomineeDistrict from '../LookUpData/NomineeDistrict';
import TransferredToState from '../LookUpData/TransferredToState';
import TransferredFromState from '../LookUpData/TransferredFromState';
import NewLocation from '../LookUpData/NewLocation';
import TypeOfAllowance from '../LookUpData/TypeOfAllowance';

export const employee = {
    'Personal Information': {
        predefinedFields: [
            {
                name: 'PAN Number',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: 10,
                    maxLength: 10
                }
            },
            {
                name: 'Employee Number',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Employee Name',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },

            {
                name: "Father's Name",
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Aadhaar Number',
                dataType: 'number',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: 12,
                    maxLength: 12
                }
            },
            // {
            //     name: 'Bank Name',
            //     dataType: 'autocomplete',
            //     mandatory: false,
            //     enum: Banks,
            //     defaultValue: null
            // },
            // {
            //     name: 'Bank IFSC',
            //     dataType: 'string',
            //     mandatory: true,
            //     defaultValue: '',
            //     validation: {
            //         minLength: null,
            //         maxLength: null
            //     }
            // },
            // {
            //     name: 'Bank Account Number',
            //     dataType: 'string',
            //     mandatory: true,
            //     defaultValue: null,
            //     validation: {
            //         minLength: 9,
            //         maxLength: 18
            //     }
            // },
            {
                name: 'ESI Number',
                dataType: 'number',
                mandatory: false,
                defaultValue: 21001234560000001,
                validation: {
                    minLength: 17,
                    maxLength: 17
                }
            },
            {
                name: 'PF UAN Number',
                dataType: 'number',
                mandatory: true,
                defaultValue: null,
                validation: {
                    minLength: 12,
                    maxLength: 12
                }
            },
            {
                name: 'Gender',
                dataType: 'dropdown',
                mandatory: false,
                enum: ['Male', 'Female', 'Others'],
                defaultValue: 'Male'
            },
            {
                name: 'Date of Birth',
                dataType: 'date',
                mandatory: false,
                defaultValue: '',
                validation: {
                    pastDateNotAllowed: false,
                    futureDateNotAllowed: false
                }
            },
            {
                name: 'Email ID',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Locality and City',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Address - Permanent/Current',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Company',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },

            {
                name: 'Remarks',
                dataType: 'number',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
            // {
            //     name: 'State',
            //     dataType: 'autocomplete',
            //     mandatory: false,
            //     enum: States,
            //     defaultValue: null
            // },
            // {
            //     name: 'District',
            //     dataType: 'autocomplete',
            //     mandatory: false,
            //     enum: [],
            //     defaultValue: null
            // }

            // {
            //     name: 'Location',
            //     dataType: 'dropdown',
            //     mandatory: false,
            //     enum: ['Location1', 'Location2'],
            //     defaultValue: null
            // }
        ],
        additionalFields: []
    },
    Company: {
        predefinedFields: [
            {
                name: 'Date of Joining',
                dataType: 'date',
                mandatory: false,
                defaultValue: new Date('2020-12-31').toISOString().substring(0, 10),
                validation: {
                    pastDateNotAllowed: false,
                    futureDateNotAllowed: false
                }
            },
            {
                name: 'Designation',
                dataType: 'autocomplete',
                mandatory: false,
                enum: Designation,
                defaultValue: null
            },
            {
                name: 'Cost Center',
                dataType: 'dropdown',
                mandatory: false,
                enum: ['Cost1', 'Cost2'],
                defaultValue: null
            },
            {
                name: 'Department',
                dataType: 'autocomplete',
                mandatory: false,
                enum: Department,
                defaultValue: null
            },
            {
                name: 'Function',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Grade',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
        ],
        additionalFields: []
    },
    Gross: {
        predefinedFields: [
            {
                name: 'Basic (Th)',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'FDA (Th)',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'HRA (Th)',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'CEA (Th)',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Stipend (Th)',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'VDA (Th)',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Conveyance (Th)',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Shift Allowance (Th)',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Attendance Bonus (Th)',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Plating Allowance (Th)',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Plant Maintainance (Th)',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Skill Allowance (Th)',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Special Allowance (Th)',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Total Earning (Th)',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
        ],
        additionalFields: []
    },
    'Bank Details': {
        predefinedFields: [
            // {
            //     name: 'Employee Number',
            //     dataType: 'string',
            //     mandatory: true,
            //     defaultValue: '',
            //     validation: {
            //         minLength: null,
            //         maxLength: null
            //     }
            // },
            // {
            //     name: 'Employee Name',
            //     dataType: 'string',
            //     mandatory: true,
            //     defaultValue: '',
            //     validation: {
            //         minLength: null,
            //         maxLength: null
            //     }
            // },
            {
                name: 'Bank Name',
                dataType: 'autocomplete',
                mandatory: false,
                enum: Banks,
                defaultValue: null
            },
            // {
            //     name: 'Bank Name',
            //     dataType: 'string',
            //     mandatory: false,
            //     defaultValue: '',
            //     validation: {
            //         minLength: null,
            //         maxLength: null
            //     }
            // },
            {
                name: 'Bank Account Number',
                dataType: 'number',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Bank IFSC',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
        ],
        additionalFields: []
    },
    Statutory: {
        predefinedFields: [
            {
                name: 'Employer PF',
                dataType: 'string',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Employer ESI',
                dataType: 'string',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Super Annuation',
                dataType: 'string',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
        ],
        additionalFields: []
    },
    fbp: {
        predefinedFields: [
            {
                name: 'Telephone',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: 1,
                    maxLength: 10
                }
            },
            {
                name: 'LTA',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Attire Allowance',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Fuel & Car Maintainence',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
            // {
            //     name: 'Month',
            //     dataType: 'dropdown',
            //     mandatory: false,
            //     defaultValue: '',
            //     enum: [
            //         'January',
            //         'Febuary',
            //         'March',
            //         'April',
            //         'May',
            //         'June',
            //         'July',
            //         'August',
            //         'September',
            //         'Octuber',
            //         'November',
            //         'December'
            //     ]
            // },
            // {
            //     name: 'Total',
            //     dataType: 'number',
            //     mandatory: false,
            //     defaultValue: 0.0,
            //     validation: {
            //         minLength: null,
            //         maxLength: null
            //     }
            // },
            // {
            //     name: 'State',
            //     dataType: 'autocomplete',
            //     mandatory: false,
            //     enum: States,
            //     defaultValue: null
            // },
            // {
            //     name: 'Payment Date',
            //     dataType: 'date',
            //     mandatory: false,
            //     defaultValue: '',
            //     validation: {
            //         minLength: null,
            //         maxLength: null
            //     }
            // },
            // {
            //     name: 'CTD Referrence No',
            //     dataType: 'number',
            //     mandatory: false,
            //     defaultValue: null,
            //     validation: {
            //         minLength: null,
            //         maxLength: null
            //     }
            // },
            // {
            //     name: 'KhajaneII number',
            //     dataType: 'number',
            //     mandatory: false,
            //     defaultValue: null,
            //     validation: {
            //         minLength: null,
            //         maxLength: null
            //     }
            // },
            // {
            //     name: 'Mobile number',
            //     dataType: 'number',
            //     mandatory: false,
            //     defaultValue: null,

            //     validation: {
            //         minLength: 10,
            //         maxLength: 10
            //     }
            // },
            // {
            //     name: 'Amount Recived On',
            //     dataType: 'date',
            //     mandatory: false,
            //     defaultValue: '',
            //     validation: {
            //         minLength: null,
            //         maxLength: null
            //     }
            // },
            // {
            //     name: 'Payment Reference',
            //     dataType: 'string',
            //     mandatory: false,
            //     defaultValue: '',
            //     validation: {
            //         minLength: null,
            //         maxLength: null
            //     }
            // },
            // {
            //     name: 'Acknowledgement',
            //     dataType: 'string',
            //     mandatory: false,
            //     defaultValue: '',
            //     validation: {
            //         minLength: null,
            //         maxLength: null
            //     }
            // },
            // {
            //     name: 'GRRN No',
            //     dataType: 'number',
            //     mandatory: false,
            //     defaultValue: null,
            //     validation: {
            //         minLength: null,
            //         maxLength: null
            //     }
            // }
        ],
        additionalFields: []
    },
    Dispensary: {
        predefinedFields: [
            {
                name: 'Dispencery/imp/meud',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Dispencery/imp State',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Dispencery/imp Dist',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Dispensary near hospital',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Dispencery/imp family members',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Dispencery/imp family members state',
                dataType: 'autocomplete',
                mandatory: false,
                enum: NomineeState,
                defaultValue: null
            },
            {
                name: 'Dispencery/imp family mem district',
                dataType: 'autocomplete',
                mandatory: false,
                enum: NomineeDistrict,
                defaultValue: null
            },
            {
                name: 'Dispencery/imp near ESI hospital',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
        ],
        additionalFields: []
    },
    Nominee: {
        predefinedFields: [
            {
                name: 'Nominee Name',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',

                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Nominee Relationship',
                dataType: 'dropdown',
                mandatory: false,
                enum: ['Father', 'Mother', 'Husband', 'Son', 'Daughter', 'Brother', 'Sister', 'Others'],
                defaultValue: null
            },
            // {
            //     name: 'Nominee Relationship',
            //     dataType: 'string',
            //     mandatory: false,
            //     defaultValue: '',

            //     validation: {
            //         minLength: null,
            //         maxLength: null
            //     }
            // },
            {
                name: 'Nominee Address',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Nominee State',
                dataType: 'autocomplete',
                mandatory: false,
                enum: NomineeState,
                defaultValue: null
            },
            {
                name: 'Nominee District',
                dataType: 'autocomplete',
                mandatory: false,
                enum: NomineeDistrict,
                defaultValue: null
            },
            {
                name: 'Nominee mobile number',
                dataType: 'number',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: 1,
                    maxLength: 10
                }
            },
            {
                name: 'Family Members Name',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Family Members DOB',
                dataType: 'date',
                mandatory: false,
                defaultValue: new Date('2000-12-31').toISOString().substring(0, 10),
                validation: {
                    pastDateNotAllowed: false,
                    futureDateNotAllowed: false
                }
            },
            {
                name: 'Family Members Relationship',
                dataType: 'dropdown',
                mandatory: false,
                enum: ['Father', 'Mother', 'Husband', 'Son', 'Daughter', 'Brother', 'Sister', 'Others'],
                defaultValue: null
            }
            // {
            //     name: 'Family Members Relationship',
            //     dataType: 'string',
            //     mandatory: false,
            //     defaultValue: '',
            //     validation: {
            //         minLength: null,
            //         maxLength: null
            //     }
            // }
        ],
        additionalFields: []
    }
    // Views: {
    //     predefinedFields: [
    //         {
    //             name: 'Active Employees',
    //             dataType: 'string',
    //             mandatory: false,
    //             defaultValue: '',
    //             validation: {
    //                 minLength: null,
    //                 maxLength: null
    //             }
    //         },
    //         {
    //             name: 'Employees Onboarded This Month',
    //             dataType: 'string',
    //             mandatory: false,
    //             defaultValue: '',
    //             validation: {
    //                 minLength: null,
    //                 maxLength: null
    //             }
    //         },
    //         {
    //             name: 'Draft Employees (Newly created)',
    //             dataType: 'string',
    //             mandatory: false,
    //             defaultValue: '',
    //             validation: {
    //                 minLength: null,
    //                 maxLength: null
    //             }
    //         },
    //         {
    //             name: 'Review Required Employees(which are rejected and and returned)',
    //             dataType: 'string',
    //             mandatory: false,
    //             defaultValue: '',
    //             validation: {
    //                 minLength: null,
    //                 maxLength: null
    //             }
    //         },
    //         {
    //             name: 'Inactive Employees',
    //             dataType: 'string',
    //             mandatory: false,
    //             defaultValue: '',
    //             validation: {
    //                 minLength: null,
    //                 maxLength: null
    //             }
    //         },
    //         {
    //             name: 'HR Approved Employees',
    //             dataType: 'string',
    //             mandatory: false,
    //             defaultValue: '',
    //             validation: {
    //                 minLength: null,
    //                 maxLength: null
    //             }
    //         },
    //         {
    //             name: 'Payroll Reviewed Employees',
    //             dataType: 'string',
    //             mandatory: false,
    //             defaultValue: '',
    //             validation: {
    //                 minLength: null,
    //                 maxLength: null
    //             }
    //         },
    //         {
    //             name: 'Payroll Approved Employees',
    //             dataType: 'string',
    //             mandatory: false,
    //             defaultValue: '',
    //             validation: {
    //                 minLength: null,
    //                 maxLength: null
    //             }
    //         },
    //         {
    //             name: 'Employees Resigned This Month',
    //             dataType: 'string',
    //             mandatory: false,
    //             defaultValue: '',
    //             validation: {
    //                 minLength: null,
    //                 maxLength: null
    //             }
    //         }
    //     ],
    //     additionalFields: []
    // }
};

export const salaryRevision = {
    general: {
        predefinedFields: [
            {
                name: 'Employee Number',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Employee Name',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Revision Effective Date',
                dataType: 'date',
                mandatory: false,
                defaultValue: '',
                validation: {
                    pastDateNotAllowed: true,
                    futureDateNotAllowed: false
                }
            },
            {
                name: 'States',
                dataType: 'autocomplete',
                mandatory: false,
                enum: States,
                defaultValue: null
            },
            {
                name: 'Districts',
                dataType: 'autocomplete',
                mandatory: false,
                enum: [],
                defaultValue: null
            },
            {
                name: 'Department',
                dataType: 'autocomplete',
                mandatory: false,
                enum: Department,
                defaultValue: null
            },
            {
                name: 'Designation',
                dataType: 'dropdown',
                mandatory: false,
                enum: ['Designation1', 'Designation2'],
                defaultValue: null
            },
            {
                name: 'Cost Center',
                dataType: 'dropdown',
                mandatory: false,
                enum: ['Cost1', 'Cost2'],
                defaultValue: null
            },
            {
                name: 'Function',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Grade',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Remarks',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
        ],
        additionalFields: []
    },
    gross: {
        predefinedFields: [
            {
                name: 'Basic',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Special Allowance',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Stipend',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Shift Allowance',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'FDA',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Attendance Bonus',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'VDA',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Plating Allowance',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'HRA',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Plant Maintainance',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Conveyance',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Skill Allowance',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'CEA',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Total Earning',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
        ],
        additionalFields: []
    },
    statutory: {
        predefinedFields: [
            {
                name: 'Employer PF',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Employer ESI',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Super Annuation',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
        ],
        additionalFields: []
    },
    fbp: {
        predefinedFields: [
            {
                name: 'Telephone',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'LTA',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Attire Allowance',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Fuel & Car Maintainance',
                dataType: 'number',
                mandatory: false,
                defaultValue: 0.0,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
        ],
        additionalFields: []
    }
};

export const oneTimePayment = {
    general: {
        predefinedFields: [
            {
                name: 'Employee Number',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Employee Name',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },

            {
                name: 'Type of Allowance',
                dataType: 'autocomplete',
                mandatory: false,
                enum: TypeOfAllowance,
                defaultValue: null
            },
            {
                name: 'Any Other type of One Time Allowance',
                dataType: 'autocomplete',
                mandatory: false,
                enum: [
                    'Award',
                    'Leave Travel Allowance',
                    'Entertainment Allowance',
                    'Uniform Allowance',
                    'Project Allowance',
                    'Tiffin/Meals Allowance',
                    'Servant Allowance',
                    'Outstation Allowance',
                    'Hostel Allowance',
                    "Children's Education Allowance",
                    'Transport Allowance',
                    'Academic/Research Allowance'
                ],
                defaultValue: null
            },
            {
                name: 'Amount',
                dataType: 'number',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'OverTime Hours',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'SAB Amount',
                dataType: 'number',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Category',
                dataType: 'dropdown',
                mandatory: false,
                enum: ['JTE', 'ATE'],
                defaultValue: null
            },
            {
                name: 'Recall Hours',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Night Shift Days',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Remarks',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
        ],
        additionalFields: []
    }
};
export const employeeResignation = {
    general: {
        predefinedFields: [
            {
                name: 'Employee Number',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Employee Name',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },

            {
                name: 'Date of Joining',
                dataType: 'date',
                mandatory: false,
                defaultValue: '',
                validation: {
                    pastDateNotAllowed: false,
                    futureDateNotAllowed: false
                }
            },
            {
                name: 'Date of Resignation',
                dataType: 'date',
                mandatory: false,
                defaultValue: '',
                validation: {
                    pastDateNotAllowed: false,
                    futureDateNotAllowed: false
                }
            },
            {
                name: 'Date of Leaving',
                dataType: 'date',
                mandatory: false,
                defaultValue: '',
                validation: {
                    pastDateNotAllowed: false,
                    futureDateNotAllowed: false
                }
            },
            {
                name: 'Reason for Leaving',
                dataType: 'dropdown',
                mandatory: false,
                enum: ['Resigned', 'Retired', 'Transferred', 'Sick', 'Expired', 'Terminated', 'Other'],
                defaultValue: null
            },
            {
                name: 'No of days to be paid',
                dataType: 'number',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Leave Encash Days',
                dataType: 'number',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Notice Period Payment',
                dataType: 'number',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'NSA Days',
                dataType: 'number',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'SAB',
                dataType: 'number',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Overtime Hrs (Incentive)',
                dataType: 'number',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'One time (if any)',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Notice Period Recovery Days',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Canteen Deduction',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Other Deductions',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Remarks',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Investments (amount)',
                dataType: 'number',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Investment Type (Eg., Rent, LIC, ELSS Etc.,)',
                dataType: 'dropdown',
                mandatory: false,
                enum: ['Rent', 'LIC', 'ELSS'],
                defaultValue: null
            }
        ],
        additionalFields: []
    }
};
export const interStateTransfer = {
    general: {
        predefinedFields: [
            {
                name: 'Employee Number',
                dataType: 'string',
                mandatory: true,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Employee Name',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },

            {
                name: 'Date of Joining',
                dataType: 'date',
                mandatory: false,
                defaultValue: '',
                validation: {
                    pastDateNotAllowed: false,
                    futureDateNotAllowed: false
                }
            },
            {
                name: 'Transfer Date',
                dataType: 'date',
                mandatory: false,
                defaultValue: new Date().toISOString().substring(0, 10),
                validation: {
                    pastDateNotAllowed: false,
                    futureDateNotAllowed: false
                }
            },
            {
                name: 'Transferred from State',
                dataType: 'autocomplete',
                mandatory: false,
                enum: TransferredFromState,
                defaultValue: null
            },
            {
                name: 'Transferred to State',
                dataType: 'autocomplete',
                mandatory: false,
                enum: TransferredToState,
                defaultValue: null
            },
            {
                name: 'New Location',
                dataType: 'autocomplete',
                mandatory: false,
                enum: NewLocation,
                defaultValue: null
            },
            {
                name: 'Remarks',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',

                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
        ],
        additionalFields: []
    }
};

// export const bankAccountChanges = {
//     general: {
//         predefinedFields: [
//             {
//                 name: 'Employee Number',
//                 dataType: 'string',
//                 mandatory: true,
//                 defaultValue: '',
//                 validation: {
//                     minLength: null,
//                     maxLength: null
//                 }
//             },
//             {
//                 name: 'Employee Name',
//                 dataType: 'string',
//                 mandatory: true,
//                 defaultValue: '',
//                 validation: {
//                     minLength: null,
//                     maxLength: null
//                 }
//             },

//             {
//                 name: 'Bank Name',
//                 dataType: 'string',
//                 mandatory: false,
//                 defaultValue: '',
//                 validation: {
//                     minLength: null,
//                     maxLength: null
//                 }
//             },
//             {
//                 name: 'Bank Account Number',
//                 dataType: 'number',
//                 mandatory: false,
//                 defaultValue: null,
//                 validation: {
//                     minLength: null,
//                     maxLength: null
//                 }
//             },
//             {
//                 name: 'Bank IFSC',
//                 dataType: 'string',
//                 mandatory: false,
//                 defaultValue: '',
//                 validation: {
//                     minLength: null,
//                     maxLength: null
//                 }
//             }
//         ],
//         additionalFields: []
//     }
// };

export const employeeLoanDetail = {
    general: {
        predefinedFields: [
            {
                name: 'Employee Number',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Employee Name',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },

            {
                name: 'Loan Type',
                dataType: 'dropdown',
                mandatory: false,
                enum: ['Flat Interest', 'Flat Interest EMI', 'Reducing Interest', 'Reducing Interest EMI', 'Reducing Interest 365'],
                defaultValue: 'Flat Interest'
            },
            {
                name: 'Amount Sanctioned',
                dataType: 'number',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'No of Months',
                dataType: 'number',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Monthly EMI',
                dataType: 'number',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Rate of Interest',
                dataType: 'number',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Perquisite Rate',
                dataType: 'number',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Loan Start Date',
                dataType: 'date',
                mandatory: false,
                defaultValue: '',
                validation: {
                    pastDateNotAllowed: false,
                    futureDateNotAllowed: false
                }
            },
            {
                name: 'Remarks',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
        ],
        additionalFields: []
    }
};

export const loanRepaymentOutside = {
    general: {
        predefinedFields: [
            {
                name: 'Employee Number',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Employee Name',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },

            {
                name: 'Loan Type',
                dataType: 'dropdown',
                mandatory: false,
                enum: ['Flat Interest', 'Flat Interest EMI', 'Reducing Interest', 'Reducing Interest EMI', 'Reducing Interest 365'],
                defaultValue: null
            },
            {
                name: 'Closure Amount',
                dataType: 'number',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Remarks',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
        ],
        additionalFields: []
    }
};

export const lopReversal = {
    general: {
        predefinedFields: [
            {
                name: 'Employee Number',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Employee Name',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },

            {
                name: 'LOP Reversal Days',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Reversal Month',
                dataType: 'autocomplete',
                mandatory: false,
                enum: [
                    'January',
                    'Febuary',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'Octuber',
                    'November',
                    'December'
                ],
                defaultValue: null
            },
            {
                name: 'Remarks',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
        ],
        additionalFields: []
    }
};
export const lopDays = {
    general: {
        predefinedFields: [
            {
                name: 'Employee Number',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Employee Name',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },

            {
                name: 'LOP Days',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'LOP Month',
                dataType: 'autocomplete',
                mandatory: false,
                enum: [
                    'January',
                    'Febuary',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'Octuber',
                    'November',
                    'December'
                ],
                // eslint-disable-next-line
                get defaultValue() {
                    const currentMonth = new Date(Date.now()).getMonth();
                    if (currentMonth === 0) {
                        return this.enum[11];
                    }
                    return this.enum[currentMonth - 1];
                }
            },
            {
                name: 'Remarks',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
        ],
        additionalFields: []
    }
};

export const oneTimeDeduction = {
    general: {
        predefinedFields: [
            {
                name: 'Employee Number',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Employee Name',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },

            {
                name: 'Type of Deduction',
                dataType: 'dropdown',
                mandatory: false,
                enum: ['Medical Insurance Deduction', 'One time Salary Advance', 'Canteen Deductions', 'Any other Deductions'],
                defaultValue: null
            },
            {
                name: 'Any other type of Deduction',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Mention Start/Stop',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Amount',
                dataType: 'number',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'LoanType',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Closure Amount',
                dataType: 'number',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Remarks',
                dataType: 'string',
                mandatory: false,
                defaultValue: null,
                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
        ],
        additionalFields: []
    }
};

export const transitionChanges = {
    general: {
        predefinedFields: [
            {
                name: 'Employee Number',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Employee Name',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },

            {
                name: 'Effective Date',
                dataType: 'date',
                mandatory: false,
                defaultValue: '',
                validation: {
                    pastDateNotAllowed: false,
                    futureDateNotAllowed: true
                }
            },
            {
                name: 'Designation',
                dataType: 'dropdown',
                mandatory: false,
                enum: ['Designation1', 'Designation2'],
                defaultValue: null
            },
            {
                name: 'Cost Center',
                dataType: 'dropdown',
                mandatory: false,
                enum: ['Cost1', 'Cost2'],
                defaultValue: null
            },
            {
                name: 'Department',
                dataType: 'autocomplete',
                mandatory: false,
                enum: Department,
                defaultValue: null
            },
            {
                name: 'Function',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Grade',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
        ],
        additionalFields: []
    }
};

export const expmpleData = {
    general: {
        predefinedFields: [
            {
                name: 'Employee Name',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'debug',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: 3,
                    maxLength: 40
                }
            },
            {
                name: 'email',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'name',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: 1,
                    maxLength: 32
                }
            },

            {
                name: 'password',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'password2',
                dataType: 'string',
                mandatory: true,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            },
            {
                name: 'Remarks',
                dataType: 'string',
                mandatory: false,
                defaultValue: '',
                validation: {
                    minLength: null,
                    maxLength: null
                }
            }
        ],
        additionalFields: []
    }
};
