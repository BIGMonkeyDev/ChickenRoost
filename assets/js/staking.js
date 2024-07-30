



const farms = [
    {
        index : 1,
        displayName: 'RWRDT/PLS v2',
        lpAbbreviation: 'LP ',
        poolId: 0,
        stakingToken: '0x09d9589205f5bDCa717Ec887704fee309BcfD821',
        liquidityLink: 'https://pulsex.mypinata.cloud/ipfs/bafybeidea3ibq4lu5t6vk6ihp4iuznjb3ltsdm5y2shv4atxgyd3d33aim/#/add/V2/0x898515c05794e195b4BA11c3e4e5A6d3c2a44FeC/PLS',
        depositFee: 1,
        withdrawFee: 1,
        poolWeight: 5,
        isActive: true,
        
    } ,

    

    {
        index : 2,
        displayName: 'Ref Token',
        lpAbbreviation: 'REF',
        poolId: 1,
        stakingToken: '0xd6E6d49D07A07c8fb25F4D6C320c525A23D711BD',
        liquidityLink: 'https://pulsex.mypinata.cloud/ipfs/bafybeidea3ibq4lu5t6vk6ihp4iuznjb3ltsdm5y2shv4atxgyd3d33aim/#/?outputCurrency=0x6386704cD6f7A584EA9D23cccA66aF7EBA5a727e',
        depositFee: 1,
        withdrawFee: 1,
        poolWeight: 2,
        isActive: true,
       
    }


]



const MASTERCHEF_ADDRESS = "0xa1A24A004a18b836833d8Af19BFa60Cd4a0d02D2";                //mainnet contract 
const NATIVE_TOKEN_ADDRESS = "0xA1077a294dDE1B09bB078844df40758a5D0f9a27"; //WPLS
const FARM_TOKEN_ADDRESS = "0x34E76FA9cd853D185DfDB4770F96A059F328E5C0"; //Yield 
const STABLECOIN_ADDRESS = "0xefD766cCb38EaF1dfd701853BFCe31359239F305"; //DAI
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const DEAD_ADDRESS = "0x000000000000000000000000000000000000dEaD";
const FACTORY_PAIR_ADDRESS = "0x146E1f1e060e5b5016Db0D118D2C5a11A240ae32";
const LPAddress = '0x09d9589205f5bDCa717Ec887704fee309BcfD821';

//PulseX V1
var PULSEX_V1_FACTORY_ADDRESS = "0x1715a3E4A142d8b698131108995174F37aEBA10D";
var PULSEX_V1_ROUTER_ADDRESS = "0x98bf93ebf5c380C0e6Ae8e192A7e2AE08edAcc02";

//PulseX V2
var PULSEX_V2_FACTORY_ADDRESS = "0x29ea7545def87022badc76323f373ea1e707c523";
var PULSEX_V2_ROUTER_ADDRESS = "0x165C3410fC91EF562C50559f7d2289fEbed552d9";


var currentAddr = null;
var web3;
var spend;
var lastUpdate = new Date().getTime()


var started = true;
var canSell = true;

