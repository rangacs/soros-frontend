// eslint-disable-next-line import/no-cycle
import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'layoutWidgets';
function getAll() {
    return fetchWrapper.get(`${baseUrl}`);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}
function getByLayoutId(id) {
    return fetchWrapper.get(`${baseUrl}/?layout_id=${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.patch(`${baseUrl}/${id}`, params);
}

function deleteById(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
function search(key) {
    return fetchWrapper.get(`${baseUrl}/search/${key}`);
}
// eslint-disable-next-line import/prefer-default-export
const layoutWidgetServices = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    search,
    getByLayoutId
};

export default layoutWidgetServices;

// eslint-disable-next-line import/prefer-default-export
//  ManageTenantService;
