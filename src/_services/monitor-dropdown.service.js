// eslint-disable-next-line import/no-cycle
import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'MonitorColumnsDropdown';

function getAllMonitorColumnsDropdown() {
    return fetchWrapper.get(`${baseUrl}`);
}

function getMonitorColumnsDropdownById(id) {
    return fetchWrapper.get(`${baseUrl}/view?id=${id}`);
}

function saveMonitorColumnsDropdown(payload) {
    return fetchWrapper.post(`${baseUrl}/create`, payload);
}

function updateMonitorColumnsDropdown(id, payload) {
    return fetchWrapper.post(`${baseUrl}/update?id=${id}`, payload);
}

function deleteMonitorColumnsDropdown(id) {
    return fetchWrapper.get(`${baseUrl}/delete?id=${id}`);
}

// eslint-disable-next-line import/prefer-default-export
export const MonitorColumnsDropdownService = {
    getAllMonitorColumnsDropdown,
    getMonitorColumnsDropdownById,
    saveMonitorColumnsDropdown,
    updateMonitorColumnsDropdown,
    deleteMonitorColumnsDropdown
};