const ERC20Abi = [ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getCirculatingSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" } ]

const MasterChefAbi = [ { "inputs": [ { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "contract IERC20", "name": "_lpToken", "type": "address" }, { "internalType": "uint16", "name": "_stakingFee", "type": "uint16" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" } ], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "contract FarmToken", "name": "_farmToken", "type": "address" }, { "internalType": "uint256", "name": "_rewardsPerSec", "type": "uint256" }, { "internalType": "uint256", "name": "_startTimestamp", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [ { "internalType": "address", "name": "target", "type": "address" } ], "name": "AddressEmptyCode", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "AddressInsufficientBalance", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "adr", "type": "address" } ], "name": "authorize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "contract FarmToken", "name": "_farmToken", "type": "address" } ], "name": "changeYieldSource", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "FailedInnerCall", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "token", "type": "address" } ], "name": "SafeERC20FailedOperation", "type": "error" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "lpToken", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "allocPoint", "type": "uint256" } ], "name": "Add", "type": "event" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Deposit", "type": "event" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "contract IERC20", "name": "_newLpToken", "type": "address" } ], "name": "emergencyRealityCheck", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" } ], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "EmergencyWithdraw", "type": "event" }, { "inputs": [], "name": "massUpdatePools", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "owner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "_token", "type": "address" } ], "name": "recoverAbandonedTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "allocPoint", "type": "uint256" } ], "name": "Set", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "_feeCollector", "type": "address" }, { "internalType": "address", "name": "_servant", "type": "address" } ], "name": "setAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_devAddress", "type": "address" } ], "name": "setDevAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "oldAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newAddress", "type": "address" } ], "name": "SetDevAddress", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "_servant", "type": "address" } ], "name": "setServant", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_feeCollector", "type": "address" } ], "name": "setTreasury", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "adr", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "adr", "type": "address" } ], "name": "unauthorize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_rewardsPerSec", "type": "uint256" } ], "name": "updateEmissionRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_rewardsPerSec", "type": "uint256" } ], "name": "UpdateEmissionRate", "type": "event" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" } ], "name": "updatePool", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "uint16", "name": "_stakingFee", "type": "uint16" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" } ], "name": "updatePoolStats", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "BONUS_MULTIPLIER", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "devAddress", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "farmToken", "outputs": [ { "internalType": "contract FarmToken", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_from", "type": "uint256" }, { "internalType": "uint256", "name": "_to", "type": "uint256" } ], "name": "getMultiplier", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "adr", "type": "address" } ], "name": "isAuthorized", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "isOwner", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "lpTokenAdded", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" } ], "name": "pendingRewards", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "poolInfo", "outputs": [ { "internalType": "contract IERC20", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardTimestamp", "type": "uint256" }, { "internalType": "uint256", "name": "accRewardsPerShare", "type": "uint256" }, { "internalType": "uint16", "name": "stakingFee", "type": "uint16" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolLength", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardsPerSec", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "startTimestamp", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalAllocPoint", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" } ], "name": "userInfo", "outputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]

const FactoryPairAbi = [{"type":"constructor","stateMutability":"nonpayable","payable":false,"inputs":[]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Burn","inputs":[{"type":"address","name":"sender","internalType":"address","indexed":true},{"type":"uint256","name":"amount0","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount1","internalType":"uint256","indexed":false},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"address","name":"senderOrigin","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Mint","inputs":[{"type":"address","name":"sender","internalType":"address","indexed":true},{"type":"uint256","name":"amount0","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount1","internalType":"uint256","indexed":false},{"type":"address","name":"senderOrigin","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Swap","inputs":[{"type":"address","name":"sender","internalType":"address","indexed":true},{"type":"uint256","name":"amount0In","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount1In","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount0Out","internalType":"uint256","indexed":false},{"type":"uint256","name":"amount1Out","internalType":"uint256","indexed":false},{"type":"address","name":"to","internalType":"address","indexed":true}],"anonymous":false},{"type":"event","name":"Sync","inputs":[{"type":"uint112","name":"reserve0","internalType":"uint112","indexed":false},{"type":"uint112","name":"reserve1","internalType":"uint112","indexed":false}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"DOMAIN_SEPARATOR","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"MINIMUM_LIQUIDITY","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"PERMIT_TYPEHASH","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"uint256","name":"amount0","internalType":"uint256"},{"type":"uint256","name":"amount1","internalType":"uint256"}],"name":"burn","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"address","name":"senderOrigin","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"address"}],"name":"factory","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint112","name":"_reserve0","internalType":"uint112"},{"type":"uint112","name":"_reserve1","internalType":"uint112"},{"type":"uint32","name":"_blockTimestampLast","internalType":"uint32"}],"name":"getReserves","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"initialize","inputs":[{"type":"address","name":"_token0","internalType":"address"},{"type":"address","name":"_token1","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"kLast","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"uint256","name":"liquidity","internalType":"uint256"}],"name":"mint","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"address","name":"senderOrigin","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"nonces","inputs":[{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"permit","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"price0CumulativeLast","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"price1CumulativeLast","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"skim","inputs":[{"type":"address","name":"to","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"swap","inputs":[{"type":"uint256","name":"amount0Out","internalType":"uint256"},{"type":"uint256","name":"amount1Out","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"bytes","name":"data","internalType":"bytes"}],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[],"name":"sync","inputs":[],"constant":false},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"address"}],"name":"token0","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"address","name":"","internalType":"address"}],"name":"token1","inputs":[],"constant":true},{"type":"function","stateMutability":"view","payable":false,"outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"}],"constant":false},{"type":"function","stateMutability":"nonpayable","payable":false,"outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"from","internalType":"address"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"value","internalType":"uint256"}],"constant":false}]

const FactoryAbi = [{"type":"constructor","inputs":[{"type":"address","name":"_feeToSetter","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"INIT_CODE_PAIR_HASH","inputs":[],"constant":true},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"allPairs","inputs":[{"type":"uint256","name":"","internalType":"uint256"}],"constant":true},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allPairsLength","inputs":[],"constant":true},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"address","name":"pair","internalType":"address"}],"name":"createPair","inputs":[{"type":"address","name":"tokenA","internalType":"address"},{"type":"address","name":"tokenB","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"feeTo","inputs":[],"constant":true},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"feeToSetter","inputs":[],"constant":true},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getPair","inputs":[{"type":"address","name":"","internalType":"address"},{"type":"address","name":"","internalType":"address"}],"constant":true},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setFeeTo","inputs":[{"type":"address","name":"_feeTo","internalType":"address"}],"constant":false},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setFeeToSetter","inputs":[{"type":"address","name":"_feeToSetter","internalType":"address"}],"constant":false},{"type":"event","name":"PairCreated","inputs":[{"type":"address","name":"token0","indexed":true},{"type":"address","name":"token1","indexed":true},{"type":"address","name":"pair","indexed":false},{"type":"uint256","name":"","indexed":false}],"anonymous":false}]

