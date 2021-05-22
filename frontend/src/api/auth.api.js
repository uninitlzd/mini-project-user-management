import httpClient from "./httpClient"


export const login = (credential) => httpClient.post('login', credential)
export const logout = () => httpClient.post('logout')
export const getUserProfile = () => httpClient.get('profile')
export const refreshToken = () => httpClient.post('refresh-token')

export default {
    login,
    logout,
    getUserProfile,
    refreshToken
}