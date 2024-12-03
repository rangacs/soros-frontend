// eslint-disable-next-line import/no-cycle
import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'tagGroup';
function getAll() {
    return fetchWrapper.get(`${baseUrl}/tagGroup`);
}

function getAllTags() {
    return fetchWrapper.get(`${baseUrl}`);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/view?id=${id}`);
}

function create(params) {
    return fetchWrapper.post(`${baseUrl}/create`, params);
}

function update(id, params) {
    return fetchWrapper.patch(`${baseUrl}/update?id=${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript

function deleteById(id) {
    return fetchWrapper.delete(`${baseUrl}/delete?id=${id}`);
}
function search(key) {
    return fetchWrapper.get(`${baseUrl}/search/${key}`);
}

function getSubTags(tagID) {
    return fetchWrapper.get(`${baseUrl}/GetSubTags?id=${tagID}`);
}

function tagGroupAverage(tagID) {
    return fetchWrapper.get(`${baseUrl}/tagGroupAverage?id=${tagID}`);
}
// eslint-disable-next-line import/prefer-default-export
export const tagGroupService = {
    getAll,
    getAllTags,
    getById,
    create,
    update,
    deleteById,
    search,
    getSubTags,
    tagGroupAverage
};
