// eslint-disable-next-line import/no-cycle
import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'roles';

function getAllRole() {
    return fetchWrapper.get(`${baseUrl}`);
}

function getRoleById(id) {
    return fetchWrapper.get(`${baseUrl}/view?id=${id}`);
}

function saveRole(payload) {
    return fetchWrapper.post(`${baseUrl}/create`, payload);
}

function updateRole(id, payload) {
    return fetchWrapper.post(`${baseUrl}/update?id=${id}`, payload);
}

function deleteRole(id) {
    return fetchWrapper.get(`${baseUrl}/delete?id=${id}`);
}

// eslint-disable-next-line import/prefer-default-export
export const RoleService = {
    getAllRole,
    getRoleById,
    saveRole,
    updateRole,
    deleteRole
};
