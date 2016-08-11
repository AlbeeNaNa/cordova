var Utils = {     // 格式化返回数据
     jsonParse: function jsonParse(str) {
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
           }, option.event, option.hook, params.params || []);
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

var CordovaJson = [{     "name": "getAppInfo",
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

   var _iteratorNormalCompletion = true;
   var _didIteratorError = false;
   var _iteratorError = undefined;

   try {
      for (var _iterator = CordovaJson.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
         var cordova$1 = _step.value;

         workplus[cordova$1.name] = Utils.bindEvents(cordova$1.option);
      }
   } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
   } finally {
      try {
         if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
         }
      } finally {
         if (_didIteratorError) {
            throw _iteratorError;
         }
      }
   }

export default workplus;
//# sourceMappingURL=cordova.es2015.js.map
