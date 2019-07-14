pragma solidity ^0.5.7;

contract TodoList{
    uint public taskCount = 0;
    struct task{
        uint id;
        string description;
        bool completed;
    }
    mapping(uint => task) public tasks;
    constructor() public{
        createTask("Bismillah");
    }
    function createTask(string memory _description) public{
        taskCount++;
        tasks[taskCount] = task(taskCount,_description,false);
    }
}