// eslint-disable-next-line import/no-cycle
import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'rmSettings';

function getAll() {
    return fetchWrapper.get(`${baseUrl}`);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/view?id=${id}`);
}

function search(newString) {
    return fetchWrapper.get(`${baseUrl}/search?search=${newString}`);
}

function save(payload) {
    return fetchWrapper.post(`${baseUrl}/create`, payload);
}

function update(id, payload) {
    return fetchWrapper.post(`${baseUrl}/update?id=${id}`, payload);
}

function deleteById(id) {
    return fetchWrapper.get(`${baseUrl}/delete?id=${id}`);
}

// eslint-disable-next-line import/prefer-default-export
export const rmSettingsService = {
    getAll,
    getById,
    save,
    update,
    search,
    deleteById
};
