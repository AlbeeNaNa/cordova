var workplus = require('../lib/cordova.js');

var main = {
  init(){
    console.log(workplus);
    document.addEventListener("deviceready", function () {
      workplus.getAppInfo({}).success(function(res){
        console.log(res);
      }).error(function(err){
        console.log(err);
      })

    });
  }
};
main.init();

module.exports = main;
