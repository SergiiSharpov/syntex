/**
 * Class that helps to emit events
 */
class EventEmitter {
    constructor() {
        this.__events = {};
        this.__stop = false;
    }

    /**
     * Clear listeners of the target event.
     * If callback is not defined - remove all listeners
     * @param event {String} Name of the event
     * @param callback {Function} Callback that should be removed
     */
    off(event, callback) {
        if (!callback && this.__events[event]) {
            this.__events[event].splice(0);
        } else {
            this.__events[event] = this.__events[event].filter((elem) => elem !== callback);
        }
    }

    /**
     * Add event listener
     * @param event {String} Name of the event
     * @param callback {Function} Callback that will be executed
     */
    on(event, callback) {
        if (!this.__events[event]) {
            this.__events[event] = [];
        }

        this.__events[event].push(callback);
    }

    /**
     * Add event listener once.
     * It will be deleted after first execution
     * @param event {String}
     * @param callback {Function}
     */
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

    /**
     * Emit's event
     * @param event {String} Name of the event
     * @param data {Object|null} Data tha will be passed to the listener
     * @returns {null}
     */
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