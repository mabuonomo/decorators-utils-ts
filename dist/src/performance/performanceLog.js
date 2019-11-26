"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function performanceLog(outputConsole, thresholdToDisplayErrorInMs) {
    if (thresholdToDisplayErrorInMs === void 0) { thresholdToDisplayErrorInMs = 1000; }
    return function (target, propertyKey, descriptor) {
        // Ensure we have the descriptor that might been overriden by another decorator
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        }
        var originalMethod = descriptor.value;
        // Redefine the method to this new method who will call the original method
        // Use the function's this context instead of the value of this when log is called (no arrow function)
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var parametersAsString = args.map(function (parameter) { return JSON.stringify(parameter); }).join(",");
            var startTime = new Date().getTime();
            var result = originalMethod.apply(this, args); // Call the original method
            var endTime = new Date().getTime();
            var timespan = endTime - startTime;
            var stringResult = JSON.stringify(result);
            if (outputConsole) {
                var message = "Call [" + timespan + "ms]: " + propertyKey + "(" + parametersAsString + ") => " + stringResult;
                if (timespan < thresholdToDisplayErrorInMs) {
                    console.log(message);
                }
                else {
                    console.error(message);
                }
            }
            return result;
        };
        return descriptor;
    };
}
exports.performanceLog = performanceLog;
