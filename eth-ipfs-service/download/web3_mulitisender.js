
//1.建立连接
var Web3 = require('web3');
let web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/b53f4131a6bf44b6ace760bb97c3e98d"));
    //console.log("-1-host of the provider is : \n    ",  web3.currentProvider.host);
}


//2.CPB.approve :
//注意：CPB有一个enableTransfer开关，一定要打开之后才能交易
//let addressCPB = "0xd9808cbFf1C95917848CE77feA70DdF0e7000ACb";
//let abiCPB =[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"transferable","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"frozenAccount","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"CPBWallet","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"target","type":"address"},{"name":"freeze","type":"bool"}],"name":"freezeAccount","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"enableTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_CPBWallet","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"target","type":"address"},{"indexed":false,"name":"frozen","type":"bool"}],"name":"FrozenFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"}],"name":"OwnershipRenounced","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"burner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];
//let CPB = new web3.eth.Contract(abiCPB, addressCPB);

let approveCPB = async function() {

    //1.输出账户 nounce
    let nounce_;
    await web3.eth.getTransactionCount("0xb445c062dd13352dd434a1820aba76f90ac8ad1e", function(err, noun){
        nounce_ =  web3.utils.toHex(noun).toString('hex'); 
    });
    //console.log("-2-nounce of this account is:\n    ",nounce_);

    //2.获取 function signature
    let funcsig = web3.eth.abi.encodeFunctionSignature('approve(address,uint256)');
    //console.log("-3-the sig of function is : \n    ", funcsig);

    //3.离线签名一个交易
    var Tx = require('ethereumjs-tx');
    var privateKey = new Buffer('CED3BDAE48F6D798CE425C01F1457117A7E967559E997D0D81D9500BE3254903', 'hex')

    var rawTx = {
        nonce: nounce_,
        gasPrice: '0x2540be400',
        gasLimit: '0x274820',
        from: '0xb445c062dd13352dd434a1820aba76f90ac8ad1e', //from 
        to: '0xd9808cbFf1C95917848CE77feA70DdF0e7000ACb',   //合约地址
        value: '0x00',
        //data: '0x095ea7b300000000000000000000000016Ad85F0F451F374C70a0dA773200537C1924bE70000000000000000000000000000000000000000000000000000000000000064'   
        //data: '0x095ea7b30000000000000000000000008b2B8d3af1BBb63c77B186751dB7d5b957E62c680000000000000000000000000000000000000000000000000000000000000064'
        data:'0x095ea7b300000000000000000000000072aC464BD67F9598fCd4Bc2E9039112Ccb14CE770000000000000000000000000000000000000000000000000000000000000064'
    }

    var tx = new Tx(rawTx);
    tx.sign(privateKey);

    var serializedTx = tx.serialize();

    //4.将签名的交易发送出去
    await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
        if (err) {
            console.log(err);
        }else{
            console.log("-7-hash of this TX is :\n   ", hash);
        }
    });

}

//approveCPB();

//3 CPB.enableTransfer
let enableTransfer = async function(){
    //1.输出账户 nounce
    let nounce_;
    await web3.eth.getTransactionCount("0xb445c062dd13352dd434a1820aba76f90ac8ad1e", function(err, noun){
        nounce_ =  web3.utils.toHex(noun).toString('hex'); 
    });    

    //2.获取 function signature
    let funcsig = web3.eth.abi.encodeFunctionSignature('enableTransfer()');
    //console.log("-3-the sig of function is : \n    ", funcsig);

    //3.离线签名一个交易
    var Tx = require('ethereumjs-tx');
    var privateKey = new Buffer('CED3BDAE48F6D798CE425C01F1457117A7E967559E997D0D81D9500BE3254903', 'hex')

    var rawTx = {
        nonce: nounce_,
        gasPrice: '0x3b9aca00',    //1 gwei
        gasLimit: '0x2dc6c0',   //300万
        from: '0xb445c062dd13352dd434a1820aba76f90ac8ad1e', //from 
        to: '0xd9808cbFf1C95917848CE77feA70DdF0e7000ACb',   //合约地址:CPB.enableTransfer
        value: '0x00',
        data: '0xf1b50c1d'
    }

    var tx = new Tx(rawTx);
    tx.sign(privateKey);

    var serializedTx = tx.serialize();

    //4.将签名的交易发送出去
    await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
        if (err) {
            console.log(err);
        }else{
            console.log("-5-hash of this TX is :\n   ", hash);
        }
    });

}

