/* global angular*/
/**
 * This file holds the exception handeler module
 *
 * @summary   The module holds a function logs the error and sends an alert to the user
 *
 * @since     22.11.2016
 * @requires  angular
 * @NOTE      [For devs only this module also uses eslint for code quality]
 **/

/**
 * This is the exceptionHandler factory
 * @type factory
 */
(function() {
    angular.module('app') //We get the app
        .factory('$exceptionHandler', function() {
            return function(exception) {
                //Everything in here is exicuted when an error oucceres
                alert('Seems an unexpected error has occured, please try again later. If the error persists, please contact the adminstrator')
                throw exception
            }
        })
})()
