import * as yup from 'yup';

//  eslint-disable-next-line
export const requiredFieldsHandler = (schema) => {
    const fieldMandatoryObj = {};
    schema.forEach((formElement) => {
        if (formElement.dataType === 'string') {
            if (formElement.mandatory) {
                fieldMandatoryObj[formElement.name] = yup.string().required(`${formElement.name} Required`);
                if (formElement.name === 'Email ID') {
                    fieldMandatoryObj[formElement.name] = yup
                        .string()
                        .email('Must be a valid email')
                        .max(255)
                        .required('Email is required');
                } else if (formElement.validation.minLength && formElement.validation.maxLength) {
                    fieldMandatoryObj[formElement.name] = yup
                        .string()
                        .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`)
                        .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`)
                        .required(`${formElement.name} is required`);
                } else if (formElement.validation.minLength) {
                    fieldMandatoryObj[formElement.name] = yup
                        .string()
                        .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`)
                        .required(`${formElement.name} is required`);
                } else if (formElement.validation.maxLength) {
                    fieldMandatoryObj[formElement.name] = yup
                        .string()
                        .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`)
                        .required(`${formElement.name} is required`);
                }
            } else if (formElement.name === 'PAN Number') {
                fieldMandatoryObj[formElement.name] = yup
                    .string()
                    .matches(/\b[A-Z]{5}\d{4}[A-Z]$/, 'Please use this pattern,Capital Letters e.g AAAAA1111A')
                    .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`)
                    .required();
                // .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`)
                // .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`);
            } else if (formElement.name === 'Email ID') {
                fieldMandatoryObj[formElement.name] = yup.string().email('Must be a valid email').max(255).required('Email is required');
            } else if (formElement.validation.minLength && formElement.validation.maxLength) {
                fieldMandatoryObj[formElement.name] = yup
                    .string()
                    // .required()
                    .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`)
                    .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`);
            } else if (formElement.validation.minLength) {
                fieldMandatoryObj[formElement.name] = yup
                    .string()
                    .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`);
            } else if (formElement.validation.maxLength) {
                fieldMandatoryObj[formElement.name] = yup
                    .string()
                    .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`);
            }
        } else if (formElement.dataType === 'number') {
            if (formElement.mandatory) {
                fieldMandatoryObj[formElement.name] = yup.string().required(`${formElement.name} It is required`);
                if (formElement.validation.minLength && formElement.validation.maxLength) {
                    fieldMandatoryObj[formElement.name] = yup
                        .string()
                        .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`)
                        .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`)
                        .required(`${formElement.name} is required`);
                } else if (formElement.validation.minLength) {
                    fieldMandatoryObj[formElement.name] = yup
                        .string()
                        .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`)
                        .required(`${formElement.name} is required`);
                } else if (formElement.validation.maxLength) {
                    fieldMandatoryObj[formElement.name] = yup
                        .string()
                        .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`)
                        .required(`${formElement.name} is required`);
                }
            } else if (formElement.validation.minLength && formElement.validation.maxLength) {
                fieldMandatoryObj[formElement.name] = yup
                    .string()
                    .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`)
                    .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`);
            } else if (formElement.validation.minLength) {
                fieldMandatoryObj[formElement.name] = yup
                    .string()
                    .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`);
            } else if (formElement.validation.maxLength) {
                fieldMandatoryObj[formElement.name] = yup
                    .string()
                    .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`);
            }
        } else if (formElement.datatType === 'date') {
            if (formElement.mandatory) {
                fieldMandatoryObj[formElement.name] = yup.date().required(`${formElement.name} It is required`);
                if (formElement.validation.minLength && formElement.validation.maxLength) {
                    fieldMandatoryObj[formElement.name] = yup
                        .date()
                        .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`)
                        .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`)
                        .required(`${formElement.name} is required`);
                } else if (formElement.validation.minLength) {
                    fieldMandatoryObj[formElement.name] = yup
                        .date()
                        .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`)
                        .required(`${formElement.name} is required`);
                } else if (formElement.validation.maxLength) {
                    fieldMandatoryObj[formElement.name] = yup
                        .date()
                        .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`)
                        .required(`${formElement.name} is required`);
                }
            } else if (formElement.validation.minLength && formElement.validation.maxLength) {
                fieldMandatoryObj[formElement.name] = yup
                    .date()
                    // .required()
                    .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`)
                    .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`);
            } else if (formElement.validation.minLength) {
                fieldMandatoryObj[formElement.name] = yup
                    .date()
                    .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`);
            } else if (formElement.validation.maxLength) {
                fieldMandatoryObj[formElement.name] = yup
                    .date()
                    .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`);
            }
        } else if (formElement.datatType === 'dropdown') {
            if (formElement.mandatory) {
                fieldMandatoryObj[formElement.name] = yup.mixed().required(`${formElement.name} It is required`);
                if (formElement.validation.minLength && formElement.validation.maxLength) {
                    fieldMandatoryObj[formElement.name] = yup
                        .string()
                        .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`)
                        .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`)
                        .required(`${formElement.name} is required`);
                } else if (formElement.validation.minLength) {
                    fieldMandatoryObj[formElement.name] = yup
                        .string()
                        .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`)
                        .required(`${formElement.name} is required`);
                } else if (formElement.validation.maxLength) {
                    fieldMandatoryObj[formElement.name] = yup
                        .string()
                        .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`)
                        .required(`${formElement.name} is required`);
                }
            } else if (formElement.validation.minLength && formElement.validation.maxLength) {
                fieldMandatoryObj[formElement.name] = yup
                    .string()
                    // .required()
                    .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`)
                    .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`);
            } else if (formElement.validation.minLength) {
                fieldMandatoryObj[formElement.name] = yup
                    .string()
                    .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`);
            } else if (formElement.validation.maxLength) {
                fieldMandatoryObj[formElement.name] = yup
                    .string()
                    .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`);
            }
        } else if (formElement.datatType === 'autocomplete') {
            if (formElement.mandatory) {
                fieldMandatoryObj[formElement.name] = yup.mixed().required(`${formElement.name} It is required`);
                if (formElement.validation.minLength && formElement.validation.maxLength) {
                    fieldMandatoryObj[formElement.name] = yup
                        .string()
                        .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`)
                        .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`)
                        .required(`${formElement.name} It is required`);
                } else if (formElement.validation.minLength) {
                    fieldMandatoryObj[formElement.name] = yup
                        .string()
                        .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`)
                        .required(`${formElement.name} It is required`);
                } else if (formElement.validation.maxLength) {
                    fieldMandatoryObj[formElement.name] = yup
                        .string()
                        .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`)
                        .required(`${formElement.name} is required`);
                }
            } else if (formElement.validation.minLength && formElement.validation.maxLength) {
                fieldMandatoryObj[formElement.name] = yup
                    .string()
                    // .required()
                    .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`)
                    .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`);
            } else if (formElement.validation.minLength) {
                fieldMandatoryObj[formElement.name] = yup
                    .string()
                    .min(formElement.validation.minLength, `Minimum Length Should be ${formElement.validation.minLength}`);
            } else if (formElement.validation.maxLength) {
                fieldMandatoryObj[formElement.name] = yup
                    .string()
                    .max(formElement.validation.maxLength, `Maximum Length Should be ${formElement.validation.maxLength}`);
            }
        }
    });
    return fieldMandatoryObj;
};
