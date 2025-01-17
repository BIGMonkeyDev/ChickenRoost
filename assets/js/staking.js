



const farms = [
    {
        index : 1,
        displayName: 'RWRDT/PLS v2',
        lpAbbreviation: 'LP ',
        poolId: 0,
        stakingToken: '0x6295D8d76BaE4a1c8449b666031F778549090a0f',
        liquidityLink: 'https://pulsex.mypinata.cloud/ipfs/bafybeidea3ibq4lu5t6vk6ihp4iuznjb3ltsdm5y2shv4atxgyd3d33aim/#/add/V2/0x898515c05794e195b4BA11c3e4e5A6d3c2a44FeC/PLS',
        depositFee: 1,
        withdrawFee: 1,
        poolWeight: 5,
        isActive: true,
        
    } ,

    

    {
        index : 2,
        displayName: 'PLSX',
        lpAbbreviation: 'REF',
        poolId: 1,
        stakingToken: '0x95b303987a60c71504d99aa1b13b4da07b0790ab',
        liquidityLink: 'https://pulsex.mypinata.cloud/ipfs/bafybeidea3ibq4lu5t6vk6ihp4iuznjb3ltsdm5y2shv4atxgyd3d33aim/#/?outputCurrency=0x6386704cD6f7A584EA9D23cccA66aF7EBA5a727e',
        depositFee: 1,
        withdrawFee: 1,
        poolWeight: 2,
        isActive: true,
       
    },

    

    {
        index : 3,
        displayName: 'Pdai',
        lpAbbreviation: 'REF',
        poolId: 2,
        stakingToken: '0x6b175474e89094c44da98b954eedeac495271d0f',
        liquidityLink: 'https://pulsex.mypinata.cloud/ipfs/bafybeidea3ibq4lu5t6vk6ihp4iuznjb3ltsdm5y2shv4atxgyd3d33aim/#/?outputCurrency=0x6386704cD6f7A584EA9D23cccA66aF7EBA5a727e',
        depositFee: 1,
        withdrawFee: 1,
        poolWeight: 2,
        isActive: true,
       
    },

    

    {
        index : 4,
        displayName: 'Shitty Bananas',
        lpAbbreviation: 'REF',
        poolId: 3,
        stakingToken: '0xc6b28b2e3bf9ff26299d540a4d654f7ade4dfdb0',
        liquidityLink: 'https://pulsex.mypinata.cloud/ipfs/bafybeidea3ibq4lu5t6vk6ihp4iuznjb3ltsdm5y2shv4atxgyd3d33aim/#/?outputCurrency=0x6386704cD6f7A584EA9D23cccA66aF7EBA5a727e',
        depositFee: 1,
        withdrawFee: 1,
        poolWeight: 2,
        isActive: true,
       
    }





]

var contract;
var tokenContract;

const MASTERCHEF_ADDRESS = "0xF477Ac6b3d93F782444f799eDedAB972d0F7d5DF";                //mainnet contract 

const FARM_TOKEN_ADDRESS = "0x34E76FA9cd853D185DfDB4770F96A059F328E5C0"; //Yield 

const DEAD_ADDRESS = "0x000000000000000000000000000000000000dEaD";



/*
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const DEAD_ADDRESS = "0x000000000000000000000000000000000000dEaD";
const FACTORY_PAIR_ADDRESS = "0x146E1f1e060e5b5016Db0D118D2C5a11A240ae32";
const LPAddress = '0x09d9589205f5bDCa717Ec887704fee309BcfD821'; 
                  '0x6295d8d76bae4a1c8449b666031f778549090a0f' new lp address v2
*/


var currentAddr = null;
var web3;
var spend;
var lastUpdate = new Date().getTime()


var started = true;
var canSell = true;

const ERC20Abi = [ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "getCirculatingSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" } ]