//enableTransfer();



/**
 * 4.与msend_address （采用tokenaddress.call("transferFrom")方法）合约交互（这个合约用的时候报错:原因是 enableTransfer没有打开）
 * 另外：连接ropsten测试网，因为没有本地节点，与合约交互只能够采用发送原始交易的方法，所以下面这种获取合约实例的过程不需要了
 *let addressMultisend = "0x8b2B8d3af1BBb63c77B186751dB7d5b957E62c68";
 *let abiMultisend = [ { "constant": false, "inputs": [ { "name": "_to", "type": "address[]" }, { "name": "_value", "type": "uint256[]" } ], "name": "coinSendDifferentValue", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "_tokenAddress", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address[]" }, { "name": "_value", "type": "uint256" } ], "name": "coinSendSameValue", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "token", "type": "address" }, { "indexed": false, "name": "total", "type": "uint256" } ], "name": "TokenMultiSent", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "token", "type": "address" }, { "indexed": false, "name": "receiver", "type": "address" }, { "indexed": false, "name": "balance", "type": "uint256" } ], "name": "GetToken", "type": "event" } ];
 *let multisend = new web3.eth.Contract(abiMultisend, addressMultisend);
*/
let multisendToken = async function(){
    //1.输出账户 nounce
    let nounce_;
    await web3.eth.getTransactionCount("0xb445c062dd13352dd434a1820aba76f90ac8ad1e", function(err, noun){
        nounce_ =  web3.utils.toHex(noun).toString('hex'); 
    });
    //console.log("-2-nounce of this account is:\n    ",nounce_);

    //2.获取 function signature
    let funcsig = web3.eth.abi.encodeFunctionSignature('coinSendSameValue(address[],uint256)');
    //console.log("-3-the sig of function is : \n    ", funcsig);

    //3.获取函数参数的ABI编码
    //注意，数组类型作为函数参数的时候 [] 外面没有引号
    let paraAbi = web3.eth.abi.encodeParameter("address[]", ["0x6eee169148521be772bccc986ed7c36c39d9bf25"]);
    //console.log("-4-paramater encodeing :\n    ", paraAbi);

    //3.离线签名一个交易
    var Tx = require('ethereumjs-tx');
    var privateKey = new Buffer('CED3BDAE48F6D798CE425C01F1457117A7E967559E997D0D81D9500BE3254903', 'hex')

    var rawTx = {
        nonce: nounce_,
        gasPrice: '0x3b9aca00',    //1 gwei
        gasLimit: '0x2dc6c0',   //300万
        from: '0xb445c062dd13352dd434a1820aba76f90ac8ad1e', //from 
        to: '0x8b2B8d3af1BBb63c77B186751dB7d5b957E62c68',   //合约地址
        value: '0x00',
        data: '0x73eef753000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000006eee169148521be772bccc986ed7c36c39d9bf250000000000000000000000000000000000000000000000000000000000000005'   
    }

    var tx = new Tx(rawTx);
    tx.sign(privateKey);

    var serializedTx = tx.serialize();

    //4.将签名的交易发送出去
    await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
        if (err) {
            console.log(err);
        }else{
            console.log("-5-hash of this TX is :\n   ", hash);
        }
    });
}
//multisendToken();


//5.与multisend合约交互（采用token.transferFrom + token.transfer ）（这个合约用的时候报错:原因是没有打开代币 的 enableTransfer）
//let addressMultisend = "0x16Ad85F0F451F374C70a0dA773200537C1924bE7";
//let abiMultisend = [{"constant":false,"inputs":[{"name":"_to","type":"address[]"},{"name":"_value","type":"uint256[]"}],"name":"coinSendDifferentValue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"_tokenAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address[]"},{"name":"_value","type":"uint256"}],"name":"coinSendSameValue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"total","type":"uint256"}],"name":"TokenMultiSent","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"receiver","type":"address"},{"indexed":false,"name":"balance","type":"uint256"}],"name":"GetToken","type":"event"}];
//let multisend = new web3.eth.Contract(abiMultisend, addressMultisend);

