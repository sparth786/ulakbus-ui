/**
 * Copyright (C) 2015 ZetaOps Inc.
 *
 * This file is licensed under the GNU General Public License v3
 * (GPLv3).  See LICENSE.txt for details.
 */

'use strict';

angular.module('ulakbus.dashboard', ['ngRoute'])

    .controller('DashCtrl', function ($scope, $rootScope, $timeout, $http, RESTURL) {
        $scope.section = function (section_index) {
            $rootScope.section = section_index;
        };

        $scope.student_kw = "";
        $scope.staff_kw = "";

        $scope.students = [];
        $scope.staffs = [];

        $scope.search = function (where) {
            $timeout(function () {
                if (where === 'Personel') {
                    // if input length greater than 3 search for the value
                    if ($scope.staff_kw.length > 3) {
                        $scope.staffs = $scope.getItems(where, $scope.staff_kw);
                    }
                }
                if (where === 'Ogrenci') {
                    if ($scope.student_kw.length > 3) {
                        $scope.students = $scope.getItems(where, $scope.student_kw);
                    }
                }
            });
        };

        $scope.getItems = function (where, params) {
            $http.post(RESTURL.url + where, {"query": params})
                .success(function (data) {
                    return data;
                });
        };

        $scope.select = function (who) {
            $rootScope.who = who;
            // todo: get 'who's related transactions and manipulate sidebar menu
        };

        // when select a user from list

        //$http.post(RESTURL.url + 'crud/').success(function (data) {
        //    $scope.allMenuItems = angular.copy(data.app_models);
        //    $scope.menuItems = []; // angular.copy($scope.allMenuItems);
        //    // at start define breadcrumblinks for breadcrumb
        //    angular.forEach(data.app_models, function (value, key) {
        //        angular.forEach(value[1], function (v, k) {
        //            if (v[1] === $location.path().split('/')[2]) {
        //                $rootScope.breadcrumblinks = [value[0], v[0]];
        //                $scope.menuItems = [$scope.allMenuItems[key]];
        //            } else {
        //                $rootScope.breadcrumblinks = ['Panel'];
        //            }
        //        });
        //    });
        //});

        //$rootScope.$watch(function ($rootScope) {
        //        return $rootScope.section;
        //    },
        //    function (newindex, oldindex) {
        //        if (newindex > -1) {
        //            $scope.menuItems = [$scope.allMenuItems[newindex]];
        //            $scope.collapseVar = 1;
        //            $timeout(function () {
        //                $('#side-menu').metisMenu();
        //            });
        //        }
        //    });
        //
        //$scope.selectedMenu = $location.path();
        //$scope.collapseVar = 0;
        //$scope.multiCollapseVar = 0;
        //
        //$scope.check = function (x) {
        //
        //    if (x === $scope.collapseVar) {
        //        $scope.collapseVar = 0;
        //    } else {
        //        $scope.collapseVar = x;
        //    }
        //
        //};
        //
        //// breadcrumb function changes breadcrumb items and itemlist must be list
        //$scope.breadcrumb = function (itemlist) {
        //    $rootScope.breadcrumblinks = itemlist;
        //    // showSaveButton is used for to show or not to show save button on top of the page
        //    $rootScope.showSaveButton = false;
        //};
        //
        //$scope.multiCheck = function (y) {
        //
        //    if (y === $scope.multiCollapseVar) {
        //        $scope.multiCollapseVar = 0;
        //    } else {
        //        $scope.multiCollapseVar = y;
        //    }
        //};
    })
    //.directive('sidebar', ['$location', function () {
    //    return {
    //        templateUrl: 'shared/templates/directives/sidebar.html',
    //        restrict: 'E',
    //        replace: true,
    //        scope: {},
    //        controller: function ($scope, $rootScope, $http, RESTURL, $location, $timeout) {
    //
    //
    //        }
    //    };
    //}]);