const MasterChefAbi = [ { "inputs": [ { "internalType": "uint256", "name": "_rewardsPerSec", "type": "uint256" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [ { "internalType": "address", "name": "target", "type": "address" } ], "name": "AddressEmptyCode", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "AddressInsufficientBalance", "type": "error" }, { "inputs": [], "name": "FailedInnerCall", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "token", "type": "address" } ], "name": "SafeERC20FailedOperation", "type": "error" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "lpToken", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "allocPoint", "type": "uint256" } ], "name": "Add", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "allocPoint", "type": "uint256" } ], "name": "AllocPointUpdated", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Deposit", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "EmergencyWithdraw", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "owner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "allocPoint", "type": "uint256" } ], "name": "Set", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "oldAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newAddress", "type": "address" } ], "name": "SetDevAddress", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_rewardsPerSec", "type": "uint256" } ], "name": "UpdateEmissionRate", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "pid", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "BONUS_MULTIPLIER", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "USDC", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WETH", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "contract IERC20", "name": "_lpToken", "type": "address" }, { "internalType": "uint16", "name": "_stakingFee", "type": "uint16" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" } ], "name": "add", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "adr", "type": "address" } ], "name": "authorize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" } ], "name": "calculateAPR", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "contract FarmToken", "name": "_farmToken", "type": "address" } ], "name": "changeYieldSource", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "deposit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "devAddress", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "contract IERC20", "name": "_newLpToken", "type": "address" } ], "name": "emergencyRealityCheck", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" } ], "name": "emergencyWithdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "farmToken", "outputs": [ { "internalType": "contract FarmToken", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getETHPriceInUSD", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getFarmTokenPriceInUSD", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "lpToken", "type": "address" } ], "name": "getLPTokenPriceInUSD", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getMarketCapInUSD", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_from", "type": "uint256" }, { "internalType": "uint256", "name": "_to", "type": "uint256" } ], "name": "getMultiplier", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" } ], "name": "getPendingRewardsInUSD", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" } ], "name": "getPoolTokenPriceInUSD", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "token", "type": "address" } ], "name": "getRegularTokenPriceInUSD", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" } ], "name": "getStakingFeeBP", "outputs": [ { "internalType": "uint16", "name": "", "type": "uint16" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" } ], "name": "getTotalStakedValueInUSD", "outputs": [ { "internalType": "uint256", "name": "totalValueInUSD", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getTotalValueLockedInUSD", "outputs": [ { "internalType": "uint256", "name": "totalValueLockedInUSD", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "user", "type": "address" } ], "name": "getUserAllowanceForPoolInUSD", "outputs": [ { "internalType": "uint256", "name": "allowance", "type": "uint256" }, { "internalType": "uint256", "name": "valueInUSD", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "user", "type": "address" } ], "name": "getUserBalanceForPoolInUSD", "outputs": [ { "internalType": "uint256", "name": "availableBalance", "type": "uint256" }, { "internalType": "uint256", "name": "valueInUSD", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "user", "type": "address" } ], "name": "getUserDepositedValueInUSD", "outputs": [ { "internalType": "uint256", "name": "availableBalance", "type": "uint256" }, { "internalType": "uint256", "name": "valueInUSD", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "adr", "type": "address" } ], "name": "isAuthorized", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "isOwner", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "lpTokenAdded", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "massUpdatePools", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" } ], "name": "pendingRewards", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "poolInfo", "outputs": [ { "internalType": "contract IERC20", "name": "lpToken", "type": "address" }, { "internalType": "uint256", "name": "allocPoint", "type": "uint256" }, { "internalType": "uint256", "name": "lastRewardTimestamp", "type": "uint256" }, { "internalType": "uint256", "name": "accRewardsPerShare", "type": "uint256" }, { "internalType": "uint16", "name": "stakingFee", "type": "uint16" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "poolLength", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_token", "type": "address" } ], "name": "recoverAbandonedTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "rewardsPerSec", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_feeCollector", "type": "address" }, { "internalType": "address", "name": "_servant", "type": "address" } ], "name": "setAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" } ], "name": "setAllocPoint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_devAddress", "type": "address" } ], "name": "setDevAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_servant", "type": "address" } ], "name": "setServant", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_feeCollector", "type": "address" } ], "name": "setTreasury", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "startTimestamp", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalAllocPoint", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address payable", "name": "adr", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "adr", "type": "address" } ], "name": "unauthorize", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "uniswapV2Router", "outputs": [ { "internalType": "contract IUniswapV2Router", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_rewardsPerSec", "type": "uint256" } ], "name": "updateEmissionRate", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" } ], "name": "updatePool", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_allocPoint", "type": "uint256" }, { "internalType": "uint16", "name": "_stakingFee", "type": "uint16" }, { "internalType": "bool", "name": "_withUpdate", "type": "bool" } ], "name": "updatePoolStats", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "address", "name": "", "type": "address" } ], "name": "userInfo", "outputs": [ { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "rewardDebt", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_pid", "type": "uint256" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" } ], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]

