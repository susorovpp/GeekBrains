"use strict";

// var arr = [
//     function() { console.log(0); },
//     function() { console.log(2); },
//     function() { console.log(1); },
// ];

// arr[0](); 1
// arr[1](); 2
// arr[2](); 3


// var arr = [];

// for (var i = 0; i < 3; i++) {
//     arr.push(function() { console.log(i) });
// }


var arr = [];

for (var i = 0; i < 3; i++) {
    var newFunc = function(i) {
        return function() {
            console.log(i);
        };
    };

    arr.push(newFunc(i));
};
console.log(arr);

arr[0]();
arr[1]();
arr[2]();