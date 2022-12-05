import api from './request.js'

export const postdata = (params) => api({
    url: '',
    method: 'post',
    params: params,
    baseURL: ''
})