const RouterAbi = [{"type":"constructor","inputs":[{"type":"address","name":"_factory","internalType":"address"},{"type":"address","name":"_WPLS","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"WPLS","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountA","internalType":"uint256"},{"type":"uint256","name":"amountB","internalType":"uint256"},{"type":"uint256","name":"liquidity","internalType":"uint256"}],"name":"addLiquidity","inputs":[{"type":"address","name":"tokenA","internalType":"address"},{"type":"address","name":"tokenB","internalType":"address"},{"type":"uint256","name":"amountADesired","internalType":"uint256"},{"type":"uint256","name":"amountBDesired","internalType":"uint256"},{"type":"uint256","name":"amountAMin","internalType":"uint256"},{"type":"uint256","name":"amountBMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"payable","outputs":[{"type":"uint256","name":"amountToken","internalType":"uint256"},{"type":"uint256","name":"amountETH","internalType":"uint256"},{"type":"uint256","name":"liquidity","internalType":"uint256"}],"name":"addLiquidityETH","inputs":[{"type":"address","name":"token","internalType":"address"},{"type":"uint256","name":"amountTokenDesired","internalType":"uint256"},{"type":"uint256","name":"amountTokenMin","internalType":"uint256"},{"type":"uint256","name":"amountETHMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"factory","inputs":[]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"}],"name":"getAmountIn","inputs":[{"type":"uint256","name":"amountOut","internalType":"uint256"},{"type":"uint256","name":"reserveIn","internalType":"uint256"},{"type":"uint256","name":"reserveOut","internalType":"uint256"}]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"amountOut","internalType":"uint256"}],"name":"getAmountOut","inputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"},{"type":"uint256","name":"reserveIn","internalType":"uint256"},{"type":"uint256","name":"reserveOut","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"getAmountsIn","inputs":[{"type":"uint256","name":"amountOut","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"getAmountsOut","inputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"}]},{"type":"function","stateMutability":"pure","outputs":[{"type":"uint256","name":"amountB","internalType":"uint256"}],"name":"quote","inputs":[{"type":"uint256","name":"amountA","internalType":"uint256"},{"type":"uint256","name":"reserveA","internalType":"uint256"},{"type":"uint256","name":"reserveB","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountA","internalType":"uint256"},{"type":"uint256","name":"amountB","internalType":"uint256"}],"name":"removeLiquidity","inputs":[{"type":"address","name":"tokenA","internalType":"address"},{"type":"address","name":"tokenB","internalType":"address"},{"type":"uint256","name":"liquidity","internalType":"uint256"},{"type":"uint256","name":"amountAMin","internalType":"uint256"},{"type":"uint256","name":"amountBMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountToken","internalType":"uint256"},{"type":"uint256","name":"amountETH","internalType":"uint256"}],"name":"removeLiquidityETH","inputs":[{"type":"address","name":"token","internalType":"address"},{"type":"uint256","name":"liquidity","internalType":"uint256"},{"type":"uint256","name":"amountTokenMin","internalType":"uint256"},{"type":"uint256","name":"amountETHMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountETH","internalType":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","inputs":[{"type":"address","name":"token","internalType":"address"},{"type":"uint256","name":"liquidity","internalType":"uint256"},{"type":"uint256","name":"amountTokenMin","internalType":"uint256"},{"type":"uint256","name":"amountETHMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountToken","internalType":"uint256"},{"type":"uint256","name":"amountETH","internalType":"uint256"}],"name":"removeLiquidityETHWithPermit","inputs":[{"type":"address","name":"token","internalType":"address"},{"type":"uint256","name":"liquidity","internalType":"uint256"},{"type":"uint256","name":"amountTokenMin","internalType":"uint256"},{"type":"uint256","name":"amountETHMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"bool","name":"approveMax","internalType":"bool"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountETH","internalType":"uint256"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","inputs":[{"type":"address","name":"token","internalType":"address"},{"type":"uint256","name":"liquidity","internalType":"uint256"},{"type":"uint256","name":"amountTokenMin","internalType":"uint256"},{"type":"uint256","name":"amountETHMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"bool","name":"approveMax","internalType":"bool"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"amountA","internalType":"uint256"},{"type":"uint256","name":"amountB","internalType":"uint256"}],"name":"removeLiquidityWithPermit","inputs":[{"type":"address","name":"tokenA","internalType":"address"},{"type":"address","name":"tokenB","internalType":"address"},{"type":"uint256","name":"liquidity","internalType":"uint256"},{"type":"uint256","name":"amountAMin","internalType":"uint256"},{"type":"uint256","name":"amountBMin","internalType":"uint256"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"},{"type":"bool","name":"approveMax","internalType":"bool"},{"type":"uint8","name":"v","internalType":"uint8"},{"type":"bytes32","name":"r","internalType":"bytes32"},{"type":"bytes32","name":"s","internalType":"bytes32"}]},{"type":"function","stateMutability":"payable","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"swapETHForExactTokens","inputs":[{"type":"uint256","name":"amountOut","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"payable","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"swapExactETHForTokens","inputs":[{"type":"uint256","name":"amountOutMin","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"payable","outputs":[],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","inputs":[{"type":"uint256","name":"amountOutMin","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"swapExactTokensForETH","inputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"},{"type":"uint256","name":"amountOutMin","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","inputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"},{"type":"uint256","name":"amountOutMin","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"swapExactTokensForTokens","inputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"},{"type":"uint256","name":"amountOutMin","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","inputs":[{"type":"uint256","name":"amountIn","internalType":"uint256"},{"type":"uint256","name":"amountOutMin","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"swapTokensForExactETH","inputs":[{"type":"uint256","name":"amountOut","internalType":"uint256"},{"type":"uint256","name":"amountInMax","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256[]","name":"amounts","internalType":"uint256[]"}],"name":"swapTokensForExactTokens","inputs":[{"type":"uint256","name":"amountOut","internalType":"uint256"},{"type":"uint256","name":"amountInMax","internalType":"uint256"},{"type":"address[]","name":"path","internalType":"address[]"},{"type":"address","name":"to","internalType":"address"},{"type":"uint256","name":"deadline","internalType":"uint256"}]},{"type":"receive"}]




// Create a map of pool IDs to staking token addresses
const poolIdToTokenAddress = new Map(
    farms.map(farm => [farm.poolId, farm.stakingToken])
);




// Example usage in createStakingBoxes or elsewhere in your file

var contract;

// Load contracts and initialize pools
// staking.js
function loadContracts() {
    return new Promise((resolve, reject) => {
        console.log('Loading contracts...');
        try {
            web3 = window.web3;
            contract = new web3.eth.Contract(MasterChefAbi, MASTERCHEF_ADDRESS);
            tokenContract = new web3.eth.Contract(ERC20Abi, FARM_TOKEN_ADDRESS);
            farmLPPair = new web3.eth.Contract(FactoryPairAbi, LPAddress);
            mainLPPAir = new web3.eth.Contract(FactoryPairAbi, FACTORY_PAIR_ADDRESS);
            
            console.log('Done loading contracts.');
            resolve();
        } catch (error) {
            console.error('Error loading contracts:', error);
            reject(error);
        }
    });
}












async function myConnect() {
    var element = document.getElementById("dotting");
    element.classList.toggle("dot");
}

async function connect() {
    console.log('Connecting to wallet...')
    try {
        if (started) {
            $('#buy-eggs-btn').attr('disabled', false)
        }
        var accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        if (accounts.length == 0) {
            console.log('Please connect to MetaMask.');
            $('#enableMetamask').html('Connect')
        } else if (accounts[0] !== currentAddr) {
            loginActions(accounts);
        }
    } catch (err) {
        if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            alert('Please connect to MetaMask.');
        } else {
            console.error(err);
        }
        $('#enableMetamask').attr('disabled', false)
    }
}

