// eslint-disable-next-line import/no-cycle
import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'tagCompleted';
function getAll(tagGroupID = 9999) {
    return fetchWrapper.get(`${baseUrl}?tagGroupID=${tagGroupID}`);
}
function query(tagGroupID = 9999, page, pageSize) {
    return fetchWrapper.get(`${baseUrl}/query?tagGroupID=${tagGroupID}&page=${page}&pageSize=${pageSize}`);
}
function getData(tagID, page, pageSize, interval = 1) {
    return fetchWrapper.get(`${baseUrl}/getData?id=${tagID}&page=${page}&pageSize=${pageSize}&interval=${interval}`);
}
function getById(id) {
    return fetchWrapper.get(`${baseUrl}/view?id=${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.post(`${baseUrl}/${id}`, params);
}

function updateTons(id, params) {
    return fetchWrapper.post(`${baseUrl}/updateTons?id=${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript

function deleteById(id) {
    return fetchWrapper.get(`${baseUrl}/delete?id=${id}`);
}
function search(key) {
    return fetchWrapper.get(`${baseUrl}/search/${key}`);
}
function mergeTags(ids, hasQueued) {
    return fetchWrapper.get(`${baseUrl}/merge?taglist=${ids}&hasQueued=${hasQueued}`);
}

function tagUniqueName(tagName) {
    return fetchWrapper.get(`${baseUrl}/IsUniqueName?tagName=${tagName}`);
}

// eslint-disable-next-line import/prefer-default-export
export const tagCompletedServices = {
    getAll,
    getData,
    getById,
    create,
    update,
    updateTons,
    deleteById,
    search,
    mergeTags,
    query,
    tagUniqueName
};