let multisendToken1 = async function(){
    //1.输出账户 nounce
    let nounce_;
    await web3.eth.getTransactionCount("0xb445c062dd13352dd434a1820aba76f90ac8ad1e", function(err, noun){
        nounce_ =  web3.utils.toHex(noun).toString('hex'); 
    });
    //console.log("-2-nounce of this account is:\n    ",nounce_);

    //2.获取 function signature
    let funcsig = web3.eth.abi.encodeFunctionSignature('coinSendSameValue(address[],uint256)');
    //console.log("-3-the sig of function is : \n    ", funcsig);

    //3.获取函数参数的ABI编码
    //注意，数组类型作为函数参数的时候 [] 外面没有引号
    let paraAbi = web3.eth.abi.encodeParameter("address[]", ["0x6eee169148521be772bccc986ed7c36c39d9bf25"]);
    //console.log("-4-paramater encodeing :\n    ", paraAbi);

    //3.离线签名一个交易
    var Tx = require('ethereumjs-tx');
    var privateKey = new Buffer('CED3BDAE48F6D798CE425C01F1457117A7E967559E997D0D81D9500BE3254903', 'hex')

    var rawTx = {
        nonce: nounce_,
        gasPrice: '0x3b9aca00',    //1 gwei
        gasLimit: '0x2dc6c0',   //300万
        from: '0xb445c062dd13352dd434a1820aba76f90ac8ad1e', //from 
        to: '0x16Ad85F0F451F374C70a0dA773200537C1924bE7',   //合约地址
        value: '0x00',
        data: '0x73eef753000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000006eee169148521be772bccc986ed7c36c39d9bf250000000000000000000000000000000000000000000000000000000000000005'   
    }

    var tx = new Tx(rawTx);
    tx.sign(privateKey);

    var serializedTx = tx.serialize();

    //4.将签名的交易发送出去
    await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
        if (err) {
            console.log(err);
        }else{
            console.log("-5-hash of this TX is :\n   ", hash);
        }
    });

}
//multisendToken1();

/**
 * 6.与multisend合约交互（直接采用token.transferFrom ）
 */
let multisendToken2 = async function(){
    //1.输出账户 nounce
    let nounce_;
    await web3.eth.getTransactionCount("0xb445c062dd13352dd434a1820aba76f90ac8ad1e", function(err, noun){
        nounce_ =  web3.utils.toHex(noun).toString('hex'); 
    });
    //console.log("-2-nounce of this account is:\n    ",nounce_);

    //2.获取 function signature
    let funcsig = web3.eth.abi.encodeFunctionSignature('coinSendSameValue(address[],uint256)');
    //console.log("-3-the sig of function is : \n    ", funcsig);

    //3.获取函数参数的ABI编码
    //注意，数组类型作为函数参数的时候 [] 外面没有引号
    let paraAbi = web3.eth.abi.encodeParameter("address[]", ["0x6eee169148521be772bccc986ed7c36c39d9bf25"]);
    //console.log("-4-paramater encodeing :\n    ", paraAbi);

    //3.离线签名一个交易
    var Tx = require('ethereumjs-tx');
    var privateKey = Buffer.from('CED3BDAE48F6D798CE425C01F1457117A7E967559E997D0D81D9500BE3254903', 'hex')

    var rawTx = {
        nonce: nounce_,
        gasPrice: '0x3b9aca00',    //1 gwei
        gasLimit: '0x2dc6c0',   //300万
        from: '0xb445c062dd13352dd434a1820aba76f90ac8ad1e', //from 
        to: '0x72aC464BD67F9598fCd4Bc2E9039112Ccb14CE77',   //合约地址
        value: '0x00',
        data: '0x73eef753000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000010000000000000000000000006eee169148521be772bccc986ed7c36c39d9bf250000000000000000000000000000000000000000000000000000000000000005'   
    }

    var tx = new Tx(rawTx);
    tx.sign(privateKey);

    var serializedTx = tx.serialize();

    //4.将签名的交易发送出去
    await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
        if (err) {
            console.log(err);
        }else{
            console.log("-5-hash of this TX is :\n   ", hash);
        }
    });

}
multisendToken2();