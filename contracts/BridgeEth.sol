pragma solidity ^0.8.1;
// "SPDX-License-Identifier: <SPDX-License>"

import './BridgeBase.sol';

contract BridgeEth is BridgeBase {
  constructor(address token) BridgeBase(token) {}
}