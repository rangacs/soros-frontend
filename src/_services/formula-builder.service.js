// eslint-disable-next-line import/no-cycle
import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'formulaBuilder';

function getAllFormulaBuilder() {
    return fetchWrapper.get(`${baseUrl}`);
}

function getFormulaBuilderById(id) {
    return fetchWrapper.get(`${baseUrl}/view?id=${id}`);
}

function saveFormulaBuilder(payload) {
    return fetchWrapper.post(`${baseUrl}/create`, payload);
}

function updateFormulaBuilder(id, payload) {
    return fetchWrapper.put(`${baseUrl}/update?id=${id}`, payload);
}

function deleteFormulaBuilder(id) {
    return fetchWrapper.get(`${baseUrl}/delete?id=${id}`);
}

function validateFormula(value) {
    return fetchWrapper.post(`isvalidexpression`, value);
}

// eslint-disable-next-line import/prefer-default-export
export const FormulaBuilderService = {
    getAllFormulaBuilder,
    getFormulaBuilderById,
    saveFormulaBuilder,
    updateFormulaBuilder,
    deleteFormulaBuilder,
    validateFormula
};
