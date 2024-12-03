import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Grid, Button, Box, InputAdornment } from '@material-ui/core';
import { panValidator, aadhaarValidator, bankValidator } from './ExternalApiErrors';
import TextFieldElement from './Components/TextField';
import DateField from './Components/DateField';
import DropDownField from './Components/DropDownField';
import Districts from '../LookUpData/Districts';
import { makeStyles } from '@material-ui/styles';
import AutoComplete from './Components/AutoComplete';
import { requiredFieldsHandler } from './Components/UtilityFunction/requiredFieldHandler';
import { CancelOutlined, CheckCircleRounded } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import axiosBaseUrl from 'baseUrl/axiosBaseUrl';
import * as actions from 'store/actions';
import {
    anyOtherTypeOfDeductionSelected,
    canteenDeductionsSelected,
    medicalInsuranceDeductionSelected,
    oneTimeDeduction,
    oneTimeSalaryAdvanceSelected
} from './Components/ConditionArray/oneTimeDeductionConditions';
import {
    OneTimePayment,
    recallAllowanceSelected,
    overtimeSelected,
    nightShiftAllowanceSelected,
    specialAttendanceBonusSelected
} from './Components/ConditionArray/oneTimaPaymentConditions';

const useStyles = makeStyles({
    flexEnd: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: '20px'
    },
    flexCenter: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' },
    flexGrow: {
        flexGrow: 1
    },
    gridItems: {
        '&:nth-child(odd)': {
            padding: '16px 0 0px 0'
        },
        '&:nth-child(even)': {
            padding: '16px 0 0px 24px'
        }
    }
});

