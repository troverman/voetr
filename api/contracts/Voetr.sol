pragma solidity ^0.4.21;
pragma experimental ABIEncoderV2;

contract Voetr {
    
    struct Bill{}
    struct BillMember{}
    struct BillVote{}
    struct Committee{}
    struct CommitteeBill{}
    struct CommitteeMember{}
    struct Post{}
    struct PostVote{}
    struct Reaction{}
    struct Representative{} // DATA?
    struct User{}//IDENTITY
    struct Vote{}
    struct VoteVote{}
    
    mapping (address => mapping (string => uint)) balances;
    mapping(address => User) public users;
    
    Bill[] public bills;
    Committee[] public committees;
    CommitteeMember[] public committeeMembers
    Post[] public posts
    Vote[] public votes;
    VoteVote[] public voteVotes;

    function createVote(address _address, string _identifier){
        //can only be 1.. can only vote on a vote once.. unless.. delegated
        balances[_address][_identifier]++;
        //GET VOTE ID TOKENS
        //ADD TO REGISTRY
        
    }
    
}