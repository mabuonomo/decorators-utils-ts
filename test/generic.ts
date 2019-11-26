import { performanceLog } from '../src/performance/performanceLog';

class MyClass {

    @performanceLog(true)
    myMethod(): boolean {
        console.log('Inside')
        return true
    }
}

(new MyClass()).myMethod()