import axios from 'axios';

export const baseUrl = "http://122.112.244.157:8000/";

//把整个项目的网络请求都写在这个文件中用export导出
let http = axios.create({
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    baseUrl: baseUrl,
    timeout: 30000
});

let depot = {};

depot.getRequest = function ({ url, config = {}, callback }) {
    http.get(url, config).then((res) => {
        if (res.status === 200) {
            let result = res.data.data;
            callback(result);
        }
    }).catch((error) => {
        console.log('请求错误：' + error);
    });
};

depot.postRequest = function ({ url, data, callback }) {
    http.post(url, data).then(
        (res) => {
            if (res.status === 200) {
                let result = res.data.data;
                callback(result);
            }
        }).catch((error) => {
        console.log(error);
    });
};

export default () => {
    window.depot = depot;
};