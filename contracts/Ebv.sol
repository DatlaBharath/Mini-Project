// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;
contract Ebv {
    // user Object Create chestadha Account create Chesinpidu deni Object lo store Avutdhi
    struct user {
        string name;
        address add;
    }
    // Document Object Create chestadha Document Uplode Chesinpidu deni Object lo store Avutdhi
    struct document{
        string docName;
        string docId; 
    }
    // Endulo andari push chesina documents Hash untai. verify ipoinvatiki true avanivatiki false
    struct verifyStat{
        bytes32 hashValue;
        bool status;
    }
    
    mapping(address => document[]) public userData; // Ex: userData[siva' metamask  Address] = shiva uplode chesina ani documents objects oka array estadi
    
    // edhi pi ex lo chesina pani chestadhi address estam vathi docuuments estadhi
    function getArray(address _address) public view returns(document[] memory){
        return userData[_address];
    }

    address immutable public i_owner;
    string public i_ownerName = "bharath";
    // string ipfsHash;
    user[] public candidate; // indhulo candidate usernames and address untai
    user[] public recruiter; // indhulo recruiter usernames and address untai
    bytes32[] public arrHash; // owner uplode chesina hashes untai
    verifyStat[] public VerifiedHash; // verifyStats taluka Objects untai so user owner ki push cheste indulo store avutai

    constructor() {
        i_owner = msg.sender;
    }

    // "user[] public candidate" indulo ki user object push avutdhi user register iyinapudu 
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
    // "user[] public recruiter" indulo ki user object push avutdhi user register iyinapudu
    function addRecruiterUser(string memory _username,address _address) public{
        uint check = 0;
        for(uint256 i=0;i<recruiter.length;i++){
            if(recruiter[i].add == _address){
                check = 1;
            }
        }
        if(check == 0){
            recruiter.push(user(_username,_address));
        }
    }

    // candidate login validation
    function candidateValidate(string memory _username,address _address) public view returns(bool){
        for(uint256 i=0;i<candidate.length;i++){
            if(candidate[i].add == _address){
                return keccak256(abi.encodePacked(candidate[i].name)) == keccak256(abi.encodePacked(_username));
            }
        }
        return false;
    }

    // Recruiter login Validation
    function recruiterValidate(string memory _username,address _address) public view returns(bool){
        for(uint256 i=0;i<recruiter.length;i++){
            if(recruiter[i].add == _address){
                return keccak256(abi.encodePacked(recruiter[i].name)) == keccak256(abi.encodePacked(_username));
            }
        }
        return false;
    }

    // uploding the candidate document into this "userData[msg.sender]"
    function uplodeCandidateDocument(string memory _docName, string memory _docId) public{
        userData[msg.sender].push(document(_docName,_docId));
    }

    // storing user document hash into "VerifiedHash" with verification status false
    function documentPush(string memory _docName) public {
        uint k =0;
        for(uint256 i=0;i<userData[msg.sender].length;i++){
            if (keccak256(abi.encodePacked(userData[msg.sender][i].docName)) == keccak256(abi.encodePacked(_docName))){
                for(uint256 j=0; j<VerifiedHash.length; j++){
                    if(VerifiedHash[j].hashValue == keccak256(abi.encode(userData[msg.sender][i]))){
                        k =1;
                    }
                }
                if(k == 0){
                    VerifiedHash.push(verifyStat(keccak256(abi.encode(userData[msg.sender][i])),false));
                }
            }
        }
    }

    // owner document hash edhi use chesi push chestadu which is used for verification
    function hashArray(string memory _docName,string memory _docId) public ownerPower{
        document memory doc = document(_docName,_docId);
        arrHash.push(keccak256(abi.encode(doc)));
    }

    // Document verification of document pushed by user
    function hashVerify(bytes32 _hash) public {
        for(uint256 i=0;i<arrHash.length;i++){
            if(arrHash[i] == _hash){
                for(uint256 j=0; j<VerifiedHash.length; j++){
                    if(VerifiedHash[j].hashValue == _hash){
                        VerifiedHash[j].status = true;
                    }
                }
            }
        }
    }

    // owner login validation
    function ownerValidate(string memory _username,address _address) public view returns(bool){
        if(i_owner == _address){
            return keccak256(abi.encodePacked(i_ownerName)) == keccak256(abi.encodePacked(_username));
        }
        return false;
    }

    // user verified documents retrival
    function getVerifiedDocuments(address _address) public view returns (document[] memory) {
        document[] memory k = getArray(_address);
        document[] memory l = new document[](k.length);
        uint lIndex = 0;
        uint t = 0;
        for (uint i = 0; i < k.length; i++) {
            t =0;
            for (uint j = 0; j < VerifiedHash.length; j++) {
                if (VerifiedHash[j].hashValue == keccak256(abi.encode(k[i])) && VerifiedHash[j].status == true) {
                    t = 1;
                    break;
                }
            }
            if (t == 1) {
                    l[lIndex] = k[i];
                    lIndex++;
            }
        }
        assembly {
            mstore(l, lIndex)
        }
        return l;
    }

    // user documents which not verified retrival
    function getNonVerifiedDocuments(address _address) public view returns(document[] memory){
        document[] memory k = getArray(_address);
        document[] memory l = new document[](k.length);
        uint lIndex = 0;
        uint t;
        for (uint i = 0; i < k.length; i++) {
            t = 0;
            for (uint j = 0; j < VerifiedHash.length; j++) {
                if (VerifiedHash[j].hashValue == keccak256(abi.encode(k[i])) && VerifiedHash[j].status == true) {
                    t = 1;
                }
            }
            if (t == 0) {
                    l[lIndex] = k[i];
                    lIndex++;
            }
        }
        assembly {
            mstore(l, lIndex)
        }
        return l;
    }

    // user document which are pushed and not verified
    function getToBeVerified() public view returns(bytes32[] memory){
        bytes32[] memory l = new bytes32[](VerifiedHash.length);
        uint lIndex = 0;
        for (uint i = 0; i < VerifiedHash.length; i++) {
            if (!VerifiedHash[i].status) {
                    l[lIndex] = VerifiedHash[i].hashValue;
                    lIndex++;
            }
        }
        return l;
    }
    
    function getCandidate() public view returns(user[] memory){
        return candidate;
    }
    // function storePDF(string memory _ipfsHash) public {
    //     ipfsHash = _ipfsHash;
    // }
    
    // function getPDF() public view returns (string memory) {
    //     return ipfsHash;
    // }

    // ignore this
    modifier ownerPower(){
        if(msg.sender == i_owner){_;}
    }
}