export default function performanceLog(outputConsole: boolean, thresholdToDisplayErrorInMs: number = 1000) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        // Ensure we have the descriptor that might been overriden by another decorator
        if (descriptor === undefined) {
            descriptor = Object.getOwnPropertyDescriptor(target, propertyKey)
        }

        const originalMethod = descriptor.value;
        // Redefine the method to this new method who will call the original method
        // Use the function's this context instead of the value of this when log is called (no arrow function)
        descriptor.value = function (...args: any[]) {
            const parametersAsString = args.map((parameter) => JSON.stringify(parameter)).join(",")
            const startTime = new Date().getTime()
            const result = originalMethod.apply(this, args); // Call the original method
            const endTime = new Date().getTime()
            const timespan = endTime - startTime
            const stringResult = JSON.stringify(result)
            if (outputConsole) {
                const message = "Call [" + timespan + "ms]: " + propertyKey + "(" + parametersAsString + ") => " + stringResult;
                if (timespan < thresholdToDisplayErrorInMs) {
                    console.log(message);
                } else {
                    console.error(message);
                }
            }
            return result;
        }

        return descriptor;
    }
}