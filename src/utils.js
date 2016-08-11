'use strict'

export default {
  // 格式化返回数据
  jsonParse(str){
    if (typeof str === 'String') return JSON.parser(str);
    return str;
  },

  /*
  ** @option Object
  *  hook => 挂栽点 String
  *  event => 方法 String
  *  params => 参数 Array default []
  *  success => 成功回调函数 Function 非必须
  *  error => 失败回调函数 Function 非必须
  *
  *  支持3种调用方式
  */
  bindEvents(option){
    let self = this;
    return function(params){
      // promise
      let promise = new Promise((resolve, reject) => {
        cordova.exec(result => {
          result = self.jsonParse(result);
          params && params.success && params.success(result);
          resolve(result);
        }, error =>{
          error = self.jsonParse(error);
          params && params.error && params.error(error);
          reject(error);
        },
        option.event, option.hook,
        params.params || []);
      });
      // success
      promise.success = fn => {
        promise.then(result => {
          fn(result);
        });
        return promise;
      };
      // error
      promise.error = fn => {
        promise.then(null, result => {
          fn(result);
        });
        return promise;
      }

      return promise;
    };
  }
};
