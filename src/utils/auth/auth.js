import ManageTenantService from '_services/manage-tenant.service';

export function login(data) {
    localStorage.setItem('tokenData', JSON.stringify(data));
}
export function logout() {
    localStorage.removeItem('tokenData');
}
export function getStorageData() {
    return JSON.parse(localStorage.getItem('tokenData')) || null;
}

export const getClientList = async () => {
    const clientName = [];
    const result = await ManageTenantService.getAll();

    result.forEach((client) => {
        client.managed_tenent.forEach((c) => {
            clientName.push(c);
        });
    });
    const clientList = [
        { clientId: '620b467598061301cc47ee7e', clientName: 'TATA CONSULTANCY SERVICE' },
        { clientId: '61d2dd49d63bb73860884833', clientName: 'COGNIZANT TECHNOLOGY SOLUTIONS INDIA PRIVATE LIMITED' },
        { clientId: '6207c49f0832474dec1e09a3', clientName: 'JUMBOTAIL TECHNOLOGIES' }
    ];
    return clientName;
};