function loginActions(accounts) {
    currentAddr = accounts[0];
    if (currentAddr !== null) {
        
        console.log('Wallet connected = ' + currentAddr);

        loadContracts();
        refreshData();

        let shortenedAccount = currentAddr.replace(currentAddr.substring(3, 39), "***");
        $('#enableMetamask').html(shortenedAccount);
    }
    $('#enableMetamask').attr('disabled', true);
}


async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        $('#enableMetamask').attr('disabled', false)
        if (window.ethereum.selectedAddress !== null) {
            await connect();
                setTimeout(function () {
                controlLoop()
                controlLoopFaster()
            }, 1000)
        }
    } else {
        $('#enableMetamask').attr('disabled', true)
    }
}

window.addEventListener('load', function () {
    setStartTimer();
    loadWeb3()
})

$('#enableMetamask').click(function () {
    connect()
});

function controlLoop() {
    refreshData()
    setTimeout(controlLoop, 25000)
}

function controlLoopFaster() {
    setTimeout(controlLoopFaster, 30)
}

function roundNum(num) {
    if (num == 0) { return 0};
    if (num < 1) {
        return parseFloat(num).toFixed(4)
    }
    return parseFloat(parseFloat(num).toFixed(2));
}








function refreshData() {
    console.log('Refreshing data...')
    if(!contract || !contract.methods){
        console.log('contract is not yet loaded')
        loadContracts()
        // return;// Call the function to populate the UI
        createStakingBoxes()

        updateWalletBalance();

        updateAllowance();

        updateStakedAmount();

        

        updateUI();
    }

    
    
    

    




    
    tokenContract.methods.getCirculatingSupply().call().then(busd => {
        supply = busd;
        $("#circulating").html(`${readableBUSD(busd, 2)}`)
    }).catch((err) => {
        console.log('circulating', err);
    });

    tokenContract.methods.balanceOf(DEAD_ADDRESS).call().then(userBalance => {
        let amt = web3.utils.fromWei(userBalance);
        usrBal = userBalance;
        $('#burned').html(roundNum(amt))
        // calcNumTokens(roundNum(amt)).then(usdValue => {
        //     $('#user-balance-usd').html(roundNum(usdValue))
        // })
    }).catch((err) => {
        console.log('balanceOf', err)
    });

  


        
        
    


    


        
  
        
    
    

	
    if(!currentAddr) {
        console.log('check if user is logged in');
        web3.eth.getAccounts(function(err, accounts){
            if (err != null) {
                console.error("An error occurred: "+err);
        }
            else if (accounts.length == 0) {
                console.log("User is not logged in to MetaMask");
            }
            else {console.log("User is logged in to MetaMask");
            loginActions(accounts);}
        });
        return;
    }  

// Other code such as function definitions and setup logic

// Function to handle balance fetching
async function updateWalletBalance() {
    document.querySelectorAll('.staking-box').forEach(async (stakingBox) => {
        const poolId = parseInt(stakingBox.getAttribute('data-pid'), 10);
        const stakingTokenAddress = poolIdToTokenAddress.get(poolId);

        if (!stakingTokenAddress) return; // Exit if no token address is found for the pool

        try {
            const userAddress = (await web3.eth.getAccounts())[0];
            const tokenCA = new web3.eth.Contract(ERC20Abi, stakingTokenAddress);
            
            // Get the balance of the user
            const balance = await tokenCA.methods.balanceOf(userAddress).call();
            const formattedBalance = readableBUSD(balance, 4); // Format with 4 decimal places

            // Update the UI with the balance
            const balanceElement = stakingBox.querySelector('.wallet-balance-value');
            if (balanceElement) {
                balanceElement.textContent = formattedBalance;
            }
        } catch (error) {
            console.error('Error Fetching Wallet Balance:', error);
        }
    });
}

// Ensure the wallet balance is updated periodically and on page load
window.addEventListener('load', () => {
    // Initial update when the page loads
    

    // Update wallet balance every 30 seconds
    setInterval(updateWalletBalance, 5000);
});

// Function to handle allowance fetching
async function updateAllowance() {
    document.querySelectorAll('.staking-box').forEach(async (stakingBox) => {
        const poolId = parseInt(stakingBox.getAttribute('data-pid'), 10);
        const stakingTokenAddress = poolIdToTokenAddress.get(poolId);

        if (!stakingTokenAddress) return; // Exit if no token address is found for the pool

        try {
            const userAddress = (await web3.eth.getAccounts())[0];
            const tokenCA = new web3.eth.Contract(ERC20Abi, stakingTokenAddress);
            
            // Get the allowance of the user for the MasterChef contract
            const allowance = await tokenCA.methods.allowance(userAddress, MASTERCHEF_ADDRESS).call();
            const formattedAllowance = readableBUSD(allowance, 4); // Format with 4 decimal places

            // Update the UI with the allowance
            const allowanceElement = stakingBox.querySelector('.approved-amount-value');
            if (allowanceElement) {
                allowanceElement.textContent = formattedAllowance;
            }
        } catch (error) {
            console.error('Error Fetching Allowance:', error);
        }
    });
}

// Ensure the allowance is updated periodically and on page load
window.addEventListener('load', () => {
    // Initial update when the page loads
    

    // Update allowance every 30 seconds
    setInterval(updateAllowance, 5000);
});

// Function to fetch the token price in USD
async function fetchTokenPrice() {
    try {
        // Fetch native token price
        const reserves = await mainLPPAir.methods.getReserves().call();
        const reserve0 = web3.utils.fromWei(reserves[0]);
        const reserve1 = web3.utils.fromWei(reserves[1]);

        // Assuming token0 is the native token
        const nativePriceInStable = reserve1 / reserve0;

        // Fetch farm token price using native token price
        const farmReserves = await farmLPPair.methods.getReserves().call();
        const farmReserve0 = web3.utils.fromWei(farmReserves[0]);
        const farmReserve1 = web3.utils.fromWei(farmReserves[1]);

        // Assuming farmReserve0 is the farm token
        const farmTokenPriceInNative = farmReserve1 / farmReserve0;
        const priceInUSD = farmTokenPriceInNative * nativePriceInStable;

        return priceInUSD;
    } catch (error) {
        console.error('Error fetching token price:', error);
        return 0; // Return 0 or handle the error appropriately
    }
}

// Function to get the total supply of the farm token
async function getTotalSupply() {
    try {
        // Fetch the total supply from the token contract
        const totalSupply = await tokenContract.methods.totalSupply().call();

        // Convert the total supply from wei to ether
        const formattedSupply = web3.utils.fromWei(totalSupply, 'ether');

        return parseFloat(formattedSupply); // Return as a number
    } catch (error) {
        console.error('Error fetching total supply:', error);
        return 0; // Return 0 or handle the error appropriately
    }
}

// Function to get the market cap of the farm token
async function getMarketCap() {
    try {
        const tokenPriceInUSD = await fetchTokenPrice();
        const totalSupply = await getTotalSupply();
        const marketCap = tokenPriceInUSD * totalSupply;

        return marketCap;
    } catch (error) {
        console.error('Error calculating market cap:', error);
        return 0; // Return 0 or handle the error appropriately
    }
}

// Function to handle pending rewards fetching and update UI
async function updatePendingRewards() {
    
    const stakingBoxes = document.querySelectorAll('.staking-box');

    for (const stakingBox of stakingBoxes) {
        const poolId = parseInt(stakingBox.getAttribute('data-pid'), 10);
        const userAddress = (await web3.eth.getAccounts())[0];
        const masterChefContract = new web3.eth.Contract(MasterChefAbi, MASTERCHEF_ADDRESS);

        try {
            const pendingRewards = await masterChefContract.methods.pendingRewards(poolId, userAddress).call();
            
            const formattedRewards = web3.utils.fromWei(pendingRewards, 'ether'); // Adjust the unit as needed
            const rewards = parseFloat(formattedRewards);

            

            const rewardsElement = stakingBox.querySelector('.earned-tokens');
            if (rewardsElement) {
                rewardsElement.textContent = rewards.toFixed(4); // Round to 4 decimals
            }
        } catch (error) {
            console.error('Error Fetching Pending Rewards:', error);
        }
    }

    
}

// Function to get user's pending rewards in USD
async function getPendingRewardsInUSD() {
    try {
        const tokenPriceInUSD = await fetchTokenPrice();
        const reward = await updatePendingRewards(); // Fetch rewards and their USD value
        const rewardsInUSD = tokenPriceInUSD * reward;
        return rewardsInUSD;
    } catch (error) {
        console.error('Error fetching pending rewards in USD:', error);
        return 0; // Return 0 or handle the error appropriately
    }
}

// Function to handle staked amount fetching and update UI
async function updateStakedAmount() {
    document.querySelectorAll('.staking-box').forEach(async (stakingBox) => {
        const poolId = parseInt(stakingBox.getAttribute('data-pid'), 10);
        const stakingTokenAddress = poolIdToTokenAddress.get(poolId);

        if (!stakingTokenAddress) return; // Exit if no token address is found for the pool

        try {
            const userAddress = (await web3.eth.getAccounts())[0];
            const masterChefContract = new web3.eth.Contract(MasterChefAbi, MASTERCHEF_ADDRESS);

            // Get the staked amount of the user in the given pool
            const userInfo = await masterChefContract.methods.userInfo(poolId, userAddress).call();
            const stakedAmount = userInfo.amount; // Adjust if the structure of `userInfo` is different
            const formattedStakedAmount = readableBUSD(stakedAmount, 4); // Format with 4 decimal places

            // Update the UI with the staked amount
            const stakedAmountElement = stakingBox.querySelector('.staked-amount-value');
            if (stakedAmountElement) {
                stakedAmountElement.textContent = formattedStakedAmount;
            }
        } catch (error) {
            console.error('Error Fetching Staked Amount:', error);
        }
    });
}



// Function to update the UI with price, market cap, rewards, and staked amounts
async function updateUI() {
    try {
        const tokenPriceInUSD = await fetchTokenPrice();
        const marketCap = await getMarketCap();
        const rewardsInUSD = await getPendingRewardsInUSD(); // Get pending rewards in USD
        const totalSupply = await getTotalSupply();

        $('#price').html(`$${tokenPriceInUSD.toFixed(6)}`);
        $('#market').html(`$${marketCap.toFixed(2)}`);
        $('#token-usd').html(`$${rewardsInUSD.toFixed(8)}`);
        $('#supply').html(`${totalSupply.toFixed(2)}`);

        await updateStakedAmount(); // Update staked amount
    } catch (error) {
        console.error('Error updating UI:', error);
    }
}

// Periodically refresh the price, market cap, rewards, and staked amounts
window.addEventListener('load', () => {
    

    setInterval(updateUI, 1000); // Update every 30 seconds
});













   
    console.log('Done refreshing data...')
}








