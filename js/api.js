'use strict';

import axios from 'axios';
import Cookies from 'js-cookie';
import locks from 'locks';


const HOST = '';
//Cookies.set('token', 'eyJpYXQiOjE0NTQ0MzIyNjksImFsZyI6IkhTMjU2IiwiZXhwIjoxNDU0NDMzMTY5fQ.eyJpZCI6MTJ9.c38qscdDr32faMolHO4k9ptJ9ovwmBc8yu6CoS53jAQ');



var API = {
  mutex: locks.createMutex(),

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

  lock() {
    return new Promise((resolve, reject) => {
      this.mutex.timedLock(5000, function (error) {
        if (error) {
          reject(Error('Could not get the lock within 5 seconds, so gave up'));
        } else {
          console.log('We got the lock!');

          resolve();
        }
      });
    });
  },

  refreshTokenAndRetry(url, method, data) {
    return new Promise((resolve, reject) => {
      this.refreshToken().then(() => {
        axios({
          url: HOST + url,
          method: method,
          data: data,
          headers: {'Authentication-Token': Cookies.get('token')}
        }).then((res) => {
          resolve(res.data);
        }).catch((resp) => {
          if (response.status == 401) {
            window.location = '/login';
          } else {
            reject(Error(resp.message));
          }
        });
      }).catch((resp) => {
        reject(Error(resp.message));
      });
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
          this.lock().then(() => {
            this.refreshTokenAndRetry(url, method, data).then((resp) => {
              resolve(resp);
              this.mutex.unlock();
            }).catch((error) => {
              reject(Error(error));
            });
          }).catch((error) => {
            reject(Error(error));
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
