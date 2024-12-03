import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'dash';

function getAll() {
    return fetchWrapper.get(`${baseUrl}`);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getByNumber(employeeNumber) {
    return fetchWrapper.get(`${baseUrl}/employeeNumber/${employeeNumber}`);
}
function getBYCompanyId(companyId) {
    return fetchWrapper.get(`${baseUrl}/users/${companyId}`);
}

// eslint-disable-next-line import/prefer-default-export
const dashboardServices = {
    getAll,
    getById,
    getBYCompanyId,
    getByNumber
};
export default dashboardServices;
