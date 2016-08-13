/*!
 * Cordova.js v0.0.1
 * (c) 2016 Hejx
 * Released under the MIT License.
 * https://github.com/WorkPlusFE/cordova#readme
 */

(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
   typeof define === 'function' && define.amd ? define(factory) :
   (global.workplus = factory());
}(this, function () { 'use strict';

   var Utils = {
     // 格式化返回数据
     jsonParse: function jsonParse(str) {
       if (typeof str === 'String') return JSON.parse(str);
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
     bindEvents: function bindEvents(option) {
       var self = this;
       return function (params) {
         // promise
         var promise = new Promise(function (resolve, reject) {
           cordova.exec(function (result) {
             result = self.jsonParse(result);
             params && params.success && params.success(result);
             resolve(result);
           }, function (error) {
             error = self.jsonParse(error);
             params && params.error && params.error(error);
             reject(error);
           }, option.hook, option.event, params.params || []);
         });
         // success
         promise.success = function (fn) {
           promise.then(function (result) {
             fn(result);
           });
           return promise;
         };
         // error
         promise.error = function (fn) {
           promise.then(null, function (result) {
             fn(result);
           });
           return promise;
         };

         return promise;
       };
     }
   };
   // bindEvents(option){
   //   let self = this;
   //   return function(params){
   //     // promise
   //     let promise = new Promise((resolve, reject) => {
   //       setTimeout(() => {
   //         params && params.success && params.success(result);
   //         resolve({'option': option, 'params': params});
   //       }, 2000);
   //     });
   //     // success
   //     promise.success = fn => {
   //       promise.then(result => {
   //         fn(result);
   //       });
   //       return promise;
   //     };
   //     // error
   //     promise.error = fn => {
   //       promise.then(null, result => {
   //         fn(result);
   //       });
   //       return promise;
   //     }
   //
   //     return promise;
   //   };
   // }

   var CordovaJson = [{
     "name": "getAppInfo",
     "option": {
       "event": "getAppInfo",
       "hook": "WorkPlus_PublicClound"
     }
   }, {
     "name": "getConfig",
     "option": {
       "event": "getConfig",
       "hook": "WorkPlus_LightApp"
     }
   }];

   var workplus = {};

   for (var i = 0; i < CordovaJson.length; i++) {
      workplus[CordovaJson[i].name] = Utils.bindEvents(CordovaJson[i].option);
   }

   return workplus;

}));