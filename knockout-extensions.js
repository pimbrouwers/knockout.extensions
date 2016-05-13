//
// Extends the subscription method, to provide feedback on the new & old value
//
ko.subscribable.fn.subscribeChanged = function (callback) {
    var savedValue = this.peek();

    return this.subscribe(function (newVal) {
        var oldVal = savedValue;
        savedValue = newVal;
        callback(newVal, oldVal);
    });
};

//
// Extends an observable providing Regex Replace support
// cleaning the string of characters defined in the regex param regular express
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
    