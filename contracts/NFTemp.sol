// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTemp is ERC721 {
    address admin;
    uint[] tokenId;
    uint t;
    uint tokenAmount;
    uint mintLimit;
    uint tokenPrice;
    uint digits;

    string BASE_URI;

    mapping(uint => string) public TOKEN_URI;

    constructor(string memory _baseHSH,string memory _name, string memory _sym, uint _amnt, uint _limit, uint _price) ERC721(_name, _sym) {
        admin = msg.sender;
        BASE_URI = string.concat("https://ipfs.io/ipfs/", _baseHSH);
        t = 1;
        tokenAmount = _amnt;
        mintLimit = _limit;
        tokenPrice = _price;
        digits = 18 ** 10;
    }

    function mint(address to, uint _tokenId) public {
        _mint(to, _tokenId);
        TOKEN_URI[_tokenId] = string.concat(BASE_URI, Strings.toString(_tokenId)); 
        unchecked {
            tokenId[t] = _tokenId;
            t++;
        }
    }
}