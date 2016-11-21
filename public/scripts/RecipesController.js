! function() {

    angular.module('app')
        .controller('RecipesController', function($scope, $location, dataService) {

            function getRecipesNow() {
                dataService.getRecipes(function(response) {
                    $scope.recipes = response.data
                })
            }
            getRecipesNow()
            
            dataService.getCategorys(function(response) {
                $scope.categories = response.data
                $scope.categories.unshift({
                    name: 'All Categories',
                    _id: ''
                })
                $scope.standard = $scope.categories[0]
            })

            $scope.deleteRecipe = function(id, index) {
                dataService.deleteRecipe(id, function(response) {
                    $scope.recipes.splice(index, 1)
                })
            }

            $scope.addRecipe = function() {
                $location.path('/add/')
            }

            $scope.filterList = function(category) {
                if (category === 'All Categories') {
                    getRecipesNow()
                } else {
                    $scope.recipes = []
                    dataService.getRecipesForCategory(category, function(response) {
                        $scope.recipes = response.data
                    })
                }
            }
        })
}()
