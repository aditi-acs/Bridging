pragma solidity ^0.8.1;
// "SPDX-License-Identifier: <SPDX-License>"

import './TokenBase.sol';

contract TokenBsc is TokenBase {
  constructor() TokenBase('BSC Token', 'BTK') {}
}