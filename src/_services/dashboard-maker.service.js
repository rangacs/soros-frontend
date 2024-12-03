// eslint-disable-next-line import/no-cycle
import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'dashboardMaker';

function getAllDashboardMaker() {
    return fetchWrapper.get(`${baseUrl}/dashboardlist`);
}

function getDashboardMakerById(id) {
    return fetchWrapper.get(`layout?id=${id}`);
}

function saveDashboardMaker(payload) {
    return fetchWrapper.post(`${baseUrl}/create`, payload);
}

function updateDashboardMaker(payload) {
    return fetchWrapper.put(`${baseUrl}/update`, payload);
}

function deleteDashboardMaker(id) {
    return fetchWrapper.delete(`${baseUrl}/delete?id=${id}`);
}

// eslint-disable-next-line import/prefer-default-export
export const DashboardMakerService = {
    getAllDashboardMaker,
    getDashboardMakerById,
    saveDashboardMaker,
    updateDashboardMaker,
    deleteDashboardMaker
};
