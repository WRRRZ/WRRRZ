// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./NFTemp.sol";

contract NFTfactory {

    NFTemp NFT;

    uint c;
    
    mapping(uint => address) contracts;
    
    constructor() {
        
    }


    function createNFTcollection(
        string memory _baseHSH,
        string memory _name, 
        string memory _sym, 
        uint _amnt, 
        uint _limit, 
        uint _price
        )
    external returns(address){
            NFT = new NFTemp(_baseHSH, _name, _sym, _amnt, _limit, _price);
            contracts[c] = address(NFT);
            return address(NFT);
    }
}
