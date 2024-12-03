import config from '../config';
import dayjs from 'dayjs';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

const systemURL = `${window.location.protocol}//${window.location.host}`;

// systemURL.replace('3000', '80');
// const host = systemURL.replace('82', '8081');

const host = systemURL.replace('3000', '80');

const baseURL = `${host}/${config.apiUrl}/`;
console.log(`base url ${baseURL}`);

const authHeader = () => {
    // return authorization header with jwt token
    // const currentUser = authenticationService.currentUserValue;
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    if (tokenData && tokenData.tokens) {
        return { Authorization: `Bearer ${tokenData.tokens.access.token}` };
        // return {};
    }
    return {};
};

const getRefreshToken = async (tokenData) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
        refreshToken: tokenData.tokens.refresh.token
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(`${baseURL}/auth/refresh-tokens`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            // console.log(result);
            const accessData = JSON.parse(result);

            if (accessData?.access !== undefined) {
                tokenData.tokens = accessData;
                localStorage.setItem('tokenData', JSON.stringify(tokenData));
            }
        })
        .catch((error) => console.log('error', error));
    // const response = await fetch(`${baseURL}/auth/refresh-tokens`, requestOptions);
    // localStorage.setItem('tokenData', response);
};
function handleResponse(response) {
    return response.text().then((text) => {
        let tokenData = '';
        try {
            tokenData = JSON.parse(localStorage.getItem('tokenData'));
        } catch (error) {
            return 9;
        }

        const user = jwt_decode(tokenData.tokens.access.token);
        const expired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        if (expired) {
            // getRefreshToken(tokenData);
        }
        // const refreshToken = jwt_decode(tokenData.tokens.refresh.token);
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            // const { logout } = useAuth();
            // logout();

            return Promise.reject(error);
        }

        return data;
    });
}
async function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const tokenData = JSON.parse(localStorage.getItem('tokenData')) || null;
    let clientData = '';
    // TODO change it to array based solution
    if (tokenData && tokenData.user.role === 'payrolladmin') {
        const tenantData = JSON.parse(localStorage.getItem('tenantData'));
        if (url.includes('?')) {
            clientData = tenantData ? `&tenantId=${tenantData.id}` : '';
        } else {
            clientData = tenantData ? `?tenantId=${tenantData.id}` : '';
        }
    }
    const response = await fetch(`${baseURL}/${url}${clientData}`, requestOptions);
    return handleResponse(response);
}
async function download(durl, dname) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    let clientData = '';
    // TODO change it to array based solution
    if (tokenData.user.role === 'payrolladmin') {
        const tenantData = JSON.parse(localStorage.getItem('tenantData'));
        if (durl.includes('?')) {
            clientData = tenantData ? `&tenantId=${tenantData.id}` : '';
        } else {
            clientData = tenantData ? `?tenantId=${tenantData.id}` : '';
        }
    }
    fetch(`${baseURL}/${durl}${clientData}`, requestOptions)
        .then((res) => res.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${dname || durl}.xlsx`); // or any other extension yui
            document.body.appendChild(link);
            link.click();
        })
        .catch((err) => console.error(err));
}

async function post(url, body) {
    const headers = authHeader();
    headers['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    };
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    let clientData = '';
    // TODO change it to array based solution
    if (tokenData.user.role === 'payrolladmin') {
        const tenantData = JSON.parse(localStorage.getItem('tenantData'));
        const g = url.includes('?');
        if (url.includes('?')) {
            clientData = tenantData ? `&tenantId=${tenantData.id}` : '';
        } else {
            clientData = tenantData ? `?tenantId=${tenantData.id}` : '';
        }
    }
    const response = await fetch(`${baseURL}/${url}${clientData}`, requestOptions);
    return handleResponse(response);
}
async function uploadFile(url, formbody) {
    const headers = authHeader();
    const requestOptions = {
        method: 'POST',
        headers,
        body: formbody
    };
    const response = await fetch(`${baseURL}/${url}`, requestOptions);
    return handleResponse(response);
}

async function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    const response = await fetch(`${baseURL}/${url}`, requestOptions);
    return handleResponse(response);
}
async function patch(url, body) {
    const headers = authHeader();
    headers['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'PATCH',
        headers,
        body: JSON.stringify(body)
    };
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    let clientData = '';
    // TODO change it to array based solution
    if (tokenData.user.role === 'payrolladmin') {
        const tenantData = JSON.parse(localStorage.getItem('tenantData'));
        const g = url.includes('?');
        if (url.includes('?')) {
            clientData = tenantData ? `&tenantId=${tenantData.id}` : '';
        } else {
            clientData = tenantData ? `?tenantId=${tenantData.id}` : '';
        }
    }
    const response = await fetch(`${baseURL}/${url}${clientData}`, requestOptions);
    return handleResponse(response);
}

// prefixed with underscored because delete is a reserved word in javascript
async function deleteById(url) {
    const headers = authHeader();
    headers['Content-Type'] = 'application/json';
    const requestOptions = {
        headers,
        method: 'DELETE'
    };
    const tokenData = JSON.parse(localStorage.getItem('tokenData'));
    let clientData = '';
    // TODO change it to array based solution
    if (tokenData.user.role === 'payrolladmin') {
        const tenantData = JSON.parse(localStorage.getItem('tenantData'));
        const g = url.includes('?');
        if (url.includes('?')) {
            clientData = `&tenantId=${tenantData.id}`;
        } else {
            clientData = tenantData.id ? `?tenantId=${tenantData.id}` : '';
        }
    }
    const response = await fetch(`${baseURL}/${url}${clientData}`, requestOptions);
    return handleResponse(response);
}

// helper functions

const fetchWrapper = {
    get,
    post,
    put,
    patch,
    delete: deleteById,
    authHeader,
    uploadFile,
    download
};

export default fetchWrapper;
