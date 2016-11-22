/* global angular*/
/**
 * This file holds the recipes controller module
 *
 * @summary   The module holds all of the ui functionality for the recipes view
 *
 * @since     21.11.2016
 * @requires  angular
 * @NOTE      [For devs only this module also uses eslint for code quality]
 **/

/**
 * The module that holds the RecipesController
 * @type controller
 */
(function() {
    angular.module('app') //We get the app module
        //We create the controller
        .controller('RecipesController', function($scope, $location, dataService) {

            /**
             * This is works as a callBack function that gets all the recipes and shoves them into a scope variable
             * @return {null} we don't return anything
             */
            var getRecipesNow = function(response) {
                $scope.recipes = response.data // We assing the recipes to a scope variable
            }

            /**
             * This is works as a callBack function that gets all the categories and shoves them into a scope variable
             * @return {null} we don't return anything
             */
            var displayCategories = function(response) {
                $scope.categories = response.data
                $scope.categories.unshift({
                    name: 'All Categories',
                    _id: ''
                }) //We add a all categories object so we have another option
                $scope.standard = $scope.categories[0]
            }

            /**
             * Method that deletes a recipe from both the ui and the server
             * @param  {String} id    The recipe we delete
             * @param  {int} index    The index of the recipe in the recipes array
             * @return {null} we don't return anything
             */
            $scope.deleteRecipe = function(id, index) {

                if (confirm('Are you sure you want to delete this recipe?')) { //We ask if they are sure that they want to delte the recipe
                    dataService.deleteRecipe(id, function() {
                        $scope.recipes.splice(index, 1) //We remove the recipe from the array
                    })
                }
            }

            /**
             * Opens the add recipe view
             */
            $scope.addRecipe = function() {
                $location.path('/add/')
            }

            /**
             * This method filters the list of categories by getting a new array of recipes for a certain category
             * @param  {String} category The category we search for
             * @return {null} we don't return anything
             */
            $scope.filterList = function(category) {
                if (category === 'All Categories') { //If it is all categories
                    dataService.getRecipes(getRecipesNow) //We download all of the recipes
                } else {
                    dataService.getRecipesForCategory(category, function(response) {
                        $scope.recipes = response.data //we fill the recipes array with new data
                    })
                }
            }

            //Here we get all of the standard information we need at the start
            dataService.getRecipes(getRecipesNow)
            dataService.getCategories(displayCategories)
        })
})()
