pragma solidity ^0.6.0;

import '../Mintable.sol';
import '../Event.sol';
import '../Presale.sol';

contract EventContract is Event, Mintable, Presale {
    // ...
}