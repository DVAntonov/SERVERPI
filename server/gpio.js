class MockGpio {
    constructor({pin = 5, mode = 'out', ready = () => {}}) {
        this.pin = pin;
        this.mode = mode;
        this.init().then(()=> { ready(); });
    }

    init() {
        console.log(`gpio mode ${this.pin} ${this.mode}`)
        return Promise.resolve()
    }

    read() {
        return Promise.resolve(1)

    }

    write(value) {
        console.log(`gpio write ${this.pin} ${value}`)
        return Promise.resolve()
    }
}

const gpioLib = process.env.NODE_ENV === 'production'
    ? require('orange-pi-gpio')
    : MockGpio


module.exports = gpioLib;
