pragma solidity ^0.8.1;
// SPDX-License-Identifier: MIT

interface IToken {
  function mint(address to, uint amount) external;
  function burn(address owner, uint amount) external;
}