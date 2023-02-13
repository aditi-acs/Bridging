pragma solidity ^0.8.1;
// "SPDX-License-Identifier: <SPDX-License>"

import './BridgeBase.sol';

contract BridgeBsc is BridgeBase {
  constructor(address token) BridgeBase(token) {}
}