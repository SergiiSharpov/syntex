
class EventEmitter {
    constructor() {
        this.__events = {};
        this.__stop = false;
    }

    off(event, callback) {
        if (!callback && this.__events[event]) {
            this.__events[event].splice(0);
        } else {
            this.__events[event] = this.__events[event].filter((elem) => elem !== callback);
        }
    }

    on(event, callback) {
        if (!this.__events[event]) {
            this.__events[event] = [];
        }

        this.__events[event].push(callback);
    }

    once(event, callback) {
        if (!this.__events[event]) {
            this.__events[event] = [];
        }

        let self = this;

        this.__events[event].push(function(e) {
            callback(e);
            self.off.call(self, event, this);
        });
    }

    __cancel() {
        this.__stop = true;
    }

    emit(event, data) {
        if (!this.__events[event]) {
            return null;
        }

        let targetEvent;

        for(targetEvent of this.__events[event]) {
            if (!this.__stop) {
                targetEvent({
                    ...data,
                    event,
                    stop: this.__cancel
                });
            } else {
                this.__stop = false;
                break;
            }
        }
    }
}
module.exports = EventEmitter;