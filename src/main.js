import Utils from './utils.js';
import CordovaJson from './cordova.json';

let workplus = {};

for(let cordova of CordovaJson.values()){
   workplus[cordova.name] = Utils.bindEvents(cordova.option);
}

export default workplus;
