// eslint-disable-next-line import/no-cycle
import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'userGroups';

function getAllUsers() {
    return fetchWrapper.get(`${baseUrl}`);
}

function getUserById(id) {
    return fetchWrapper.get(`${baseUrl}/view?id=${id}`);
}

function saveUser(payload) {
    return fetchWrapper.post(`${baseUrl}/create`, payload);
}

function updateUser(id, payload) {
    return fetchWrapper.post(`${baseUrl}/update?id=${id}`, payload);
}

function deleteUser(id) {
    return fetchWrapper.delete(`${baseUrl}/delete?id=${id}`);
}

function changePassword(payload) {
    return fetchWrapper.post(`${baseUrl}/changepassword`, payload);
}
// eslint-disable-next-line import/prefer-default-export
export const UserGroupsService = {
    getAllUsers,
    getUserById,
    saveUser,
    updateUser,
    deleteUser,
    changePassword
};

// eslint-disable-next-line import/prefer-default-export
//  UserGroupsService;
