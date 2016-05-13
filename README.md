Knockout JS Extensions
======

Collection of useful extensions for Knockout JS

Subscrible Methods
------
#### subscribeChanged()
```javascript
var myOsbv = ko.observable("");
myObsv.subscribeChanged(function(newVal, oldVal) {
    /* custom code */
});
```

Observable Extensions
------
#### toggleable()
```javascript
var myOsbv = ko.observable("").toggleable();
```
```html
<button data-bind="click: myObsv.toggle()"></button>
```
#### sanitizeValue()
```javascript
var myOsbv = ko.observable("")..sanitizeValue(/w3schools/i, '-');
```

Observable Array Methods
------
#### pushIfNotExists()
```javascript
var myOsbvArray = ko.observableArray([]);
myobsvArray.pushIfNotExists(someItem, function(item){ 
    /* some custom predicate code */ 
});
```
#### subscribeChanged()
```javascript
var myOsbvArray = ko.observableArray([]);
myobsvArray.pushToggle(someItem, function(item){ 
    /* some custom predicate code */ 
});
```
#### subscribeArrayWithCallback()
```javascript
var myOsbvArray = ko.observableArray([]);
myobsvArray.subscribeArrayWithCallback(
    function(itemWithStatus){ 
        /* predicate code */ 
    }, 
    successCallback(match){ 
        /* callback code */ 
    }
);
```