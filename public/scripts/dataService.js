(function() {
    'use strict'
    angular.module('app')

    .service('dataService', function($http) {


        var baseURL = 'http://localhost:5000'

        this.getRecipes = function(callBack) {
            $http.get(baseURL + '/api/recipes').then(callBack)
        }

        this.getRecipesForCategory = function(category, callBack) {
            $http.get(baseURL + '/api/recipes?category=' + category).then(callBack)
        }

        this.getRecipeAtID = function(ID, callBack) {
            $http.get(baseURL + '/api/recipes/' + ID).then(callBack)
        }

        this.updateRecipeAtID = function(id, data, callBack, fail) {
            $http.put(baseURL + '/api/recipes/' + id, data).then(callBack, fail)
        }

        this.addRecipe = function(data, callBack, error) {
            $http.post(baseURL + '/api/recipes', data).then(callBack, error)
        }

        this.deleteRecipe = function(id, callBack) {
            $http.delete(baseURL + '/api/recipes/' + id).then(callBack)
        }

        this.getCategorys = function(callBack) {
            $http.get(baseURL + '/api/categories').then(callBack)
        }

        this.getFoodItems = function(callBack) {
            $http.get(baseURL + '/api/fooditems').then(callBack)
        }
    })
})()
