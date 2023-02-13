pragma solidity ^0.8.1;
// "SPDX-License-Identifier: <SPDX-License>"
import './TokenBase.sol';

contract TokenEth is TokenBase {
  constructor() TokenBase('ETH Token', 'ETK') {}
}