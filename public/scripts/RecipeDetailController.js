! function() {
    angular.module('app')
        .controller('RecipeDetailController', function($scope, $location, dataService) {


            $scope.recipe = {}
            $scope.errors = []

            if ($location.url().split('/')[1] === 'edit') {
                var recipeID = $location.url().split('/')[2]
                dataService.getRecipeAtID(recipeID, function(response) {
                    $scope.recipe = response.data
                })
                $scope.edit = true

            } else {
                $scope.recipe =  {
                    name: '',
                    category: '',
                    ingredients: [{
                        foodItem: '',
                        condition: '',
                        amount: ''
                    }],
                    steps: [{
                        description: ''
                    }]}
                $scope.edit = false
            }

            dataService.getCategorys(function(response) {
                $scope.categories = response.data
                $scope.categories.forEach(category => {
                    if (category.name == $scope.recipe.category) {
                        $scope.standard = category
                    }
                })
            })

            $scope.foodItems = []
            dataService.getFoodItems(function(response) {
                $scope.foodItems = response.data
            })

            var errorHandeler = function(err) {

                var errorArray = []

                var allErrors = err.data.errors

                for (let potentialErr in allErrors) {
                    if (typeof allErrors[potentialErr] === 'object') {
                        errorArray = errorArray.concat(allErrors[potentialErr])
                    }
                }
                $scope.errors = errorArray

            }

            $scope.saveRecipe = function() {
              dataService.addRecipe($scope.recipe, function(response) {
                $scope.edit = true
              }, errorHandeler)
            }

            $scope.updateRecipe = function() {
                dataService.updateRecipeAtID($scope.recipe._id, $scope.recipe, function(response) {
                }, errorHandeler)
            }

            $scope.cancel = function() {
                $location.path('/')
            }

            $scope.findFoodItem = function(foodItem, foodItems) {
                for (var i = 0; i < foodItems.length; i++) {
                    if (foodItems[i].name == foodItem) {
                        return foodItems[i]
                    }
                }
            }

            $scope.deleteFromArray = function(array, index) {
                array.splice(index, 1)
            }

            $scope.addNewItem = function(array) {
                var newItem = {

                }
                array.push(newItem)
            }


        })
}()
