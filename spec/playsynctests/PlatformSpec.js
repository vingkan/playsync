//let Playsync = require('');
describe("PlatForm", function() {
    beforeEach(function() {
        let playsync = new Playsync();
        const platform = PlaySync.Platform({
            name: 'Rocket Launcher'
        });

    });

    it("should be able to recieve 'Gampad joins event'", function() {
        gamepad.emit('eventName', 5).then((response) => {
            expect(response.confirmed).toEqual(true);
        });
        expect().toBeFalsy();

        // demonstrates use of 'not' with a custom matcher
        expect()
    });

    it("should be able to respond to gamepad events", function() {
        expect().toBeTruthy();
        expect().toEqual();
    });
    it("should be able to connect using gamecode", function() {
        expect().toBeTruthy();
        expect().toEqual();
    });
    it("should not be able to login before connecting", function() {
        expect().toBeTruthy();
        expect().toEqual();
    });
    it("should not be able to connect before setting firbase credentials", function() {
        expect().toBeTruthy();
        expect().toEqual();
    });
    it("should not be able to connect before setting firbase credentials", function() {
        expect().toBeTruthy();
        expect().toEqual();
    });
});