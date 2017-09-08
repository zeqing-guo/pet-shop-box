pragma solidity ^0.4.4;

contract Adoption {
    address[16] public adopters;

    function Adoption() {
      for (uint i = 0; i < 16; ++i) {
        adopters[i] = 0x0;
      }
    }

    function adopt(uint petId) public returns (uint) {
      require(petId >= 0 && petId <= 15);

      adopters[petId] = msg.sender;

      return petId;
    }

    function getAdopters() public returns (address[16]) {
        return adopters;
    }
}
