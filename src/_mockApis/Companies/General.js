import services from 'utils/mockAdapter';

const delay = (timeout) => new Promise((res) => setTimeout(res, timeout));

// ===========================|| MOCK SERVICES ||=========================== //

services.onPost('/api/company/general').reply(async (request) => {
    try {
        await delay(500);
        return [200, { data: 'Data Saved Succesfful' }];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Server Error' }];
    }
});
