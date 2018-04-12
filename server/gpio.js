class MockGpio {
    constructor({pin = 5, mode = 'out', ready = () => {}}) {
        this.pin = pin;
        this.mode = mode;
        this.init().then(()=> { ready(); });
        this.val;
    }

    init() {
        console.log(`gpio mode ${this.pin} ${this.mode}`)
        return Promise.resolve()
    }

    read() {
        return Promise.resolve(this.val)

    }

    write(value) {
        console.log(`gpio write ${this.pin} ${value}`);
        this.val = value;
        //console.log(this.val);        
        return Promise.resolve();

    }
}

const gpioLib = process.env.NODE_ENV === 'production'
    ? require('orange-pi-gpio')
    : MockGpio

module.exports = gpioLib;
