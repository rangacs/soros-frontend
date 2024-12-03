// eslint-disable-next-line import/no-cycle
import fetchWrapper from '_helpers/fetch-wrapper';

const baseUrl = 'chart';
function getAll(startTime, endTime, elements, rolling) {
    return fetchWrapper.get(`${baseUrl}?start_time=${startTime}&end_time=${endTime}&elements=${elements}&rolling=${rolling}`);
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
function hourlyAverage(startTime, endTime) {
    return fetchWrapper.get(`${baseUrl}/HourlyAverageElement?start_time=${startTime}&end_time=${endTime}`);
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
export const chartServices = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    search,
    average,
    averageByTon,
    averageByInterval,
    hourlyAverage
};
