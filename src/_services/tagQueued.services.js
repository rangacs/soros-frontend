// eslint-disable-next-line import/no-cycle
import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'tagQueued';
function getAll() {
    return fetchWrapper.get(`${baseUrl}`);
}
function getData(tagID, page, pageSize, interval = 1) {
    return fetchWrapper.get(`${baseUrl}/getData?id=${tagID}&page=${page}&pageSize=${pageSize}&interval=${interval}`);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/view?id=${id}`);
}

function stopTag(id) {
    return fetchWrapper.get(`${baseUrl}/tagProcessStop?id=${id}`);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}/create`, params);
}

function update(id, params) {
    return fetchWrapper.post(`${baseUrl}/update?id=${id}`, params);
}

function resume(id, params) {
    return fetchWrapper.post(`${baseUrl}/resume?id=${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript

function deleteById(id) {
    return fetchWrapper.get(`${baseUrl}/delete?id=${id}`);
}
function search(key) {
    return fetchWrapper.get(`${baseUrl}/search/${key}`);
}
// eslint-disable-next-line import/prefer-default-export
export const tagQueuedServices = {
    getAll,
    getData,
    getById,
    stopTag,
    create,
    update,
    resume,
    deleteById,
    search
};
