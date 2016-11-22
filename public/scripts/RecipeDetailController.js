/* global angular*/
/**
 * This file holds the recipe detail controller module
 *
 * @summary   The module holds all of the ui functionality for the recipe detail view
 *
 * @since     21.11.2016
 * @requires  angular
 * @NOTE      [For devs only this module also uses eslint for code quality]
 **/

/**
 * The recipe detail controller
 * @type controller
 */
(function() {
    angular.module('app') // We get the app module
        .controller('RecipeDetailController', function($scope, $location, dataService) {

            //We instantiate some of the scope variables
            $scope.recipe = {}
            $scope.errors = []
            $scope.foodItems = []

            //We tjek here if we are on the edit page or the add page
            if ($location.url().split('/')[1] === 'edit') {
                var recipeID = $location.url().split('/')[2] //We get the id of the recipe

                /**
                 * Service that gets the recipe at a certain id
                 * @type {Get}
                 */
                dataService.getRecipeAtID(recipeID, function(response) { //We get the recipe object
                    $scope.recipe = response.data
                })
                $scope.edit = true //This little variable turns on/off different ui parts on the recipe-detail view
            } else {
                $scope.recipe = { //We add an object with some empty parameters
                    name: '',
                    category: '',
                    ingredients: [{
                        foodItem: '',
                        condition: '',
                        amount: ''
                    }],
                    steps: [{
                        description: ''
                    }]
                }
                $scope.edit = false //This little variable turns on/off different ui parts on the recipe-detail view
            }

            /**
             * Service funciton that gets the categories
             * @type {Get}
             */
            dataService.getCategories(function(response) {
                $scope.categories = response.data
                $scope.categories.forEach(category => {
                    if (category.name == $scope.recipe.category) {
                        $scope.standard = category //We sort so we show the category that our recipe is at
                    }
                })
            })

            /**
             * Service funciton that get all the different ingredients
             * @type {get}
             */
            dataService.getFoodItems(function(response) {
                $scope.foodItems = response.data
            })

            /**
             * This is the error handeler that prints out the errors so the user can see what they are doing wrong
             * @param  {object} err an object that holds all of the different errors
             * @return {null}       we don't return anything
             */
            var errorHandeler = function(err) {
                var errorArray = []
                var allErrors = err.data.errors //Here we pull out an object with different errors as parameters

                for (let potentialErr in allErrors) { //We run through all the parameters
                    if (typeof allErrors[potentialErr] === 'object') { //The errors are an object
                        errorArray = errorArray.concat(allErrors[potentialErr]) //We concat them to the errorArray
                    }
                }
                $scope.errors = errorArray //We send the errors to the view

            }

            /**
             * Service funciton that add a new recipe
             * @type {post}
             */
            $scope.saveRecipe = function() {
                dataService.addRecipe($scope.recipe, function() {
                    $scope.edit = true
                }, errorHandeler)
            }

            /**
             * Service funciton that updates a recipe
             * @type {put}
             */
            $scope.updateRecipe = function() {
                dataService.updateRecipeAtID($scope.recipe._id, $scope.recipe, function() {}, errorHandeler)
            }

            /**
             * Simple funciton that returns to the recipes view
             * @return {null}       we don't return anything
             */
            $scope.cancel = function() {
                $location.path('/')
            }

            /**
             * This function finds the ingredient that the select box will start out focusing on
             * @param  {string} foodItem  The ingredient we will search for
             * @param  {array} foodItems  An array of ingredient objects
             * @return {object}           Returns a ingredient object
             */
            $scope.findFoodItem = function(foodItem, foodItems) {
                for (var i = 0; i < foodItems.length; i++) {
                    if (foodItems[i].name == foodItem) { //We run through all the ingredients until we find the ingredient that match
                        return foodItems[i]
                    }
                }
            }

            /**
             * function that delete an item from an arry at a ceartain index
             * @param  {array} array  The array to remove the item from
             * @param  {int} index    The index of the item we will be removing
             * @return {null}       we don't return anything
             */
            $scope.deleteFromArray = function(array, index) {
                array.splice(index, 1)
            }

            /**
             * Funciton that adds an empty object to an array
             * @param {array} array the array we add an empty object to
             */
            $scope.addNewItem = function(array) {
                array.push({})
            }
        })
})()
