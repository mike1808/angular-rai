Angular requestAnimationInterval 
$rAI
===========

$rAI is directive for [AngularJS](https://angularjs.org/) and rAI stands for requestAnimationInterval. This direcitve can be used as built-in [$interval](https://docs.angularjs.org/api/ng/service/$interval) service with the same API.

There are only two differences:
- $rAI has one more parameter - element on which animation will take action (only for WebKit, but you can send it to $rAI and it'll be skipped)
- In $rAI instead of setInterval is used [requestAnimationFrame](http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/) ([MDN](https://developer.mozilla.org/ru/docs/DOM/window.requestAnimationFrame))

## Install

```sh
$ bower install rai
```

## Usage

```javascript
var app = angular.module('myapp', ['mmm-rai']);

app.controller('MyCtrl', function($rAI) {
  var delay = 50,
      count = 10,
      skipApply = false;
      
  $rAI(function() {
    //...
  }, delay, count, skipApply).then(function() {
    console.log('done');
  });
});
````

To cancel animation call $rAI.cancel and pass promise to him. The reject callback will be fired.

```javascript
var promise = $rAI(function() {}, 10, 10);
$rAI.cancel(promise);
````

