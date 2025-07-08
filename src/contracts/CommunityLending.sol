// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BlessingZAR.sol";

contract CommunityLending {
    BlessingZAR public token;
    uint256 public interestRate = 5; // 5%

    struct Loan {
        uint256 principal;
        uint256 due;
        bool active;
    }

    mapping(address => Loan) public loans;

    constructor(address tokenAddress) {
        token = BlessingZAR(tokenAddress);
    }

    function lend(uint256 amount) external {
        require(token.transferFrom(msg.sender, address(this), amount), "Transfer failed");
    }

    function borrow(uint256 amount) external {
        require(!loans[msg.sender].active, "Existing loan");
        uint256 dueAmount = amount + (amount * interestRate / 100);
        loans[msg.sender] = Loan(amount, dueAmount, true);
        require(token.transfer(msg.sender, amount), "Borrow failed");
    }

    function repay() external {
        Loan storage loan = loans[msg.sender];
        require(loan.active, "No loan");
        require(token.transferFrom(msg.sender, address(this), loan.due), "Repay failed");
        loan.active = false;
    }

    function poolBalance() external view returns (uint256) {
        return token.balanceOf(address(this));
    }
}