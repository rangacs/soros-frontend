// eslint-disable-next-line import/no-cycle
import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'analysis';
function getAll(startTime, endTime, page = 0, pageSize = 10) {
    return fetchWrapper.get(`${baseUrl}?page=${page}&pageSize=${pageSize}&start_time=${startTime}&end_time=${endTime}`);
}

function getById(id) {
    return fetchWrapper.get(`${baseUrl}/${id}`);
}

function create(params) {
    return fetchWrapper.post(baseUrl, params);
}

function update(id, params) {
    return fetchWrapper.patch(`${baseUrl}/${id}`, params);
}

function average(startTime, endTime) {
    return fetchWrapper.get(`${baseUrl}/average?start_time=${startTime}&end_time=${endTime}`);
}

function averagestd(startTime, endTime, interval = 1) {
    return fetchWrapper.get(`${baseUrl}/averagestd?start_time=${startTime}&end_time=${endTime}&interval=${interval}`);
}

function hourlyAverage(startTime, endTime, interval = 1, page, rowsPerPage) {
    return fetchWrapper.get(
        `${baseUrl}/HourlyAverageElement?start_time=${startTime}&end_time=${endTime}&averageInterval=${interval}&page=${page}&rowsPerPage=${rowsPerPage}`
    );
}

function averageByTon(tons) {
    return fetchWrapper.get(`${baseUrl}/tonsRange?tons=${tons}`);
}

function averageByInterval(interval) {
    return fetchWrapper.get(`${baseUrl}/intervalAverage?interval=${interval}`);
}

// Average

// prefixed with underscored because delete is a reserved word in javascript

function deleteById(id) {
    return fetchWrapper.delete(`${baseUrl}/${id}`);
}
function search(key) {
    return fetchWrapper.get(`${baseUrl}/search/${key}`);
}
// eslint-disable-next-line import/prefer-default-export
const analysisServices = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    search,
    average,
    averagestd,
    averageByTon,
    averageByInterval,
    hourlyAverage
};

export default analysisServices;

// eslint-disable-next-line import/prefer-default-export
//  ManageTenantService;