var startTimeInterval;
function setStartTimer() {
    var endDate = new Date().getTime();

    clearInterval(startTimeInterval)
    startTimeInterval = setInterval(function() {
        var currTime = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = endDate - currTime;
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	
	if (days < 10) { days = '0' + days; }
        if (hours < 10) { hours = '0' + hours; }
        if (minutes < 10) { minutes = '0' + minutes; }
        if (seconds < 10) { seconds = '0' + seconds; }

        $("#start-timer").html(`${days}d:${hours}h:${minutes}m:${seconds}s`);

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(startTimeInterval);
            $("#start-container").remove();
            
            started = true;
            refreshData()
        }
    }, 1000, 1);
}

 

// Utility function to convert amount from wei to a readable format
function readableBUSD(amount, decimals = 18) {
    return (amount / 1e18).toFixed(decimals);
}


function createStakingBoxes() {
    farms.forEach((farm, index) => {
        const stakingBox = document.createElement('div');
        stakingBox.className = 'staking-box';
        stakingBox.setAttribute('data-pid', farm.poolId);
        stakingBox.setAttribute('id', `staking-box-${farm.poolId}`); // Add unique ID
    
        stakingBox.innerHTML = `
    <div class="box-header d-flex">
    <div class="token-info">
        <p class="token-name">${farm.displayName}</p>
        <p>APR: ${farm.depositFee}%</p>
        <p>Liquidity: $${farm.liquidity}</p>
        <p>In/Out Fee: ${farm.depositFee + farm.withdrawFee}%</p>
    </div>
    <div class="earned rounded-box">
        <div class="earnings-details">
            <p>Earned:</p>
            <p><span class="earned-tokens">0</span></p>
            
            <p><span class="token-usd">$0 USD</span></p>
        
        <div class="claim-button">
            <button class="btn btn-primary claim-button">Claim</button>
        </div>
    </div>
</div>

    <div class="approval">
        <p>Wallet Balance:</p>
        <p><span class="wallet-balance-value">0</span></p>    
        <input type="number" class="form-control approve-amount" placeholder="Amount">
        <button class="btn btn-secondary approve-button">Approve</button>
    </div>


    <div class="deposits">
    <p>Approve Amount:</p>
    <p><span class="approved-amount-value">0</span></p>
    <input type="number" class="form-control deposit-amount" placeholder="Amount">
    <button class="btn btn-success deposit-button">Deposit</button>
</div>

    <div class="withdrawal">
    <p>Staked Amount:</p>
    <p><span class="staked-amount-value">0</span></p>
    <input type="number" class="form-control withdrawal-amount" placeholder="Amount">
    <button class="btn btn-danger withdrawal-button">Withdraw</button>
</div>

<div class="box-content" style="display: none;">
    <!-- Remaining content here -->
</div>







`;

// CSS for styling
const styles = `
/* General styles for staking box */
.box-header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #0fdb0f83; /* Assuming background color for visibility */
}

/* Token info styles */
.token-info {
    display: flex;
    flex-direction: column;
}

/* Container styles for each section */
.container {
    flex: 1;
    border-radius: 8px;
    padding: 10px;
    margin: 0 5px; /* Adjust margin to ensure spacing between containers */
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-align: center;
    box-sizing: border-box;
}

/* Specific container adjustments */
.earned, .approval, .deposits, .withdrawal {
    flex: 1;
    max-width: 200px; /* Set a max-width to ensure containers are of uniform size */
}

/* Earned container styles */
.earned {
    height: auto; /* Auto height based on content */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
}

.earnings-details {
    text-align: center;
    margin: 0; /* Remove any default margin */
}

.earnings-details p {
    margin: 5px 0; /* Adjust margin between paragraphs */
}

.claim-button {
    margin-top: auto; /* Pushes button to the bottom */
}

/* Approval container styles */
.approval {
    border: none; /* Remove border */
    padding: 10px;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-align: center;
}

.approval p {
    margin: 0;
}

.wallet-balance-value {
    font-weight: bold;
}

.approve-amount {
    margin-top: 5px;
    width: 100%;
}

.approve-button {
    margin-top: 10px;
}

/* Deposits container styles */
.deposits {
    border: none; /* Remove border */
    padding: 10px;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-align: center;
}

.deposits p {
    margin: 0;
}

.approved-amount-value {
    font-weight: bold;
}

.deposit-amount {
    margin-top: 5px;
    width: 100%;
}

.deposit-button {
    margin-top: 10px;
}

/* Withdrawal container styles */
.withdrawal {
    border: none; /* Remove border */
    padding: 10px;
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    text-align: center;
}

.withdrawal p {
    margin: 0;
}

.staked-amount-value {
    font-weight: bold;
}

.withdrawal-amount {
    margin-top: 5px;
    width: 100%;
}

.withdrawal-button {
    margin-top: 10px;
}

/* Flex container adjustments */
.staking-row {
    display: flex;
    gap: 10px; /* Adjust spacing as needed */
}










`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);





    
    
        document.querySelector('.staking-container').appendChild(stakingBox);
    
        // Attach event listener to the container
        document.querySelector('.staking-container').addEventListener('click', handleApproval);

        // Add event listeners to call the function when the deposit button is clicked
         document.querySelectorAll('.deposit-button').forEach(button => {
         button.addEventListener('click', handleDeposit);

            // Add event listeners to the withdraw buttons
          document.querySelectorAll('.withdrawal-button').forEach(button => {
        button.addEventListener('click', withdrawTokens);

        

          // Add event listeners to the claim buttons
        document.querySelector('.claim-button').addEventListener('click', claimRewards);
        


    });
    });
    
      });

      
    

}



        






        
    