const apiFields = ['PAN Number', 'Aadhaar Number', 'Bank IFSC', 'Bank Account Number'];
const numberFieldsMaxSet = ['PF UAN Number', 'ESI Number', 'Aadhaar Number', 'Employer ESI'];
const JsonForm = ({ schema, activeOption, editCheck, editData, currentTab, tabsLabels, handleEditData }) => {
    const classes = useStyles();
    const [error, setError] = React.useState({ 'PAN Number': '', 'Aadhaar Number': '', 'Bank IFSC': '', 'Bank Account Number': '' });
    const [apiData, setApiData] = React.useState({ 'PAN Number': '', 'Aadhaar Number': '', 'Bank Data': '' });
    const [district, setDistrict] = React.useState([]);
    const [defaultValues, setDefaultValues] = React.useState({});
    const [validationFields, setValidations] = React.useState({});
    const [schemaState, setSchema] = React.useState(schema.combinedFields);
    const [spinner, setSpinner] = React.useState({ draft: false, submit: false });
    const dispatch = useDispatch();
    const state = useSelector((state) => {
        if (state.companyReducer.companyData) {
            return state.companyReducer.companyData;
        }

        return null;
    });
    const [apiError, setApiError] = React.useState({
        'PAN Number': 'idle',
        'Aadhaar Number': 'idle',
        'Bank IFSC': 'idle',
        'Bank Account Number': 'idle'
    });

    const dataMatchHandler = (name) => {
        const index = Object.keys(editData[tabsLabels[currentTab]] || {}).indexOf(name);
        return Object.values(editData[tabsLabels[currentTab]] || {})[index];
        // return Object.values(editData)[index];
    };
    const defaultValueHandler = () => {
        const defaultObj = {};
        if (Object.keys(editData).length > 0) {
            schema.combinedFields.forEach((element) => {
                defaultObj[element.name] = dataMatchHandler(element.name) || '';
            });
        } else {
            schema.combinedFields.forEach((element) => {
                if (element.defaultValue) {
                    defaultObj[element.name] = element.defaultValue;
                }
            });
        }
        setDefaultValues(defaultObj);
    };

    useEffect(() => {
        defaultValueHandler();
    }, [tabsLabels]);

    const oneTimePaymentHander = async (payloadObj) => {
        try {
            const { data: resData } = await axiosBaseUrl.post('/one-time-payment', payloadObj);
            dispatch({
                type: actions.SNACKBAR_OPEN,
                open: true,
                message: 'Submit Success',
                variant: 'alert',
                alertSeverity: 'success'
            });
            setSpinner({ submit: false, draft: false });
            // const { data } = await axiosBaseUrl.get(`/employee/${resData.insertedId}`);
            // // resetForm();
            // handleEditData(data);
        } catch (error) {
            dispatch({
                type: actions.SNACKBAR_OPEN,
                open: true,
                message: 'Submission Unsuccessful',
                variant: 'alert',
                alertSeverity: 'error'
            });
            setSpinner({ submit: false, draft: false });
        }
    };
    const postPayloadObj = (payloadObj, values) => {
        tabsLabels.forEach((tab) => {
            if (tab === tabsLabels[currentTab]) {
                values.status = 'HR_NEW';
                payloadObj[tab] = values;
            } else {
                payloadObj[tab] = { status: null };
            }
        });
    };

    const workFlowStatusOnNewAdd = (payloadObj, values) => {
        if (values.buttonType === 'saveAsDraft') {
            setSpinner({ ...spinner, draft: true });
            payloadObj.WorkflowStatus = 'HR_DRAFT';
        } else if (values.buttonType === 'submit') {
            setSpinner({ ...spinner, submit: true });
            payloadObj.WorkflowStatus = 'HR_NEW';
        }
    };

    const workFlowStatusOnUpdateChange = (payloadObj, values) => {
        tabsLabels.forEach((tab) => {
            if (tab === tabsLabels[currentTab]) {
                values.status = 'HR_NEW';
                payloadObj[tab] = values;
            } else {
                payloadObj[tab] = editData[tab];
            }
        });
        const statusTabChecker = [];
        tabsLabels.forEach((tab) => {
            statusTabChecker.push(payloadObj[tab]?.status);
        });
        if (values.buttonType === 'saveAsDraft') {
            setSpinner({ ...spinner, draft: true });
            payloadObj.WorkflowStatus = 'HR_DRAFT';
        } else if (values.buttonType === 'submit') {
            setSpinner({ ...spinner, submit: true });
            if (statusTabChecker.includes('P_REJECTED')) {
                payloadObj.WorkflowStatus = 'P_REJECTED';
            } else {
                payloadObj.WorkflowStatus = 'HR_NEW';
            }
        }
    };
    const formik = useFormik({
        validateOnChange: false,
        validateOnBlur: true,
        initialValues: defaultValues,
        validationSchema: yup.object(validationFields),
        enableReinitialize: true,
        onSubmit: async (values, { resetForm, ...rest }) => {
            // employee option
            if (activeOption === 1) {
                if (error['PAN Number'] || error['Aadhaar Number'] || error['Bank Account Number'] || error['Bank IFSC']) return;
            }

            try {
                const payloadObj = {
                    isNewEmployee: true,
                    CompanyId: state.id
                };
                if (!editCheck) {
                    workFlowStatusOnNewAdd(payloadObj, values);
                } else if (editCheck) {
                    workFlowStatusOnUpdateChange(payloadObj, values);
                }

                delete values.buttonType;

                // One Time Payment
                if (activeOption === 9) {
                    postPayloadObj(payloadObj, values);
                    oneTimePaymentHander(payloadObj);
                }
                // Not Employee Option
                else if (activeOption > 1) {
                    const { data: resData } = await axiosBaseUrl.patch(`/employee/update-block`, payloadObj);
                    dispatch({
                        type: actions.SNACKBAR_OPEN,
                        open: true,
                        message: 'Form Updated',
                        variant: 'alert',
                        alertSeverity: 'success'
                    });
                    setSpinner({ submit: false, draft: false });
                } else if (!editCheck) {
                    tabsLabels.forEach((tab) => {
                        if (tab === tabsLabels[currentTab]) {
                            values.status = 'HR_NEW';
                            payloadObj[tab] = values;
                        } else {
                            payloadObj[tab] = { status: null };
                        }
                    });
                    const { data: resData } = await axiosBaseUrl.post('/employee', payloadObj);

                    dispatch({
                        type: actions.SNACKBAR_OPEN,
                        open: true,
                        message: 'Submit Success',
                        variant: 'alert',
                        alertSeverity: 'success'
                    });
                    setSpinner({ submit: false, draft: false });
                    const { data } = await axiosBaseUrl.get(`/employee/${resData.insertedId}`);
                    // resetForm();
                    handleEditData(data);
                    // resetForm();
                } else {
                    // tabsLabels.forEach((tab) => {
                    //     if (tab === tabsLabels[currentTab]) {
                    //         values.status = 'HR_NEW';
                    //         payloadObj[tab] = values;
                    //     } else {
                    //         payloadObj[tab] = editData[tab];
                    //     }
                    // });
                    // eslint-disable-next-line
                    const { data: resData } = await axiosBaseUrl.patch(`/employee/${editData.id || editData._id}`, payloadObj);

                    dispatch({
                        type: actions.SNACKBAR_OPEN,
                        open: true,
                        message: 'Updated Success',
                        variant: 'alert',
                        alertSeverity: 'success'
                    });
                    setSpinner({ submit: false, draft: false });
                    // eslint-disable-next-line
                    const { data } = await axiosBaseUrl.get(`/employee/${editData.id || editData._id}`);
                    // resetForm();
                    handleEditData(data);
                }
                setApiError({
                    'PAN Number': 'idle',
                    'Aadhaar Number': 'idle',
                    'Bank IFSC': 'idle',
                    'Bank Account Number': 'idle'
                });
            } catch (error) {
                console.log(error);
                dispatch({
                    type: actions.SNACKBAR_OPEN,
                    open: true,
                    message: 'Submission Unsuccessful',
                    variant: 'alert',
                    alertSeverity: 'error'
                });
                setSpinner({ submit: false, draft: false });
            }
        }
    });

    const handleError = (errorText, type) => {
        setError({ ...error, [type]: errorText });
    };
    const genderAadhaarHandler = (gender) => {
        if (gender === 'F') {
            return 'Female';
        }
        return 'Male';
    };
    const blurHandler = async (e) => {
        if (e.target.name === 'PAN Number') {
            const panRegex = /\b[A-Za-z]{5}\d{4}[A-Za-z]$/;
            try {
                if (!panRegex.test(e.target.value)) throw new Error('Error');
                setApiError({ ...apiError, 'PAN Number': 'loading' });
                const { data } = await panValidator(e.target.value, handleError);
                formik.setFieldValue('Employee Name', data?.full_name);
                setError({ ...error, 'PAN Number': '' });
                setApiError({ ...apiError, 'PAN Number': 'success' });
            } catch (error) {
                console.log(error);
            }
        } else if (e.target.name === 'Aadhaar Number') {
            try {
                if (e.target.value.length !== 12) throw new Error('Error');
                setApiError({ ...apiError, 'Aadhaar Number': 'loading' });
                const { data } = await aadhaarValidator(e.target.value, handleError);
                formik.setFieldValue('State', data?.state);
                formik.setFieldValue('Gender', genderAadhaarHandler(data?.gender));
                setError({ ...error, 'Aadhaar Number': '' });
                setApiError({ ...apiError, 'Aadhaar Number': 'success' });

                // setError('');
            } catch (error) {
                console.log(error);
            }
        } else if (e.target.name === 'Bank IFSC' || e.target.name === 'Bank Account Number') {
            try {
                if (formik.values['Bank IFSC'] || formik.values['Bank Account Number']) {
                    if (e.target.name === 'Bank Account Number') {
                        if (String(e.target.value).length <= 4) return;
                    }
                    setApiError({ ...apiError, 'Bank IFSC': 'loading', 'Bank Account Number': 'loading' });
                    const { data } = await bankValidator(
                        String(formik.values['Bank Account Number']),
                        String(formik.values['Bank IFSC']),
                        handleError
                    );
                    setApiData({ ...apiData, 'Bank Data': data });
                    setApiError({ ...apiError, 'Bank IFSC': 'success', 'Bank Account Number': 'success' });
                    setError({ ...error, 'Bank IFSC': '', 'Bank Account Number': '' });
                }
            } catch (error) {
                console.log(error);
            }
        }
        formik.handleBlur(e);
    };

    const dropDownChangeHandler = (e) => {
        formik.handleChange(e);
    };

    const autoCompleteChangeHandler = (e, value, name) => {
        if (name === 'States') {
            setDistrict(value);
        }
        const element = { target: { name, value } };
        formik.handleChange(element);
    };

    const errorHandler = (formElement) => {
        switch (formElement.name) {
            case 'PAN Number':
                return (formik.touched[formElement.name] && Boolean(formik.errors[formElement.name])) || error[formElement.name];
            case 'Aadhaar Number':
                return (formik.touched[formElement.name] && Boolean(formik.errors[formElement.name])) || error[formElement.name];
            case 'Bank IFSC':
                return (formik.touched[formElement.name] && Boolean(formik.errors[formElement.name])) || error[formElement.name];
            case 'Bank Account Number':
                return (formik.touched[formElement.name] && Boolean(formik.errors[formElement.name])) || error[formElement.name];
            default:
                return formik.touched[formElement.name] && Boolean(formik.errors[formElement.name]);
        }
    };
    const errorHandlerText = (formElement) => {
        switch (formElement.name) {
            case 'PAN Number': {
                return (formik.touched[formElement.name] && formik.errors[formElement.name]) || error[formElement.name];
            }
            case 'Aadhaar Number': {
                return (formik.touched[formElement.name] && formik.errors[formElement.name]) || error[formElement.name];
            }
            case 'Bank IFSC': {
                return (formik.touched[formElement.name] && formik.errors[formElement.name]) || error[formElement.name];
            }
            case 'Bank Account Number': {
                return (formik.touched[formElement.name] && formik.errors[formElement.name]) || error[formElement.name];
            }
            default:
                return formik.touched[formElement.name] && formik.errors[formElement.name];
        }
    };
    const apiErrorHandler = (fieldName) => {
        if (apiError[fieldName] === 'idle') {
            return '';
        }
        if (apiError[fieldName] === 'loading') {
            return <CircularProgress size={20} />;
        }
        if (apiError[fieldName] === 'error') {
            return <CancelOutlined style={{ color: 'red', fontSize: '20px' }} fontSize="default" />;
        }
        if (apiError[fieldName] === 'success') {
            return <CheckCircleRounded style={{ color: '#05cc30', fontSize: '20px' }} fontSize="default" />;
        }
        return '';
    };
    const maxLengthLimit = (name) => numberFieldsMaxSet.includes(name);

    const numberLimitHandler = (e) => {
        const { name } = e.target;
        console.log(name);
        if (name === 'ESI Number') {
            e.target.value = e.target.value.toString().slice(0, 17);
            return e.target.value;
        }
        if (name === 'PF UAN Number') {
            e.target.value = e.target.value.toString().slice(0, 12);
            return e.target.value;
        }
        if (name === 'Aadhaar Number') {
            e.target.value = e.target.value.toString().slice(0, 12);
            return e.target.value;
        }
        if (name === 'Employer ESI') {
            e.target.value = e.target.value.toString().slice(0, 12);
            return e.target.value;
        }
        return undefined;
    };
    const elementHandler = (formElement, index) => {
        if (formElement.name === 'District') {
            formElement.enum = Districts?.[formik?.values?.State || district] || [];
        }
        switch (formElement.dataType) {
            case 'string':
                return (
                    <TextFieldElement
                        name={formElement.name}
                        type="string"
                        required={formElement.mandatory}
                        label={formElement.name}
                        value={formik.values[formElement.name] || ''}
                        onChange={formik.handleChange}
                        onBlur={blurHandler}
                        error={errorHandler(formElement)}
                        helperText={errorHandlerText(formElement)}
                        className={classes.flexGrow}
                        InputProps={
                            apiFields.includes(formElement.name)
                                ? {
                                      endAdornment: (
                                          <InputAdornment position="end" style={{ outline: 'none' }}>
                                              {apiErrorHandler(formElement.name)}
                                          </InputAdornment>
                                      )
                                  }
                                : false
                        }
                        // eslint-disable-next-line
                        inputProps={
                            formElement.name === 'PAN Number'
                                ? { maxLength: 10, readOnly: apiError['PAN Number'] === 'success' }
                                : undefined
                        }
                    />
                );
            case 'number':
                return (
                    <TextFieldElement
                        name={formElement.name}
                        type="number"
                        required={formElement.mandatory}
                        label={formElement.name}
                        value={formik.values[formElement.name] || ''}
                        onChange={formik.handleChange}
                        onBlur={blurHandler}
                        onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                        error={errorHandler(formElement)}
                        helperText={errorHandlerText(formElement)}
                        className={classes.flexGrow}
                        InputProps={
                            apiFields.includes(formElement.name)
                                ? {
                                      endAdornment: (
                                          <InputAdornment position="end" style={{ outline: 'none' }}>
                                              {apiErrorHandler(formElement.name)}
                                          </InputAdornment>
                                      )
                                  }
                                : false
                        }
                        onInput={maxLengthLimit(formElement.name) ? numberLimitHandler : undefined}
                    />
                );
            case 'date':
                // setDefaultValues({ ...defaultValues, [formElement.name]: '' });
                return (
                    <DateField
                        name={formElement.name}
                        type="date"
                        label={formElement.name}
                        onChange={(date) => formik.setFieldValue(formElement.name, date)}
                        value={formik.values[formElement.name] || null}
                        onBlur={blurHandler}
                        className={classes.flexGrow}
                        // defaultValue={dataMatchHandler(formElement.name) || ''}
                        maxDate={formElement.name === 'Date of Birth' ? Date.now() - 504910816000 : false}
                        error={formik.touched[formElement.name] && Boolean(formik.errors[formElement.name])}
                        helperText={formik.touched[formElement.name] && formik.errors[formElement.name]}
                    />
                );
            case 'dropdown':
                return (
                    <DropDownField
                        name={formElement.name}
                        label={formElement.name}
                        value={formik.values[formElement.name] || ''}
                        dropDownItems={formElement.enum || []}
                        className={classes.flexGrow}
                        // defaultValue={dataMatchHandler(formElement.name) || ''}
                        onChange={dropDownChangeHandler}
                        onBlur={blurHandler}
                        error={formik.touched[formElement.name] && Boolean(formik.errors[formElement.name])}
                        helperText={formik.touched[formElement.name] && formik.errors[formElement.name]}
                    />
                );
            case 'autocomplete':
                return (
                    <AutoComplete
                        name={formElement.name}
                        label={formElement.name}
                        value={formik.values[formElement.name] || ''}
                        // defaultValue={formik.values[formElement.name]}
                        options={formElement.enum}
                        className={classes.flexGrow}
                        // defaultValue={dataMatchHandler(formElement.name) || ''}
                        onChange={(e, value) => autoCompleteChangeHandler(e, value, formElement.name)}
                        onBlur={blurHandler}
                        error={formik.touched[formElement.name] && Boolean(formik.errors[formElement.name])}
                        helperText={formik.touched[formElement.name] && formik.errors[formElement.name]}
                    />
                );
            default:
                return '';
        }
    };

    const conditionalSchemaRendering = (optionSelected) => {
        //  One Time Payment
        if (activeOption === 9) {
            if (optionSelected === 'Recall Allowance') {
                const filteredObj = schema.combinedFields.filter((element) => !recallAllowanceSelected.includes(element.name));
                setSchema([...filteredObj]);
            }
            if (optionSelected === 'Overtime (Incentive)') {
                const filteredObj = schema.combinedFields.filter((element) => !overtimeSelected.includes(element.name));
                setSchema([...filteredObj]);
            }
            if (optionSelected === 'Night Shift Allowance') {
                const filteredObj = schema.combinedFields.filter((element) => !nightShiftAllowanceSelected.includes(element.name));
                setSchema([...filteredObj]);
            }
            if (optionSelected === 'Special Attendance Bonus') {
                const filteredObj = schema.combinedFields.filter((element) => !specialAttendanceBonusSelected.includes(element.name));
                setSchema([...filteredObj]);
            }
        }
        //  One Time Deduction
        if (activeOption === 8) {
            if (optionSelected === 'Medical Insurance Deduction') {
                const filteredObj = schema.combinedFields.filter((element) => !medicalInsuranceDeductionSelected.includes(element.name));
                setSchema([...filteredObj]);
            }
            if (optionSelected === 'One time Salary Advance') {
                const filteredObj = schema.combinedFields.filter((element) => !oneTimeSalaryAdvanceSelected.includes(element.name));
                setSchema([...filteredObj]);
            }
            if (optionSelected === 'Canteen Deductions') {
                const filteredObj = schema.combinedFields.filter((element) => !canteenDeductionsSelected.includes(element.name));
                setSchema([...filteredObj]);
            }
            if (optionSelected === 'Any other Deductions') {
                const filteredObj = schema.combinedFields.filter((element) => !anyOtherTypeOfDeductionSelected.includes(element.name));
                setSchema([...filteredObj]);
            }
        }
    };

    const updateTexhHandler = () => {
        if (spinner.submit) {
            return <CircularProgress style={{ color: 'white' }} size={20} />;
        }
        if (editCheck) {
            return 'Update';
        }
        return 'Submit';
    };

    useEffect(() => {
        if (activeOption !== 9) {
            setSchema(schema.combinedFields);
        }
        setValidations(requiredFieldsHandler(schema));
        defaultValueHandler();
    }, [activeOption]);
    useEffect(() => {
        if (activeOption === 9) {
            const filteredObj = schema.combinedFields.filter((element) => !OneTimePayment.includes(element.name));
            setSchema(filteredObj);
        }
        if (activeOption === 8) {
            const filteredObj = schema.combinedFields.filter((element) => !oneTimeDeduction.includes(element.name));
            setSchema(filteredObj);
        }
    }, [schema.combinedFields]);
    useEffect(() => {
        if (error['PAN Number']) {
            setApiError({ ...apiError, 'PAN Number': 'error' });
        }
    }, [error['PAN Number']]);
    useEffect(() => {
        if (error['Aadhaar Number']) {
            setApiError({ ...apiError, 'Aadhaar Number': 'error' });
        }
    }, [error['Aadhaar Number']]);
    useEffect(() => {
        if (error['Bank IFSC'] || error['Bank Account Number']) {
            setApiError({ ...apiError, 'Bank IFSC': 'error', 'Bank Account Number': 'error' });
        }
    }, [error['Bank IFSC'], error['Bank Account Number']]);

    useEffect(() => {
        if (activeOption === 9) {
            conditionalSchemaRendering(formik.values['Type of Allowance']);
        }
    }, [formik.values['Type of Allowance']]);
    useEffect(() => {
        if (activeOption === 8) {
            conditionalSchemaRendering(formik.values['Type of Deduction']);
        }
    }, [formik.values['Type of Deduction']]);

    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <Grid container spacing={3}>
                    {schemaState.map((element, index) => (
                        <Grid key={element.name} className={classes.gridItems} item sm={6}>
                            {elementHandler(element, index)}
                        </Grid>
                    ))}
                </Grid>
                <Box mt={2} className={classes.flexEnd}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            formik.setFieldValue('buttonType', 'saveAsDraft');
                            formik.handleSubmit();
                        }}
                        name="saveAsDraft"
                        type="submit"
                    >
                        {spinner.draft ? <CircularProgress style={{ color: 'white' }} size={20} /> : 'Save As Draft'}
                    </Button>

                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            formik.setFieldValue('buttonType', 'submit');
                            formik.handleSubmit();
                        }}
                        name="submit"
                        type="submit"
                    >
                        {updateTexhHandler()}
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default JsonForm;
