Angular requestAnimationInterval 
$rAI
===========



Angular $interval implementation with requestAnimationFrame


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
