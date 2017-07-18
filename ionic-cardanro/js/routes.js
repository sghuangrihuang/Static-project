// 路由
angular.module('starter.routes', [])
    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('prodetail', {
                url: '/prodetail/:detailid',
                templateUrl: 'templates/prodetail.html',
                controller: "DetaillistCtrl"
            })
            .state('order', {
                url: '/order',
                templateUrl: 'templates/order.html',
                controller: "CartlistCtrl"
            })
            .state('pay', {
                url: '/pay',
                templateUrl: 'templates/pay.html',
                controller: "CartlistCtrl"
            })
            .state('register', {
                url: '/register',
                templateUrl: 'templates/register.html'
            })

            .state('login', {
                    url: '/login',
                    templateUrl: 'templates/login.html'
                })
            .state('procart', {
                url: '/procart',
                templateUrl: 'templates/procart.html',
                controller: "CartlistCtrl"
            })
            .state('prosearch', {
                url: '/prosearch',
                templateUrl: 'templates/prosearch.html',
                controller: "SearchlistCtrl"
            })
            .state('guide', {
                url: '/guide',
                templateUrl: 'templates/guide.html',
                controller: "GuidelistCtrl"
            })

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            .state('app.homepage', {
                    url: '/homepage',
                    views: {
                        'tab-home': {
                            templateUrl: 'templates/homepage.html',
                            controller: 'HomelistCtrl'
                        }
                    }
                })
            .state('app.prosort', {
                url: '/prosort',
                views: {
                    'tab-sort': {
                        templateUrl: 'templates/prosort.html',
                        controller: 'SortlistCtrl'
                    }
                }
            })
            .state('prolist', {
                url: '/prolist/:prosortId',
                templateUrl: 'templates/prolist.html',
                controller: 'SortlistCtrl'
            })
            .state('app.userlists', {
                url: '/userlists',
                views: {
                    'tab-user': {
                        templateUrl: 'templates/userlists.html',
                        controller: 'UserlistCtrl'
                    }
                }
            })
            .state('app.userlist', {
                url: '/userlists/:userlistId',
                views: {
                    'tab-user': {
                        templateUrl: 'templates/userlist.html',
                        controller: 'UserlistCtrl'
                    }
                }
            })
            // 如果没有上述状态相匹配，以此作为后备
        $urlRouterProvider.otherwise('/guide');
    })
