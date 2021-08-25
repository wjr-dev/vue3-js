import instance from "./instance"
/**
 * @param {String} method  请求的方法：get、post、delete、put
 * @param {String} url     请求的url:
 * @param {Object} params    请求的参数
 * @param {Object} config  请求的配置
 * @returns {Promise}     返回一个promise对象，其实就相当于axios请求数据的返回值
 */

export default ({
    method,
    url,
    data,
    config
}) => {
    method = method.toLowerCase();
    if (method == 'post') {
        return instance.post(url, data, { ...config })
    } else if (method == 'get') {
        return instance.get(url, {
            params: data,
            ...config
        })
    } else if (method == 'delete') {
        return instance.delete(url, {
            params: data,
            ...config
        })
    } else if (method == 'put') {
        return instance.put(url, data, { ...config })
    } else {
        console.error('未知的method' + method)
        return false
    }
}