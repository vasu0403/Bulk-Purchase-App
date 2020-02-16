export const getJwt = () => {
    return localStorage.getItem('auth-token')
}