// Create a map of pool IDs to staking token addresses
const poolIdToTokenAddress = new Map(
    farms.map(farm => [farm.poolId, farm.stakingToken])
);



// Load contracts and initialize pools
// staking.js
function loadContracts() {
    return new Promise((resolve, reject) => {
        console.log('Loading contracts...');
        try {
            web3 = window.web3;
            contract = new web3.eth.Contract(MasterChefAbi, MASTERCHEF_ADDRESS);
            tokenContract = new web3.eth.Contract(ERC20Abi, FARM_TOKEN_ADDRESS);
            
            
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
        updateStakingFees();
        updateETHPrice();
        updateFarmTokenPrice();
        updateTotalStakedValueInUSD();
        updateTotalValueLockedInUSD();
        updateAPR();
        
    }

        

   

    contract.methods.getMarketCapInUSD().call().then(busd => {
        supply = busd;
        $("#market").html(`$${readableBUSD(busd, 2)}`)
    }).catch((err) => {
        console.log('market', err);
    });
    

    tokenContract.methods.totalSupply().call().then(busd => {
        supply = busd;
        $("#supply").html(`${readableBUSD(busd, 2)}`)
    }).catch((err) => {
        console.log('supply', err);
    });

    
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
        loginActions(accounts);
        updatePoolTokenPriceInUSD();

        updatePoolTokenPrice();
    
        updatePendingRewards();
    
        updateUserDepositedValueInUSD();
    
        updateUserBalanceForPool();
    
        updatePendingRewardsInUSD();
    
        
    
        updateUserAllowanceInUSD();
        
        
        
        
        }
            
        });
        return;
    }  
    
        
    
        



   
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


// CSS for styling
const styles = `
.staking-box {
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 10px 0;
    overflow: hidden;
}

.box-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #0fdb0f83;
}

.token-info {
    text-align: left;
    flex: 1; /* Adjust flex to allow this section to take up more space */
}

.token-name {
    font-weight: bold;
}

.box-content {
    padding: 10px;
    background-color: #0fdb0f83;
}

.staking-row {
    display: flex;
    flex-wrap: wrap; /* Ensure items wrap to the next line if there's not enough space */
    gap: 10px;
}

.approval, .deposits, .withdrawal, .earned {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    border: 1px solid transparent;
    border-radius: 8px;
    flex: 1; /* Allow each section to grow and fill available space */
    max-width: 300px; /* Set a max-width for uniform size */
    margin: 0 5px; /* Margin to separate the columns */
    
}

.approval div, .deposits div, .withdrawal div {
    margin: 1px 0;
}

.approval input, .deposits input, .withdrawal input {
    padding: 5px;
    width: 100%; /* Full width for inputs */
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 5px;
}

.button-row {
    display: flex;
    gap: 5px;
    width: 100%;
}

.approve-button, .deposit-button, .withdrawal-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
}

.earned {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    margin: 0 5px; /* Adjust margin to fit well with other sections */
}

.claim-button {
    background-color: #007bff; 
    color: white;
    cursor: pointer;
    margin-top: auto; /* Pushes button to the bottom */
    display: flex;
    justify-content: center;
}

.earnings-details {
    text-align: center;
    margin-bottom: 10px;
}

.wallet-balance-value, .approved-amount-value, .staked-amount-value {
    font-weight: bold;
}
`;

// Inject the styles into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);



