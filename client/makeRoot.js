const { makeTree, getAccountsBuf } = require("./lib/helpers")
const { sha3, bufferToHex, bufferToInt, setLengthLeft } = require("ethereumjs-util")


const argv = require("yargs")
      .usage("Usage: $0 --acctFile [accounts file]")
      .argv

const main = async () => {
    const accountsBuf = await getAccountsBuf(argv.acctFile)
    console.log("Retrieved accounts!")

    // console.log(accountsBuf);
    // while(accountsBuf != "\n"){
    //     console.log(accountsBuf)
    // }

    // console.log(sha3("0xb1DA946F2379D04D7E44A3c0B12ccCDc51ba525C"))
    console.log("Creating Merkle tree...")
    const merkleTree = await makeTree(accountsBuf)
    console.log(`Created Merkle tree with root ${merkleTree.getHexRoot()} and ${merkleTree.getNumLeaves()} leaves`)
}

try {
    main()
} catch (err) {
    console.error(err)
}
