const authHeader = () => {
    // return authorization header with jwt token
    // const currentUser = authenticationService.currentUserValue;
    const tokenData = JSON.stringify(localStorage.getItem('tokenData'));
    if (tokenData && tokenData.tokens) {
        return { Authorization: `Bearer ${tokenData.tokens.token}` };
    }
    return {};
};

export default authHeader;
