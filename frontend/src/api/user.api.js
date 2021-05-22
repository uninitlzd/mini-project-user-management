import httpClient from "./httpClient"

const endpoint = 'users';

export const index = (page) => httpClient.get(endpoint, {
    params: {
        page
    }
})
export const show = (id) => httpClient.get(`${endpoint}/${id}`)
export const create = (form) => httpClient.post(endpoint, form)
export const update = (id, form) => httpClient.put(`${endpoint}/${id}`, form)
export const destroy = (id) => httpClient.delete(`${endpoint}/${id}`)
export const changePassword = (id, form) => httpClient.put(`${endpoint}/${id}/change-password`, form)
export const updatePassword = (id, form) => httpClient.put(`${endpoint}/${id}/update-password`, form)

export default {
    index,
    show,
    create,
    update,
    destroy,
    updatePassword,
    changePassword
}