// Function to handle approval
async function handleApproval(event) {
    const button = event.target;
    if (!button.classList.contains('approve-button')) return; // Check if the clicked element is an approve button

    const stakingBox = button.closest('.staking-box');
    if (!stakingBox) return; // Exit if no valid staking box is found

    const poolId = parseInt(stakingBox.getAttribute('data-pid'), 10);
    const stakingTokenAddress = poolIdToTokenAddress.get(poolId);
    const inputAmount = stakingBox.querySelector('.approve-amount').value; // Get the input amount

    console.log(`Approve clicked for pool ID: ${poolId}`);
    console.log(`Token Address: ${stakingTokenAddress}`);
    console.log(`Input Amount: ${inputAmount}`);

    if (stakingTokenAddress && inputAmount > 0) {
        try {
            const userAddress = (await web3.eth.getAccounts())[0];
            const amountToAllow = web3.utils.toWei(inputAmount, 'ether');
            const depositToken = new web3.eth.Contract(ERC20Abi, stakingTokenAddress);

            console.log(`Initiating approval for pool ID: ${poolId}`);
            const { transactionHash } = await depositToken.methods.approve(MASTERCHEF_ADDRESS, amountToAllow).send({ from: userAddress });

            // Poll for transaction receipt
            let receipt = null;
            while (receipt === null) {
                receipt = await web3.eth.getTransactionReceipt(transactionHash);
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before polling again
            }

            console.log('Allowance Increased!');
            refreshData();
        } catch (error) {
            console.error('Error Approving Spending:', error);
        }
    }
}


