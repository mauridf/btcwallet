//importando as dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//definir a rede
//bitcoin - a rede principal - mainnet
//testnet - a rede de reste - testnet
const network = bitcoin.networks.testnet

//derivação de carteiras
const path = `m/49'/1'/0'/0`

//criando o mnemonico para a seed
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//raiz da carteira
let root = bip32.fromSeed(seed, network)

//criando a conta pvt e pub keys
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira Gerada")
console.log("Endereço: ",btcAddress)
console.log("Chave Privada: ",node.toWIF())
console.log("Seed: ",mnemonic)