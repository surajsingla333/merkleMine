const { promisify } = require("util")
const r2 = require("r2")
const fs = require("fs")
const MerkleTree = require("../../utils/merkleTree")
const readline = require('readline');
outstream = new (require('stream'))();
const { toBuffer, addHexPrefix } = require("ethereumjs-util")

// original
// const makeTree = async accountsBuf => {
//     let accounts = []

//     for (let i = 0; i < accountsBuf.length; i += 20) {
//         // console.log("file", accountsBuf);
//         // console.log("len of file", accountsBuf.length);
//         const buf = Buffer.from(accountsBuf.slice(i, i + 20), "hex")
//         // console.log("current buf", buf)
//         accounts.push(buf)
//     }

//     console.log(accounts)

//     return new MerkleTree(accounts)
// }


//mine
const makeTree = async accountsBuf => {
    
    let accounts = []
    // console.log("len of file", accountsBuf.length);
    i = 0;
    while(i < accountsBuf.length) {
        // console.log("file", accountsBuf);
        if(accountsBuf[i]==0 & accountsBuf[i+1]=="x"){
            // hash = sha3(accountsBuf.slice(i,i+42))
            accounts.push(accountsBuf.slice(i,i+42))
            i+=42;
        }
        else{
            i++;
        }
        // if(accountsBuf[i]==" " || accountsBuf[i]==""){
        //     continue
        // }
        // console.log("len of file", accountsBuf.length);
        // const buf = Buffer.from(accountsBuf.slice(i, i + 42), "hex")
        // // console.log("current buf", buf)
        // accounts.push(buf)
    }

    // console.log(accounts)

    return new MerkleTree(accounts)
}

// original
// const getAccountsBuf = async acctFile => {
//     if (acctFile === undefined) {
//         console.log("Accounts file not explicitly provided - defaulting to retrieving accounts from a IPFS gateway using hash QmQbvkaw5j8TFeeR7c5Cs2naDciUVq9cLWnV3iNEzE784r")

//         const res = await r2.get("https://gateway.ipfs.io/ipfs/QmQbvkaw5j8TFeeR7c5Cs2naDciUVq9cLWnV3iNEzE784r").response
//         return res.buffer()
//     } else {
//         console.log(`Using accounts in file: ${acctFile}`)
//         files = await promisify(fs.readFile)(acctFile)
//         console.log("\n\n",files,"\n\n")
//         return files;
//     }
// }

//mine
const getAccountsBuf = async acctFile => {
    if (acctFile === undefined) {
        console.log("Accounts file not explicitly provided - defaulting to retrieving accounts from a IPFS gateway using hash QmQbvkaw5j8TFeeR7c5Cs2naDciUVq9cLWnV3iNEzE784r")

        const res = await r2.get("https://gateway.ipfs.io/ipfs/QmQbvkaw5j8TFeeR7c5Cs2naDciUVq9cLWnV3iNEzE784r").response
        return res.buffer()
    } else {
        hashes = []
        console.log(`Using accounts in file: ${acctFile}`)
        
        // instream = fs.createReadStream(acctFile);
        
        // rl = readline.createInterface(instream, outstream);
        
        // promisify(rl.on('line', function (line) {
        //     console.log(line);
        //     hashes.push(sha3(line));
        // }));


        // console.log(hashes)
        // lineReader.createInterface({
        //     input: fs.createReadStream(acctFile)
        // });

        // lineReader.on('line', function(line){
        //     console.log("\n Line from file: ", line);
        // })
        return promisify(fs.readFile)(acctFile, "utf-8")
        // console.log("\n\n",files,"\n\n")
        // return files;
    }
}

module.exports = {
    makeTree,
    getAccountsBuf
}