// Function to handle deposit
async function handleDeposit(event) {
    const button = event.target;
    if (!button.classList.contains('deposit-button')) return; // Check if the clicked element is a deposit button

    const stakingBox = button.closest('.staking-box');
    if (!stakingBox) return; // Exit if no valid staking box is found

    const poolId = parseInt(stakingBox.getAttribute('data-pid'), 10);
    const inputAmount = stakingBox.querySelector('.deposit-amount').value; // Get the input amount

    console.log(`Deposit clicked for pool ID: ${poolId}`);
    console.log(`Input Amount: ${inputAmount}`);

    if (inputAmount > 0) {
        try {
            const userAddress = (await web3.eth.getAccounts())[0];
            const amountToDeposit = web3.utils.toWei(inputAmount, 'ether'); // Convert amount to wei
            const masterChef = new web3.eth.Contract(MasterChefAbi, MASTERCHEF_ADDRESS);

            console.log(`Initiating deposit for pool ID: ${poolId}`);
            const { transactionHash } = await masterChef.methods.deposit(poolId, amountToDeposit).send({ from: userAddress });

            // Poll for transaction receipt
            let receipt = null;
            while (receipt === null) {
                receipt = await web3.eth.getTransactionReceipt(transactionHash);
                await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before polling again
            }

            console.log('Deposit Successful!');
            refreshData(); // Refresh the data to update UI
        } catch (error) {
            console.error('Error Depositing:', error);
        }
    }
}

