import api from './request.js'

export const postdata = (params) => api({
    url: '/test',
    method: 'post',
    data: params,
    baseURL: 'http://127.0.0.1:5000'
})


// export const postdata = (params) => 