// JavaScript function to create staking boxes
function createStakingBoxes() {
    farms.forEach((farm) => {
        const stakingBox = document.createElement('div');
        stakingBox.className = 'staking-box';
        stakingBox.setAttribute('data-pid', farm.poolId);
        stakingBox.setAttribute('id', `staking-box-${farm.poolId}`); // Add unique ID
    
        stakingBox.innerHTML = `
    
   
    <div class="">
   <div class="row">
    <div class="col-md-12">
        <div class="content-box stats-box">
            <h3 class="text-center busd pb-1" style="color:var(--token); letter-spacing: 2px; font-size: x-large; font-family: kanit !important; font-weight: 700;">
                <!-- Title or Icon Here -->
            </h3>
            
            <div class="row">
                <!-- Token Info -->
                <div class="col-md-12 col-lg-2 token-info">
                    <div class="token-name">${farm.displayName}</div>
                    <div>APR: <span class="apr-value">0</span></div>
                    <div>Liquidity: <span class="liquidity">0</span></div>
                    <div>In/Out Fee: <span class="fee-value"></span></div>
                </div>
                
                <!-- Earned -->
                <div class="col-md-12 col-lg-2 earned">
                    <div class="earnings-details">
                        <div>Earned:</div>
                        <div><span class="pending-rewards-value">0</span></div>
                        <div><span class="pending-value">$0 USD</span></div>
                        <div class="claim-button">
                            <button class="btn claim-button">Claim</button>
                        </div>
                    </div>
                </div>
                
                <!-- Approval -->
                <div class="col-md-12 col-lg-2 approval">
                    <div>Wallet Balance:</div>
                    <div><span class="user-balance-value">0</span></div> 
                    <div><span class="user-value-in-usd">0</span></div>
                    <input type="number" class="form-control approve-amount" placeholder="Amount">
                    <button class="btn btn-secondary approve-button">Approve</button>
                </div>
                
                <!-- Deposits -->
                <div class="col-md-12 col-lg-2 deposits">
                    <div>Approve Amount:</div>
                    <div><span class="approved-amount-value">0</span></div>
                    <div><span class="approved-amount-usd">0</span></div>
                    <input type="number" class="form-control deposit-amount" placeholder="Amount">
                    <button class="btn btn-secondary deposit-button">Deposit</button>
                </div>
                
                <!-- Withdrawal -->
                <div class="col-md-12 col-lg-2 withdrawal">
                    <div>Staked Amount:</div>
                    <div><span class="deposited-balance-value">0</span></div>
                    <div><span class="deposited-value-in-usd">0</span></div>
                    <input type="number" class="form-control withdrawal-amount" placeholder="Amount">
                    <button class="btn btn-danger withdrawal-button">Withdraw</button>
                </div>
            </div>
            
            <div class="box-content" style="display: none;">
                <!-- Remaining content here -->
            </div>
        </div>
    </div>
</div>

            
        


    
    `;
    document.querySelector('.container-fluid').appendChild(stakingBox);
       // Attach event listener to the container
       document.querySelector('.container-fluid').addEventListener('click', handleApproval);

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

// Other code such as function definitions and setup logic

async function updateStakingFees() {
    document.querySelectorAll('.staking-box').forEach(async (stakingBox) => {
        const poolId = parseInt(stakingBox.getAttribute('data-pid'), 10);

        if (isNaN(poolId)) {
            console.error(`Invalid poolId: ${poolId}`);
            return; // Exit if poolId is not valid
        }

        try {
            // Call the MasterChef contract to get the deposit fee basis points for the pool
            const depositFeeBP = await contract.methods.getStakingFeeBP(poolId).call();

            // Convert basis points to percentage
            const depositFeePercentage = depositFeeBP / 100;

            // Update the UI
            const depositFeeElement = stakingBox.querySelector('.fee-value');
            
            if (depositFeeElement) {
                depositFeeElement.textContent = `${depositFeePercentage}%`;
                console.log(`Updated deposit fee for pool ${poolId}: ${depositFeePercentage}%`);
            } else {
                console.error(`Deposit fee element not found for pool ${poolId}`);
            }
        } catch (error) {
            console.error(`Error Fetching Deposit Fee for pool ${poolId}:`, error);
        }
    });
}




// Function to handle pending rewards fetching
async function updatePendingRewards() {
    document.querySelectorAll('.staking-box').forEach(async (stakingBox) => {
        const poolId = parseInt(stakingBox.getAttribute('data-pid'), 10);
        const userAddress = (await web3.eth.getAccounts())[0];

        try {
            const rewards = await contract.methods.pendingRewards(poolId, userAddress).call();
            const formattedRewards = readableBUSD(rewards, 4); // Format with 4 decimal places

            // Update the UI with the pending rewards
            const rewardsElement = stakingBox.querySelector('.pending-rewards-value');
            if (rewardsElement) {
                rewardsElement.textContent = formattedRewards;
            }
        } catch (error) {
            console.error('Error Fetching Pending Rewards:', error);
        }
    });
}




// Function to update pool token price in USD
async function updatePoolTokenPriceInUSD() {
    document.querySelectorAll('.staking-box').forEach(async (stakingBox) => {
        const poolId = parseInt(stakingBox.getAttribute('data-pid'), 10);

        try {
            // Call the smart contract function
            const priceInUSD = await contract.methods.getPoolTokenPriceInUSD(poolId).call();

            // Format the price
            const formattedPriceInUSD = readableBUSD(priceInUSD, 2); // Format with 2 decimal places

            // Update the UI with the price
            const priceElement = stakingBox.querySelector('.price-in-usd');
            if (priceElement) {
                priceElement.textContent = `$${formattedPriceInUSD}`;
            }
        } catch (error) {
            console.error('Error Fetching Pool Token Price:', error);
        }
    });
}



async function updateFarmTokenPrice() {
    try {
        // Call the MasterChef contract to get the farm token price in USD
        const farmTokenPriceInUSD = await contract.methods.getFarmTokenPriceInUSD().call();

        // Format the price to a readable format
        const formattedPrice = readableBUSD(farmTokenPriceInUSD, 7); // Format with 2 decimal places

        // Update the UI with the farm token price
        const priceElement = document.getElementById('price');
        if (priceElement) {
            priceElement.textContent = `$${formattedPrice}`;
        }
    } catch (error) {
        console.error('Error Fetching Farm Token Price:', error);
    }
}





// Function to update ETH price in USD
async function updateETHPrice() {
    try {
        // Call the getETHPriceInUSD function from the MasterChef contract
        const ethPriceInUSD = await contract.methods.getETHPriceInUSD().call();

        // Format the price in USD (assuming 18 decimals)
        const formattedPrice = (ethPriceInUSD / 1e18).toFixed(2);

        // Update the UI with the price
        const priceElement = document.querySelector('.eth-price-value');
        if (priceElement) {
            priceElement.textContent = `$${formattedPrice}`;
        }
    } catch (error) {
        console.error('Error Fetching ETH Price:', error);
    }
}



// Function to update pool token price in USD
async function updatePoolTokenPrice() {
    document.querySelectorAll('.staking-box').forEach(async (stakingBox) => {
        const poolId = parseInt(stakingBox.getAttribute('data-pid'), 10);

        try {
            // Call the getPoolTokenPriceInUSD function from the MasterChef contract
            const poolTokenPriceInUSD = await contract.methods.getPoolTokenPriceInUSD(poolId).call();

            // Format the price in USD (assuming 18 decimals)
            const formattedPrice = (poolTokenPriceInUSD / 1e18).toFixed(2);

            // Update the UI with the price
            const priceElement = stakingBox.querySelector('.pool-token-price-value');
            if (priceElement) {
                priceElement.textContent = `$${formattedPrice}`;
            }
        } catch (error) {
            console.error('Error Fetching Pool Token Price:', error);
        }
    });
}



// Function to update user balance for pool in USD
async function updateUserBalanceForPool() {
    document.querySelectorAll('.staking-box').forEach(async (stakingBox) => {
        const poolId = parseInt(stakingBox.getAttribute('data-pid'), 10);
        const userAddress = (await web3.eth.getAccounts())[0];

        try {
            // Call the getUserBalanceForPoolInUSD function from the MasterChef contract
            const result = await contract.methods.getUserBalanceForPoolInUSD(poolId, userAddress).call();
            const availableBalance = result[0];
            const valueInUSD = result[1];

            // Format the values using readableBUSD
            const formattedBalance = readableBUSD(availableBalance, 4); // Format with 4 decimal places
            const formattedValueInUSD = readableBUSD(valueInUSD, 4); // Format with 4 decimal places

            // Update the UI with the balance and value in USD
            const balanceElement = stakingBox.querySelector('.user-balance-value');
            const valueElement = stakingBox.querySelector('.user-value-in-usd');

            if (balanceElement) {
                balanceElement.textContent = `${formattedBalance}`;
            }

            if (valueElement) {
                valueElement.textContent = `$${formattedValueInUSD}`;
            }
        } catch (error) {
            console.error('Error Fetching User Balance for Pool:', error);
        }
    });
}





// Function to update the user's allowance in USD for each pool
async function updateUserAllowanceInUSD() {
    const userAddress = (await web3.eth.getAccounts())[0];
    // Get the user's address

    document.querySelectorAll('.staking-box').forEach(async (stakingBox) => {
        const poolId = parseInt(stakingBox.getAttribute('data-pid'), 10);

        if (isNaN(poolId) || !web3.utils.isAddress(userAddress)) {
            console.error(`Invalid poolId: ${poolId} or userAddress: ${userAddress}`);
            return; // Exit if poolId or userAddress is not valid
        }

        try {
            // Call the smart contract to get the user's allowance in USD
            const { allowance, valueInUSD } = await contract.methods.getUserAllowanceForPoolInUSD(poolId, userAddress).call();

            // Log the raw allowance and USD value for debugging
            console.log(`Raw Allowance for pool ${poolId}: ${allowance}`);
            console.log(`Raw Value in USD for pool ${poolId}: ${valueInUSD}`);

            // Convert the values to readable USD format
            const formattedAllowance = readableBUSD(allowance, 4); // Convert allowance to readable USD
            const formattedValueInUSD = readableBUSD(valueInUSD, 4); // Convert valueInUSD to readable USD

            // Log the formatted values for debugging
            console.log(`Formatted Allowance for pool ${poolId}: ${formattedAllowance}`);
            console.log(`Formatted Value in USD for pool ${poolId}: ${formattedValueInUSD}`);

            // Update the UI
            const allowanceElement = stakingBox.querySelector('.approved-amount-value');
            const usdElement = stakingBox.querySelector('.approved-amount-usd'); // Make sure you have a corresponding element for USD

            // Log if the elements are found or not
            if (allowanceElement) {
                allowanceElement.textContent = formattedAllowance;
                console.log(`Updated Allowance for pool ${poolId}: ${formattedAllowance}`);
            } else {
                console.error(`Allowance element not found for pool ${poolId}`);
            }

            if (usdElement) {
                usdElement.textContent = `$${formattedValueInUSD} USD`;
                console.log(`Updated Allowance in USD for pool ${poolId}: $${formattedValueInUSD}`);
            } else {
                console.error(`USD element not found for pool ${poolId}`);
            }
        } catch (error) {
            console.error(`Error Fetching Allowance for pool ${poolId}:`, error);
        }
    });
}





// Function to update user deposited value in USD for each pool
async function updateUserDepositedValueInUSD() {
    document.querySelectorAll('.staking-box').forEach(async (stakingBox) => {
        const poolId = parseInt(stakingBox.getAttribute('data-pid'), 10);

        if (isNaN(poolId)) return; // Exit if poolId is not valid

        try {
            const userAddress = (await web3.eth.getAccounts())[0];
            
            // Call the MasterChef contract
            const depositedData = await contract.methods.getUserDepositedValueInUSD(poolId, userAddress).call();
            
            const availableBalance = depositedData[0];
            const valueInUSD = depositedData[1];

            // Format the values
            const formattedBalance = readableBUSD(availableBalance, 2);
            const formattedValueInUSD = readableBUSD(valueInUSD, 2);

            // Update the UI
            const balanceElement = stakingBox.querySelector('.deposited-balance-value');
            const valueElement = stakingBox.querySelector('.deposited-value-in-usd');

            if (balanceElement) {
                balanceElement.textContent = formattedBalance;
            }

            if (valueElement) {
                valueElement.textContent = `$${formattedValueInUSD}`;
            }
        } catch (error) {
            console.error('Error Fetching User Deposited Value in USD:', error);
        }
    });
}



// Function to update the total staked value in USD for each pool
async function updateTotalStakedValueInUSD() {
    document.querySelectorAll('.staking-box').forEach(async (stakingBox) => {
        const poolId = parseInt(stakingBox.getAttribute('data-pid'), 10);

        if (isNaN(poolId)) {
            console.error(`Invalid poolId: ${poolId}`);
            return; // Exit if poolId is not valid
        }

        try {
            // Call the smart contract to get the total staked value in USD for the pool
            const totalValueInUSD = await contract.methods.getTotalStakedValueInUSD(poolId).call();

            // Log the raw total value in USD for debugging
            console.log(`Raw Total Staked Value in USD for pool ${poolId}: ${totalValueInUSD}`);

            // Convert the value to readable USD format
            const formattedValueInUSD = readableBUSD(totalValueInUSD, 3); // Convert value to readable USD

            // Log the formatted value for debugging
            console.log(`Formatted Total Staked Value in USD for pool ${poolId}: ${formattedValueInUSD}`);

            // Update the UI
            const totalStakedElement = stakingBox.querySelector('.liquidity');

            // Log if the totalStakedElement is found or not
            if (totalStakedElement) {
                totalStakedElement.textContent = `$${formattedValueInUSD}`;
                console.log(`Updated Total Staked Value in USD for pool ${poolId}: $${formattedValueInUSD}`);
            } else {
                console.error(`Total Staked Value element not found for pool ${poolId}`);
            }
        } catch (error) {
            console.error(`Error Fetching Total Staked Value in USD for pool ${poolId}:`, error);
        }
    });
}



// Function to update the total value locked in USD across all pools
async function updateTotalValueLockedInUSD() {
    try {
        // Call the smart contract to get the total value locked in USD
        const totalValueLockedInUSD = await contract.methods.getTotalValueLockedInUSD().call();

        // Log the raw total value locked in USD for debugging
        console.log(`Raw Total Value Locked in USD: ${totalValueLockedInUSD}`);

        // Convert the value to readable USD format
        const formattedValueLockedInUSD = readableBUSD(totalValueLockedInUSD, 4); // Convert value to readable USD

        // Log the formatted value for debugging
        console.log(`Formatted Total Value Locked in USD: ${formattedValueLockedInUSD}`);

        // Update the UI
        const totalValueLockedElement = document.querySelector('#TVL');

        // Log if the totalValueLockedElement is found or not
        if (totalValueLockedElement) {
            totalValueLockedElement.textContent = `$${formattedValueLockedInUSD}`;
            console.log(`Updated Total Value Locked in USD: $${formattedValueLockedInUSD}`);
        } else {
            console.error(`Total Value Locked element not found`);
        }
    } catch (error) {
        console.error(`Error Fetching Total Value Locked in USD:`, error);
    }
}




// Function to update APR for each pool
async function updateAPR() {
    document.querySelectorAll('.staking-box').forEach(async (stakingBox) => {
        const poolId = parseInt(stakingBox.getAttribute('data-pid'), 10);

        if (isNaN(poolId)) {
            console.error(`Invalid poolId: ${poolId}`);
            return; // Exit if poolId is not valid
        }

        try {
            // Call the MasterChef contract to get the APR for the pool
            const apr = await contract.methods.calculateAPR(poolId).call();

            // Log the raw APR value for debugging
            console.log(`Raw APR value for pool ${poolId}: ${apr}`);

            // Since APR is typically given as a percentage, we directly format it to 2 decimal places
            const formattedAPR = parseFloat(apr).toFixed(2);

            // Log the formatted APR value for debugging
            console.log(`Formatted APR for pool ${poolId}: ${formattedAPR}`);

            // Update the UI
            const aprElement = stakingBox.querySelector('.apr-value');

            // Log if the aprElement is found or not
            if (aprElement) {
                aprElement.textContent = formattedAPR + '%';
                console.log(`Updated APR for pool ${poolId}: ${formattedAPR}%`);
            } else {
                console.error(`APR element not found for pool ${poolId}`);
            }
        } catch (error) {
            console.error(`Error Fetching APR for pool ${poolId}:`, error);
        }
    });
}



// Function to update pending rewards in USD for each pool
async function updatePendingRewardsInUSD() {
    document.querySelectorAll('.staking-box').forEach(async (stakingBox) => {
        const poolId = parseInt(stakingBox.getAttribute('data-pid'), 10);
        

        const userAddress = (await web3.eth.getAccounts())[0];

        try {
            // Call the MasterChef contract to get pending rewards in USD for the pool and user
            const pendingRewardsInUSD = await contract.methods.getPendingRewardsInUSD(poolId, userAddress).call();

            // Log the raw pending rewards in USD value for debugging
            console.log(`Pending Rewards in USD for pool ${poolId}: ${pendingRewardsInUSD}`);

            // Format the value as USD
            const formattedPendingRewardsInUSD = readableBUSD(pendingRewardsInUSD, 8);

            // Log the formatted pending rewards in USD for debugging
            console.log(`Formatted Pending Rewards in USD for pool ${poolId}: $${formattedPendingRewardsInUSD}`);

            // Update the UI
            const pendingRewardsElement = stakingBox.querySelector('.pending-value');

            // Log if the pendingRewardsElement is found or not
            if (pendingRewardsElement) {
                pendingRewardsElement.textContent = `$${formattedPendingRewardsInUSD}`;
                console.log(`Updated Pending Rewards in USD for pool ${poolId}: $${formattedPendingRewardsInUSD}`);
            } else {
                console.error(`Pending rewards element not found for pool ${poolId}`);
            }
        } catch (error) {
            console.error(`Error Fetching Pending Rewards in USD for pool ${poolId}:`, error);
        }
    });
}


window.addEventListener('load', () => {
    // Initial update when the page loads
    updateFarmTokenPrice();

    // Update deposit fees every 30 seconds
    setInterval(updateFarmTokenPrice, 30000);
});


window.addEventListener('load', () => {
    // Initial update when the page loads
    updateTotalStakedValueInUSD();

    // Update deposit fees every 30 seconds
    setInterval(updateTotalStakedValueInUSD, 30000);
});

window.addEventListener('load', () => {
    // Initial update when the page loads
    updateAPR();

    // Update deposit fees every 30 seconds
    setInterval(updateAPR, 30000);
});

window.addEventListener('load', () => {
    // Initial update when the page loads
    updateTotalValueLockedInUSD();

    // Update deposit fees every 30 seconds
    setInterval(updateTotalValueLockedInUSD, 30000);
});

window.addEventListener('load', () => {
    // Initial update when the page loads
    updatePoolTokenPriceInUSD();

    // Update deposit fees every 30 seconds
    setInterval(updatePoolTokenPriceInUSD, 30000);
});

window.addEventListener('load', () => {
    // Initial update when the page loads
    updatePoolTokenPrice();

    // Update deposit fees every 30 seconds
    setInterval(updatePoolTokenPrice, 30000);
});

window.addEventListener('load', () => {
    // Initial update when the page loads
    updatePendingRewards();

    // Update deposit fees every 30 seconds
    setInterval(updatePendingRewards, 30000);
});

window.addEventListener('load', () => {
    // Initial update when the page loads
    updateUserDepositedValueInUSD();

    // Update deposit fees every 30 seconds
    setInterval(updateUserDepositedValueInUSD, 30000);
});

window.addEventListener('load', () => {
    // Initial update when the page loads
    updateUserBalanceForPool();

    // Update deposit fees every 30 seconds
    setInterval(updateUserBalanceForPool, 30000);
});

window.addEventListener('load', () => {
    // Initial update when the page loads
    updatePendingRewardsInUSD();

    // Update deposit fees every 30 seconds
    setInterval(updatePendingRewardsInUSD, 30000);
});

window.addEventListener('load', () => {
    // Initial update when the page loads
    updateETHPrice();

    // Update deposit fees every 30 seconds
    setInterval(updateETHPrice, 30000);
});

window.addEventListener('load', () => {
    // Initial update when the page loads
    updateUserAllowanceInUSD();

    // Update deposit fees every 30 seconds
    setInterval(updateUserAllowanceInUSD, 30000);
});





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

async function withdrawTokens(event) {
    const stakingBox = event.target.closest('.staking-box');
    if (!stakingBox) return; // Exit if no valid staking box is found

    const poolId = parseInt(stakingBox.getAttribute('data-pid'), 10);
    let amount = stakingBox.querySelector('.withdrawal-amount').value; // Assuming there's an input field for the amount to withdraw

    try {
        const userAddress = (await web3.eth.getAccounts())[0];
        const masterChefContract = new web3.eth.Contract(MasterChefAbi, MASTERCHEF_ADDRESS);

        // If no amount is specified, fetch the user's staked amount
        if (!amount || amount === '0') {
            const userInfo = await masterChefContract.methods.userInfo(poolId, userAddress).call();
            amount = web3.utils.fromWei(userInfo.amount, 'ether'); // Convert staked amount from wei to ether
        }

        // Convert the amount to wei
        const amountInWei = web3.utils.toWei(amount, 'ether');

        // Call the withdraw function on the MasterChef contract
        await masterChefContract.methods.withdraw(poolId, amountInWei).send({ from: userAddress });

        console.log('Withdrawal Successful');
        alert('Withdrawal Successful');
        refreshData(); // Refresh the data to update UI
        
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




















    
    