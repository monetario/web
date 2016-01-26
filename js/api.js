'use strict';

import axios from 'axios';
import Cookies from 'js-cookie';


const HOST = '';
//Cookies.set('token', 'eyJpYXQiOjE0NTM0ODU3ODUsImFsZyI6IkhTMjU2IiwiZXhwIjoxNDUzNDg1ODQ1fQ.eyJpZCI6MTJ9._0prmNn9cUagjLfPMWyNL2wKpiEe0iTPraaQ24zaPnU');


var API = {
  refreshToken() {
    return axios({
        url: HOST + '/API/v1/token/',
        method: 'put',
        headers: {'Authentication-Token': Cookies.get('token')}
      }).then((res) => {
        console.log('NEW TOKEN: ', res.data.token);
        if (res.data.token.length > 0) {
          Cookies.set('token', res.data.token);
        }
      });
  },

  doAjax(url, method, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: HOST + url,
        method: method,
        data: data,
        headers: {'Authentication-Token': Cookies.get('token')}
      }).then((res) => {
        resolve(res.data);
      }).catch((response) => {
        if (response.status == 401) {
          this.refreshToken().then(() => {
            axios({
              url: HOST + url,
              method: method,
              data: data,
              headers: {'Authentication-Token': Cookies.get('token')}
            }).then((res) => {
              resolve(res.data);
            }).catch((resp) => {
              reject(Error(resp.message));
            });
          }).catch((resp) => {
            reject(Error(resp.message));
          });
        } else {
          reject(Error(response.message));
        }
      });
    });
  },

  get(url) {
    return this.doAjax(url, 'get');
  },

  delete(url) {
    return this.doAjax(url, 'delete');
  },

  post(url, data) {
    return this.doAjax(url, 'post', data);
  },

  put(url, data) {
    return this.doAjax(url, 'put', data);
  }
};

export default API;
