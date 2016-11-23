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
        .controller('RecipeDetailController', function($location, dataService) {

            var detailController = this

            //We instantiate some of the scope variables
            detailController.recipe = {}
            detailController.errors = []
            detailController.foodItems = []
            detailController.done = false

            //We tjek here if we are on the edit page or the add page
            if ($location.url().split('/')[1] === 'edit') {
                var recipeID = $location.url().split('/')[2] //We get the id of the recipe

                /**
                 * Service that gets the recipe at a certain id
                 * @type {Get}
                 */
                dataService.getRecipeAtID(recipeID, function(response) { //We get the recipe object
                    detailController.recipe = response.data
                })
                detailController.edit = true //This little variable turns on/off different ui parts on the recipe-detail view
            } else {
                detailController.recipe = { //We add an object with some empty parameters
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
                detailController.edit = false //This little variable turns on/off different ui parts on the recipe-detail view
            }

            /**
             * Service funciton that gets the categories
             * @type {Get}
             */
            dataService.getCategories(function(response) {
                detailController.categories = response.data
                detailController.categories.forEach(category => {
                    if (category.name == detailController.recipe.category) {
                        detailController.standard = category //We sort so we show the category that our recipe is at
                    }
                })
            })

            /**
             * Service funciton that get all the different ingredients
             * @type {get}
             */
            dataService.getFoodItems(function(response) {
                detailController.foodItems = response.data
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
                detailController.errors = errorArray //We send the errors to the view

            }


            /**
             * Service function that updates a vairable
             * @return {null}   we don't retrun anything
             */
            function done() {
                detailController.done = true
            }

            /**
             * Service function that add a new recipe
             * @type {post}
             */
            detailController.saveRecipe = function() {
                dataService.addRecipe(detailController.recipe, function(response) {
                    detailController.recipe = response.data
                    detailController.edit = true
                    done()
                }, errorHandeler)
            }

            /**
             * Service funciton that updates a recipe
             * @type {put}
             */
            detailController.updateRecipe = function() {
                dataService.updateRecipeAtID(detailController.recipe._id, detailController.recipe, function() {
                    done()
                }, errorHandeler)
            }

            /**
             * Simple funciton that returns to the recipes view
             * @return {null}       we don't return anything
             */
            detailController.cancel = function() {
                $location.path('/')
            }

            /**
             * This function finds the ingredient that the select box will start out focusing on
             * @param  {string} foodItem  The ingredient we will search for
             * @param  {array} foodItems  An array of ingredient objects
             * @return {object}           Returns a ingredient object
             */
            detailController.findFoodItem = function(foodItem, foodItems) {
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
            detailController.deleteFromArray = function(array, index) {
                array.splice(index, 1)
            }

            /**
             * Funciton that adds an empty object to an array
             * @param {array} array the array we add an empty object to
             */
            detailController.addNewItem = function(array) {
                array.push({})
            }
        })
})()
