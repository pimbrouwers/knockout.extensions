//////////////////////////////////////////////////////////////////////////////////////////
// SUBSCRIBABLE
//////////////////////////////////////////////////////////////////////////////////////////

//
// Extends the subscription method, to provide feedback on the new & old value
// ex: myObsv.subscribeChanged(function(newVal, oldVal) {/* custom code */});
//
ko.subscribable.fn.subscribeChanged = function (callback) {
    var self = this;
    var savedValue = self.peek();

    return self.subscribe(function (newVal) {
        var oldVal = savedValue;
        savedValue = newVal;
        callback(newVal, oldVal);
    });
};

//////////////////////////////////////////////////////////////////////////////////////////
// OBSERVABLES
//////////////////////////////////////////////////////////////////////////////////////////

//
//toggleable observable
// ex: myObsv = ko.observable(false).toggleable(); AND THEN <button data-bind="click: myObsv.toggle()"></button>;
//
ko.observable.fn.toggleable = function () {

    var self = this;
    self.toggle = function () {
        self(!self());
    };

    return self;
};

//
// Extends an observable providing Regex Replace support
// cleaning the string of characters defined in the regex param regular express
// ex: myObsv = ko.observable("").sanitizeValue(someRegex, someReplacementChar);
//
ko.observable.fn.sanitizeValue = function (regex, replacementChar) {
    var self = this;

    //allow empty spaces to be used for replacement
    //defeault replacement char to '-'
    if (typeof replacementChar === 'undefined' || replacementChar === null) replacementChar = '-';
    
    self.subscribe(function () {
        var val = self();            
        var clean = val.replace(regex, replacementChar);

        self(clean);
    });

    return self;
};

//////////////////////////////////////////////////////////////////////////////////////////
// OBSERVABLE ARRAYS
//////////////////////////////////////////////////////////////////////////////////////////

//
// Extend .push() to add if not exists based on property defined at exection time
// ex: myobsvArray.pushIfNotExists(someItem, function(item){ /* some custom predicate code */ });
//
ko.observableArray.fn.pushIfNotExists = function (itemToAdd, predicate) {
    var self = this;
    
    var match = ko.utils.arrayFirst(self.peek(), function (item) {
        return predicate(item);
    });

    if (!match) {
        self.push(itemToAdd);
    }

    return self;
};

//
// Extend .push() to add or remove based on property defined at exection time
// ex: myobsvArray.pushToggle(someItem, function(item){ /* some custom predicate code */ });
//
ko.observableArray.fn.pushToggle = function (itemToAdd, predicate) {
    var self = this;

    var match = ko.utils.arrayFirst(self.peek(), function (item) {
        return predicate(item);
    });

    if (!match) {
        self.push(itemToAdd);
    }
    else {
        self.remove(function (item) {
            return predicate(item);
        });
    }

    return self;
};

//
// Subscribe to Observable Array, with a callback determined by success of predicate
// ex: myobsvArray.subscribeArrayWithCallback(function(itemWithStatus){ /* predicate code */ }, successCallback(match){ /* callback code */ });
//
ko.observableArray.fn.subscribeArrayWithCallback = function (predicate, matchCallback) {
    var self = this;
    
    self.subscribe(function (changes) {
        var match = ko.utils.arrayFirst(changes, function (itemWithStatus) {
            return predicate(itemWithStatus);
        });
        
        if(match)
            matchCallback(match);

    }, null, "arrayChange");

    return self;
};