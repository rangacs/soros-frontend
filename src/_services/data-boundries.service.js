// eslint-disable-next-line import/no-cycle
import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'dataBoundries';

function getAllDataBoundries() {
    return fetchWrapper.get(`${baseUrl}`);
}

function getDataBoundriesById(id) {
    return fetchWrapper.get(`${baseUrl}/view?id=${id}`);
}

function saveDataBoundries(payload) {
    return fetchWrapper.post(`${baseUrl}/create`, payload);
}

function updateDataBoundries(id, payload) {
    return fetchWrapper.post(`${baseUrl}/update?id=${id}`, payload);
}

function deleteDataBoundries(id) {
    return fetchWrapper.get(`${baseUrl}/delete?id=${id}`);
}

// eslint-disable-next-line import/prefer-default-export
export const DataBoundriesService = {
    getAllDataBoundries,
    getDataBoundriesById,
    saveDataBoundries,
    updateDataBoundries,
    deleteDataBoundries
};
