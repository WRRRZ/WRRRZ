// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./utils/Administration.sol";

contract NFTemp is ERC721, Administration {
    
    uint tokenId;
    uint tokenAmount;
    uint mintLimit;
    uint tokenPrice;
    uint digits;

    string BASE_URI;

    mapping(uint => string) public TOKEN_URI;

    constructor(string memory _baseHSH,string memory _name, string memory _sym, uint _amnt, uint _limit, uint _price) ERC721(_name, _sym) Administration(msg.sender) {
        admin = msg.sender;
        BASE_URI = string.concat("https://ipfs.io/ipfs/", _baseHSH);
        tokenId = 1;
        tokenAmount = _amnt;
        mintLimit = _limit;
        tokenPrice = _price;
        digits = 18 ** 10;
    }

    function mint(address to) public onlyOwner {
        _safeMint(to, tokenId);
        TOKEN_URI[tokenId] = string.concat(BASE_URI, Strings.toString(tokenId)); 
        unchecked {
            tokenId++;
        }
    }
}