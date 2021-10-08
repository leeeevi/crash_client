//const { expectRevert, time } = require('@openzeppelin/test-helpers');
const Crash = artifacts.require('./contracts/Crash.sol');
 

contract('Crash', () => {
    let crash;
    beforeEach(async () => {
      crash = await Crash.new();
    });
    
    it('should return 420', async () => {
      //await crash.setMinimumBetSize(420);
      const minBet = await crash.getMinimumBetSize();
      assert(minBet.toNumber() === 420);
    });
  
    
  });