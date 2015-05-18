/*!
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * Example:
 * <div piwik-reporting-menu></div>
 */
(function () {
    angular.module('piwikApp').directive('piwikReportingMenu', piwikReportingMenu);

    piwikReportingMenu.$inject = ['$document', 'piwik', '$filter', 'piwikApi', '$location'];

    function piwikReportingMenu($document, piwik, $filter, piwikApi, $location){
        return {
            restrict: 'A',
            scope: {
            },
            templateUrl: 'plugins/CoreHome/angularjs/reporting-menu/reportingmenu.directive.html?cb=' + piwik.cacheBuster,
            compile: function (element, attrs) {

                return function (scope, element, attrs, ngModel) {
                    scope.menu = {};

                    scope.loadSubcategory = function (category) {

                        var idSite = broadcast.getValueFromHash('idSite');
                        if (!idSite) {
                            idSite = broadcast.getValueFromUrl('idSite');
                        }
                        var period = broadcast.getValueFromHash('period');
                        if (!period) {
                            period = broadcast.getValueFromUrl('period');
                        }
                        var date   = broadcast.getValueFromHash('date');
                        if (!date) {
                            date = broadcast.getValueFromUrl('date');
                        }

                        var url = 'idSite=' + idSite + '&period=' + period + '&date=' + date + '&';

                        var rand = parseInt(Math.random()* 100000, 10);
                        url += 'random=' + rand+ '&';
                        url += category.html_url;

                        $location.path(url);
                    };

                    piwikApi.bulkFetch([
                        {method: 'API.getCategorizedWidgetsMetadata'},
                        {method: 'Dashboard.getDashboards'}
                    ]).then(function (response) {
                        var menu = [];

                        angular.forEach(response[0].categories, function (category, key) {
                            var categoryId = category.id;

                            angular.forEach(category.subcategories, function (subcategory) {
                                subcategory.html_url = 'module=CoreHome&action=index&category=' + categoryId + '&subcategory='+ subcategory.id;
                            });

                            menu.push(category);
                        });

                        var dashboards = {
                            name: 'Dashboards',  // TODO use translation
                            order: 1,
                            subcategories: []
                        }

                        angular.forEach(response[1], function (dashboard, key) {
                            var subcategory = dashboard.name;
                            dashboard.order = key;
                            dashboard.html_url = 'module=Dashboard&action=embeddedIndex&idDashboard=' + dashboard.id;

                            dashboards.subcategories.push(dashboard);
                        });
                        menu.push(dashboards);

                        scope.menu = menu;
                    });

                };
            }
        };
    }
})();