// Function to handle the withdrawal of staked tokens
async function withdrawTokens(event) {
    const stakingBox = event.target.closest('.staking-box');
    if (!stakingBox) return; // Exit if no valid staking box is found

    const poolId = parseInt(stakingBox.getAttribute('data-pid'), 10);
    const amount = stakingBox.querySelector('.withdrawal-amount').value; // Assuming there's an input field for the amount to withdraw
    if (!amount) return; // Exit if no amount is specified

    try {
        const userAddress = (await web3.eth.getAccounts())[0];
        const masterChefContract = new web3.eth.Contract(MasterChefAbi, MASTERCHEF_ADDRESS);

        // Convert the amount to wei
        const amountInWei = web3.utils.toWei(amount, 'ether');

        // Call the withdraw function on the MasterChef contract
        await masterChefContract.methods.withdraw(poolId, amountInWei).send({ from: userAddress });

        console.log('Withdrawal Successful');
        alert('Withdrawal Successful');

        // Update the UI after the withdrawal
        updateStakedAmount();
        updateWalletBalance();
        updatePendingRewards();
    } catch (error) {
        console.error('Error Withdrawing Tokens:', error);
        alert('Error Withdrawing Tokens');
    }
}


// Function to handle claim rewards
async function claimRewards(event) {
    const button = event.target;
    if (!button.classList.contains('claim-button')) return; // Check if the clicked element is a claim button

    const stakingBox = button.closest('.staking-box');
    if (!stakingBox) return; // Exit if no valid staking box is found

    const poolId = parseInt(stakingBox.getAttribute('data-pid'), 10);

    console.log(`Claim clicked for pool ID: ${poolId}`);

    try {
        const userAddress = (await web3.eth.getAccounts())[0];
        const masterChef = new web3.eth.Contract(MasterChefAbi, MASTERCHEF_ADDRESS);

        console.log(`Initiating claim for pool ID: ${poolId}`);
        const { transactionHash } = await masterChef.methods.deposit(poolId, 0).send({ from: userAddress });

        // Poll for transaction receipt
        let receipt = null;
        while (receipt === null) {
            receipt = await web3.eth.getTransactionReceipt(transactionHash);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before polling again
        }

        console.log('Claim Successful!');
        refreshData(); // Refresh the data to update UI
    } catch (error) {
        console.error('Error Claiming Rewards:', error);
    }
}

















    
    