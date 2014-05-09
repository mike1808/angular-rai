(function() {
    'use strict';

    var app = angular.module('mmm-rai', []);

    function $rAIProvider() {
        this.$get = ['$q', '$window', '$rootScope', function ($q, $window, $rootScope) {
            var intervals = {};

            var rAF = $window.requestAnimationFrame,
                cAF = $window.cancelAnimationFrame;

            function rAI(fn, delay, count, invokeApply, element) {
                var iteration = 0,
                    skipApply = !!invokeApply,
                    deferred = $q.defer(),
                    promise = deferred.promise,
                    lastIteration = null;

                count = count || 0;

                promise.then(null, null, fn);

                var looper = function (timestamp) {
                    promise.$$rAIid = rAF(looper, element);

                    if (lastIteration == null) lastIteration = timestamp;
                    var delta = timestamp - lastIteration;
                    if (delta >= delay) {
                        deferred.notify(iteration++);

                        if (count > 0 && iteration > count) {
                            deferred.resolve(iteration);
                            cAF(promise.$$rAIid);
                            delete intervals[promise.$$rAIid];
                        } else {
                            lastIteration = timestamp;
                        }
                    }

                    if (!skipApply) $rootScope.$apply();
                };

                promise.$$rAIid = requestAnimationFrame(looper, element);

                intervals[promise.$$rAIid] = deferred;

                return promise;
            }

            rAI.cancel = function (promise) {
                if (promise && promise.$$rAIid in intervals) {
                    intervals[promise.$$rAIid].reject('canceled');
                    cAF(promise.$$rAIid);
                    delete intervals[promise.$$rAIid];

                    return true;
                }

                return false;
            };

            return rAI;
        }]
    }

    app.provider('$rAI', $rAIProvider);
})();