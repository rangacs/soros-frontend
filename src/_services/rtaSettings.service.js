// eslint-disable-next-line import/no-cycle
import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'rtaSettings';

function getAll() {
    return fetchWrapper.get(`${baseUrl}`);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/view?id=${id}`);
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
export const rtaSettingsService = {
    getAll,
    getById,
    save,
    update,
    deleteById
};
