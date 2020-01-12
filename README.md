![alt text](https://www.voetr.com/images/voetr_icon.png "voetr")
# voetr
## build empowerment
## change consensus
> pick your representatives, take control of your vote
> updates all bills, legislators, and votes on national, state, and local levels
![alt text](https://www.voetr.com/images/voetr-about.png "voetr")
> create coalitions and assert your political influence
> create the next wave of political influence

```
assert empowerment: create and vote on policy
```

> NOVO GOV
> create civic engagement ~ active creation of consensus based collective unity
> open data

![alt text](https://www.conex.us/images/conexus-black.png "conex.us")
## cre8coin
### peer setup procedure
```
// in "/path/to/folder" copy https://pastebin.com/JfQtY8hw as geneis.json 
geth --datadir="/path/to/folder" init genesis.json
geth --datadir="/path/to/folder" --networkid="88888888" console
admin.addPeer("enode://4c9ec1b929cb995a9fb174968c4fed4627cecdecfdde080af6a8fdbf9600062fbafc79ef4d92b3617b9e8d7b49bb1255e7066a27923f48ce81cfead8a61063f7@54.212.193.239:30302")
admin //to see if peers connected
miner.start(1)
```
[download](https://peer.cre8.xyz)

## ERC-888
[gist](https://gist.github.com/troverman/809dba32d8510e7713aaa5c869e607ae) | [EIP](https://github.com/ethereum/EIPs/issues/888)
> Token data-structures with balances specified by unique identifiers create emergent properties within cryptoeconomic systems that introduce valuable approaches to mechanism design and contract development.
```
contract MultidimensionalToken {
    mapping (address => mapping (string => uint)) balances;
    event Transfer(address indexed _from, address indexed _to, string indexed _id, uint256 _value);
    
    function balanceOf(address _owner, string _id) constant returns (uint256 balance) {
        return balances[_owner][_id];
    }

    function transfer(address _to, string _id, uint256 _value) returns (bool success) {
        if (balances[msg.sender][_id] >= _value && _value > 0) {
            balances[msg.sender][_id] -= _value;
            balances[_to][_id] += _value;
            Transfer(msg.sender, _to, _id, _value);
            return true;
        } 
        else {return false;}
    }
}
```

## API
### Filters
> Every endpoint can be filtered by each model param: {DESC, ASC}
```javascript
//req.params.query
var query = {
    limit: 10,
    skip: 10,
    sort: 'createdAt DESC', // modelParam | {'DESC', 'ASC'}
    filter:{
    	obj: param
    }
};
```

### Models | Endpoints
#### Bill
> This is the Bill Model
```javascript
var billModel = {

};
```
##### get /api/bill
##### post /api/bill

#### Member
> This is the Member Model
```javascript
var memberModel = {

};
```
##### get /api/member
##### post /api/member

#### Representative
> This is the Representative Model
```javascript
var representativeModel = {

};
```
##### get /api/representative
##### post /api/representative

#### Vote
> This is the Vote Model
```javascript
var voteModel = {

};
```
##### get /api/vote
##### post /api/vote
