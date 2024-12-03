// eslint-disable-next-line import/no-cycle
import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'monitorColumn';

function getAllMonitorColumn() {
    return fetchWrapper.get(`${baseUrl}/columns`);
}

function getMonitorColumnById(id) {
    return fetchWrapper.get(`${baseUrl}/view?id=${id}`);
}

function saveMonitorColumn(payload) {
    return fetchWrapper.post(`${baseUrl}/create`, payload);
}

function updateMonitorColumn(id, payload) {
    return fetchWrapper.post(`${baseUrl}/update?id=${id}`, payload);
}

function deleteMonitorColumn(id) {
    return fetchWrapper.get(`${baseUrl}/delete?id=${id}`);
}

// eslint-disable-next-line import/prefer-default-export
export const MonitorColumnService = {
    getAllMonitorColumn,
    getMonitorColumnById,
    saveMonitorColumn,
    updateMonitorColumn,
    deleteMonitorColumn
};
