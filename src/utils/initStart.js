export const init = (time, interval, func) =>  {
    let timeObj = {
        time,
        interval,
        func,
        intervalId: window.undefined,
        curTime: window.undefined,
        curTimeIntervalId: window.undefined,
        bindFunc: function (obj, func) {
            return function () {
                func.apply(obj);
            }
        },
        curTimmFunc: function () {
            if (this.curTime < 1){
                window.clearInterval(this.curTimeIntervalId);
                return;
            }
            if (this.curTime > 0){
                this.curTime = this.curTime - 1;
            }
        },
        start: function () {
            this.curTime = time;
            let fun1 = this.bindFunc(this, this.intervalFunc);
            let fun2 = this.bindFunc(this, this.curTimmFunc);
            this.intervalId = window.setInterval(fun1, interval * 1000);
            this.curTimeIntervalId = window.setInterval(fun2, 1000)
        },
        intervalFunc: function () {
            if (this.curTime < 1){
                window.clearInterval(this.intervalId);
                window.clearInterval(this.curTimeIntervalId);
                return;
            }
            this.func()
        }
    }
    let result = {
        get curTime() {
            return timeObj.curTime
        },
        start: function () {
            timeObj.start();
        }
    }
    return result;
}


//  使用方法 360000 秒内每过 180000 秒执行一次
// const timer = init(360000, 180000, () => {
//     this.showSuccess()
//     console.log(111)
// })
//
// timer.start()