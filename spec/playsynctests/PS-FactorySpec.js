//let Playsync = require('');
describe("Gamepad", function() {
    beforeEach(function() {
      let playsync = new Playsync();
      let gamepad = playsync.Gamepad({
      	type: 'slider'
      })
    });

    it("should be able to emit event", function() {
    	gamepad.emit('eventName',5).then( (response)=>{
    		expect().toBeFalsy();
    	});
      expect().toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect()
    });

    it("should be able to setFirbase", function() {
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
 
