//save login response > (user's name and token ) to session storage
export const authenticate = (response, next) => {
    if (window !== 'undefined') {
        console.log('authenticated: ', response)
        sessionStorage.setItem('token', JSON.stringify(response.data.token))
        sessionStorage.setItem('user', JSON.stringify(response.data.name))
    }
    next();
}

//acces token name from session storage
export const getToken = () => {
    if (window !== 'undefined') {
        if (sessionStorage.getItem('token')) {
            return JSON.parse(sessionStorage.getItem('token'))
        }
        return false;
    }
}


//access user from session storage
export const getUser = () => {
    if (window !== 'undefined') {
        if (sessionStorage.getItem('user')) {
            return JSON.parse(sessionStorage.getItem('user'))
        }
        return false;
    }
}


//remove token from session storage
export const logout = (next) => {
    if (window !== 'undefined') {
        sessionStorage.removeItem('token', JSON.stringify(response.data.token))
        sessionStorage.setItem('user', JSON.stringify(response.data.name))
    }
    next();
}
