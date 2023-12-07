// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Administration {

    address owner;      // Founder Safe Wallet Access Level 99
    address admin;      // Deployer Wallet Access Level 0
    
    mapping(uint => address) manager;    // Manager Access Level 1
    mapping(address => uint) role;
    
    uint m;

    modifier onlyOwner(){
        if(owner != msg.sender || role[msg.sender] != 99) revert();
        _;
    }

    modifier onlyAdmin(){
        if(admin != msg.sender || role[msg.sender] != 0) revert();
        _;
    }

    modifier levelOne(){
        // if(manager[msg.sender] != 0  || manager[msg.sender] != 1 || manager[msg.sender] != 99) revert();
        _;
    }

    constructor(address _owner){
        owner = _owner;
        role[owner] = 99;
        admin = msg.sender;
        role[admin] = 0;
    }

    function addManager(address _man) external onlyAdmin {
        if(role[_man] == 0 || role[_man] == 99) revert();
        manager [m] = _man;
        role[_man] = 1;
        m++;
    }
}