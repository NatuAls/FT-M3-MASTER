'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
class $Promise{
    constructor(executor){
        if(typeof executor !== 'function') throw TypeError("executor must be a function");
        this.executor = executor;

        let _internalResolve = this._internalResolve.bind(this);
        let _internalReject = this._internalReject.bind(this);

        function resolve(value){
            _internalResolve(value);
        };

        function reject(value){
            _internalReject(value);
        };

        executor(resolve, reject);
    }

    _state = 'pending';

    _internalResolve = (data) => {
        if(this._state === 'pending'){
            this._state = 'fulfilled';
            this._value = data;
        }

        if(this._handlerGroups.length){
           this._handlerGroups.forEach(e => {
            e.successCb(data);
           });
        }

        if(this._handlerGroups.length) this._handlerGroups = [];
    }

    _internalReject = (data) => {
        if(this._state === 'pending'){
            this._state = 'rejected';
            this._value = data;
        }

        if(this._handlerGroups.length){
            this._handlerGroups.forEach(e => {
             e.errorCb(data)
            });
        }
        
        if(this._handlerGroups.length) this._handlerGroups = [];
    }

    _handlerGroups = [];

    then = (successCb, errorCb) => {
        if(typeof successCb === 'function' && typeof errorCb === 'function'){
            this._handlerGroups.push({successCb, errorCb});
        } else if(typeof successCb !== 'function' && typeof errorCb !== 'function') {
            this._handlerGroups.push({successCb:false, errorCb:false});
        } else if(typeof successCb !== 'function'){
            this._handlerGroups.push({successCb:false, errorCb});
        } else {
            this._handlerGroups.push({successCb, errorCb:false});
        }

        if(this._state === 'fulfilled') return successCb(this._value);
        if(this._state === 'rejected' && !this._handlerGroups[0].errorCb === false) return errorCb(this._value);
    }

    catch = func => this.then(null, func);

}


module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
