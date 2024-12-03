import axios from 'axios';
import config from 'config';

//  eslint-disable-next-line
export const aadhaarValidator = async (aadhaar, handleError) => {
    const configAadhaar = {
        headers: {
            Authorization: config.externalApiToken
        }
    };
    try {
        const { data } = await axios.post(
            'https://kyc-api.aadhaarkyc.io/api/v1/aadhaar-validation/aadhaar-validation',
            {
                id_number: aadhaar
            },
            configAadhaar
        );
        handleError('', 'Aadhaar Number');
        //  eslint-disable-next-line
        return data;
    } catch (error) {
        handleError('', 'Aadhaar Number');

        handleError(error.response.data.message, 'Aadhaar Number');
        // errorRef.current['Aadhaar Number'] = { __errors: [error.response.data.message || ''] };
        throw error;
    }
};
//  eslint-disable-next-line
export const panValidator = async (pan, handleError) => {
    const configPan = {
        headers: {
            Authorization: config.externalApiToken
        }
    };
    try {
        const { data } = await axios.post(
            'https://kyc-api.aadhaarkyc.io/api/v1/pan/pan',
            {
                id_number: pan
            },
            configPan
        );

        handleError('', 'PAN Number');
        //  eslint-disable-next-line
        return data;
    } catch (error) {
        handleError('', 'PAN Number');

        // errorRef.current['PAN Number'] = { __errors: [error.response.data.message || ''] };
        handleError(error.response.data.message, 'PAN Number');
        throw new Error(error);
    }
};
//  eslint-disable-next-line
export const bankValidator = async (bankNumber, ifsc, handleError) => {
    const configBank = {
        headers: {
            Authorization: config.externalApiToken
        }
    };
    try {
        const { data } = await axios.post(
            'https://kyc-api.aadhaarkyc.io/api/v1/bank-verification/',
            {
                id_number: bankNumber,
                ifsc
            },
            configBank
        );

        handleError('', 'Bank IFSC');
        //  eslint-disable-next-line
        return data;
    } catch (error) {
        handleError('', 'Bank IFSC');
        handleError('', 'Bank Account Number');

        handleError(error.response.data.message, 'Bank IFSC');
        handleError(error.response.data.message, 'Bank Account Number');
        // errorRef.current['Bank Account Number'] = { __errors: [error.response.data.message || ''] };
        throw new Error(error);
    }
};
