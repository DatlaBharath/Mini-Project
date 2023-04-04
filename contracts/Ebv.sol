// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;
contract Ebv {
    struct user {
        string name;
        address add;
    }
    struct document{
        string docName;
        string docId;
    }
    mapping(address => document[]) public userData;
    address immutable public i_owner;
    string public i_ownerName = "bharath";
    // string ipfsHash;
    user[] public candidate;
    user[] public recruiter;
    bytes32[] public arrHash;
    constructor() {
        i_owner = msg.sender;
    }
    function addCandidateUser(string memory _username,address _address) public{
        uint check = 0;
        for(uint256 i=0;i<candidate.length;i++){
            if(candidate[i].add == _address){
                check = 1;
            }
        }
        if(check == 0){
            candidate.push(user(_username,_address));
        }
    }
    function addRecruiterUser(string memory _username,address _address) public{
        uint check = 0;
        for(uint256 i=0;i<candidate.length;i++){
            if(candidate[i].add == _address){
                check = 1;
            }
        }
        if(check == 0){
            recruiter.push(user(_username,_address));
        }
    }
    function candidateValidate(string memory _username,address _address) public view returns(bool){
        for(uint256 i=0;i<candidate.length;i++){
            if(candidate[i].add == _address){
                return keccak256(abi.encodePacked(candidate[i].name)) == keccak256(abi.encodePacked(_username));
            }
        }
        return false;
    }
    function recruiterValidate(string memory _username,address _address) public view returns(bool){
        for(uint256 i=0;i<recruiter.length;i++){
            if(recruiter[i].add == _address){
                return keccak256(abi.encodePacked(recruiter[i].name)) == keccak256(abi.encodePacked(_username));
            }
        }
        return false;
    }
    function uplodeCandidateDocument(string memory _docName, string memory _docId) public{
        userData[msg.sender].push(document(_docName,_docId));
    }
    function documentPush(string memory _docName) public view returns(bytes32){
        for(uint256 i=0;i<userData[msg.sender].length;i++){
            if (keccak256(abi.encodePacked(userData[msg.sender][i].docName)) == keccak256(abi.encodePacked(_docName))){
                return keccak256(abi.encode(userData[msg.sender][i]));
            }
        }
        return 0;
    }
    function hashArray(string memory _docName,string memory _docId) public ownerPower{
        document memory doc = document(_docName,_docId);
        arrHash.push(keccak256(abi.encode(doc)));
    }
    function hashVerify(bytes32 _hash) public view returns(bool){
        for(uint256 i=0;i<arrHash.length;i++){
            if(arrHash[i] == _hash){
                return true;
            }
        }
        return false;
    }

    // function storePDF(string memory _ipfsHash) public {
    //     ipfsHash = _ipfsHash;
    // }
    
    // function getPDF() public view returns (string memory) {
    //     return ipfsHash;
    // }
    modifier ownerPower(){
        if(msg.sender == i_owner){_;}
    }
}