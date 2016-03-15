'use strict';

import axios from 'axios';
import locks from 'locks';
import {APP_SECRET_KEY} from './constants';

const HOST = '';


var API = {
  mutex: locks.createMutex(),

  login(email, password) {
    return new Promise((resolve, reject) => {
      if (localStorage.token) {
        this.onChange(true);
        resolve(true);
        return
      }

      let postData = {
        email: email,
        password: password,
        secret: APP_SECRET_KEY
      };

      this.post('/API/v1/token/', postData).then((data) => {
        localStorage.token = data.token;
        resolve(true);
        this.onChange(true);
      }).catch((response) => {
        reject(response);
        this.onChange(false);
      });
    });
  },

  getToken() {
    return localStorage.token
  },

  setToken(token) {
    return localStorage.token = token;
  },

  logout() {
    return new Promise((resolve, reject) => {
      delete localStorage.token;
      this.onChange(false);
      resolve(false);
    });
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {},

  refreshToken() {
    return axios({
        url: HOST + '/API/v1/token/',
        method: 'put',
        headers: {'Authentication-Token': this.getToken()}
      }).then((res) => {
        console.log('NEW TOKEN: ', res.data.token);
        if (res.data.token.length > 0) {
          this.setToken(res.data.token);
        }
      }).catch(() => {
        delete localStorage.token;
        this.onChange(false);
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
          headers: {'Authentication-Token': this.getToken()}
        }).then((res) => {
          resolve(res.data);
        }).catch((resp) => {
          if (response.status == 401) {
            window.location = '/login';
          } else {
            reject(resp);
          }
        });
      }).catch((resp) => {
        reject(resp);
      });
    });
  },

  doAjax(url, method, data) {
    return new Promise((resolve, reject) => {
      axios({
        url: HOST + url,
        method: method,
        data: data,
        headers: {'Authentication-Token': this.getToken()}
      }).then((res) => {
        resolve(res.data);
      }).catch((response) => {
        if (response.status == 401) {
          this.lock().then(() => {
            this.refreshTokenAndRetry(url, method, data).then((resp) => {
              resolve(resp);
              this.mutex.unlock();
            }).catch((error) => {
              reject(error);
            });
          }).catch((error) => {
            reject(error);
          });
        } else {
          reject(response);
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
