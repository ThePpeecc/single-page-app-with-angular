/* global angular*/
/**
 * This file holds the data service module
 *
 * @summary   The module holds all of the networking functionality for this app
 *
 * @since     21.11.2016
 * @requires  angular
 * @NOTE      [For devs only this module also uses eslint for code quality]
 **/

/**
 * This is the data service module
 * @type service
 */
(function() {
    'use strict'

    //We get the app module
    angular.module('app')

    //We create our service
    .service('dataService', function($http) { //We depend on the $http functionality for our networking


        var baseURL = 'http://localhost:5000'

        /**
         * This function get the recipes from the database
         * @param  {funciton} callBack The function we send back when we recive the data
         * @return {null}              We don't return anything
         */
        this.getRecipes = function(callBack) {
            $http.get(baseURL + '/api/recipes').then(callBack)
        }

        /**
         * We get the recipes for a selected category (is used when filtering)
         * @param  {string} category   The category we are finding recipes for
         * @param  {funciton} callBack The function we send back when we recive the data
         * @return {null}               We don't return anything
         */
        this.getRecipesForCategory = function(category, callBack) {
            $http.get(baseURL + '/api/recipes?category=' + category).then(callBack)
        }

        /**
         * We get the recipe for a selected id (is used when showing the detail for a recipe)
         * @param  {string} ID         The id we are finding a recipe for
         * @param  {funciton} callBack The function we send back when we recive the data
         * @return {null}               We don't return anything
         */
        this.getRecipeAtID = function(ID, callBack) {
            $http.get(baseURL + '/api/recipes/' + ID).then(callBack)
        }


        /**
         * We update a recipe with new data
         * @param  {string} id          The id we are updating a recipe at
         * @param  {object} data        The data we are updating
         * @param  {funciton} callBack  The function we send back when we recive a response
         * @param  {funciton} fail      The function that handel potetial errors
         * @return {null}               We don't return anything
         */
        this.updateRecipeAtID = function(id, data, callBack, fail) {
            $http.put(baseURL + '/api/recipes/' + id, data).then(callBack, fail)
        }

        /**
         * We add a recipe with new data
         * @param  {object} data        The data we are adding
         * @param  {funciton} callBack  The function we send back when we recive a response
         * @param  {funciton} error     The function that handel potetial errors
         * @return {null}               We don't return anything
         */
        this.addRecipe = function(data, callBack, error) {
            $http.post(baseURL + '/api/recipes', data).then(callBack, error)
        }

        /**
         * We delete a recipe at a certain id
         * @param  {string} id        The id for the recipe we are deleting
         * @param  {funciton} callBack  The function we send back when we recive a response
         * @return {null}               We don't return anything
         */
        this.deleteRecipe = function(id, callBack) {
            $http.delete(baseURL + '/api/recipes/' + id).then(callBack)
        }

        /**
         * We get all the categories that the database holds
         * @param  {funciton} callBack The function we send back when we recive the data
         * @return {null}               We don't return anything
         */
        this.getCategories = function(callBack) {
            $http.get(baseURL + '/api/categories').then(callBack)
        }

        /**
         * We get all the different ingredients that the database holds
         * @param  {funciton} callBack The function we send back when we recive the data
         * @return {null}               We don't return anything
         */
        this.getFoodItems = function(callBack) {
            $http.get(baseURL + '/api/fooditems').then(callBack)
        }
    })
})()
