// eslint-disable-next-line import/no-cycle
import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'manage-tenant';
function getAll(status = '') {
    let statusString = '';
    if (status !== '') {
        statusString = `?status=${status}`;
    }
    return fetchWrapper.get(`${baseUrl}${statusString}`);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.patch(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript

function deleteById(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
function search(key) {
    return fetchWrapper.get(`${baseUrl}/search/${key}`);
}
// eslint-disable-next-line import/prefer-default-export
const ManageTenantService = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    search
};

export default ManageTenantService;

// eslint-disable-next-line import/prefer-default-export
//  ManageTenantService;
