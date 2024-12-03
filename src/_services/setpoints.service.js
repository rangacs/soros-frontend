// eslint-disable-next-line import/no-cycle
import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'setPoints';

function getAllSetpoints() {
    return fetchWrapper.get(`${baseUrl}`);
}

function getSetpointsById(id) {
    return fetchWrapper.get(`${baseUrl}/view?id=${id}`);
}

function saveSetpoints(payload) {
    return fetchWrapper.post(`${baseUrl}/create`, payload);
}

function updateSetpoints(id, payload) {
    return fetchWrapper.post(`${baseUrl}/update?id=${id}`, payload);
}

function deleteSetpoints(id) {
    return fetchWrapper.get(`${baseUrl}/delete?id=${id}`);
}

// eslint-disable-next-line import/prefer-default-export
export const SetpointsService = {
    getAllSetpoints,
    getSetpointsById,
    saveSetpoints,
    updateSetpoints,
    deleteSetpoints
};
