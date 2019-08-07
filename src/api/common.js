import { apiUrl } from 'base/js/base.js';
export const common = {
    login(obj) {
        return $ajax.post(apiUrl.apiUrl + 'user/login', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },

}
