// eslint-disable-next-line import/no-cycle
import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'monitor';
function getAll() {
    return fetchWrapper.get(`${baseUrl}`);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function getColumns(id) {
    return fetchWrapper.get(`${baseUrl}/Columns`);
}

function getIntervalData(interval) {
    return fetchWrapper.get(`${baseUrl}/interval?interval${interval}`);
}
function getTonData(tons) {
    return fetchWrapper.get(`${baseUrl}/tone?tons${tons}`);
}
function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.post(`${baseUrl}/${id}`, params);
}

function updateCol(id, params) {
    return fetchWrapper.post(`${baseUrl}/updateCol?id=${id}`, params);
}
function tagSummary(id, params) {
    return fetchWrapper.get(`${baseUrl}/TagSummery`, params);
}
function dropdowns() {
    return fetchWrapper.get(`${baseUrl}/dropdowns`);
}

// prefixed with underscored because delete is a reserved word in javascript

function deleteById(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
function search(key) {
    return fetchWrapper.get(`${baseUrl}/search/${key}`);
}
// eslint-disable-next-line import/prefer-default-export
const monitorServices = {
    getAll,
    getById,
    create,
    update,
    updateCol,
    deleteById,
    search,
    getColumns,
    getIntervalData,
    getTonData,
    dropdowns,
    tagSummary
};

export default monitorServices;

// eslint-disable-next-line import/prefer-default-export
//  ManageTenantService;
