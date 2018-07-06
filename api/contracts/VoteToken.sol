pragma solidity ^0.4.21;
pragma experimental ABIEncoderV2;

contract VoteToken {
    
    struct Bill{
        string title;
        string content;
        address creator;
        address parent;
        address identifer;
    }
    

    mapping (address => mapping (string => uint)) balances;

    
    function createVote(address _address, string _identifier){
        //can only be 1.. can only vote on a vote once.. unless.. delegated
        balances[_address][_identifier]++;
        //GET VOTE ID TOKENS
        //ADD TO REGISTRY
        
    }
    
}