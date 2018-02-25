let PlaySync = require('../../dist/playsync');

console.log(PlaySync)
describe("Gamepad", function() {
    beforeEach(function() {
      gamepad = PlaySync.Gamepad({
      	type: 'slider'
      })
    });

    it("should be able to emit event", function() {
    	gamepad.emit('eventName',5).then( (response)=>{
    		expect(response.confirmed).toEqual(true);
    	});

    });

    
    it("should be able to connect using gamecode", function() {
      expect().toBeTruthy();
      expect().toEqual();
    });
    /*
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
    });*/
  });
 
