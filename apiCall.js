const axios = require('axios')

 const apiCall = (postData , token) => {
    return axios({
        baseURL: 'https://api.cwiztech.com:8443/SGW/service',
        method: 'POST',
        headers: {
            'Authorization': "bearer " + token
        },
        data: postData
    })
    .then(res => {
        // console.log(res.data)
        return res.data
    })
    .catch(err => console.log(err.message))

}

module.exports.apiCall = apiCall