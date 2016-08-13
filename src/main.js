import Utils from './tool/utils.js';
import CordovaJson from './data/cordova.json';

let workplus = {};

for(var i = 0; i <  CordovaJson.length; i++){
   workplus[CordovaJson[i].name] = Utils.bindEvents(CordovaJson[i].option);
}

export default workplus;
