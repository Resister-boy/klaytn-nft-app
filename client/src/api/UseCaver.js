import Caver, { ChainDataAnchoringWrapper } from 'caver-js';
import NFTMarketABI from "../abi/NFTMarketABI.json";
import NFTSimpleABI from "../abi/NFTSimpleABI.json";
import KIP17TokenABI from "../abi/KIP17TokenABI.json";
import { NFT_SIMPLE_CONTRACT_ADDRESS, COUNT_CONTRACT_ADDRESS, CHAIN_ID} from '../constants/index';

const option = {
  headers: [
    {
      name: "Authorization",
      value: "Basic S0FTS1VFWTBXWTUzSUowUEszUjUyRDZSOkNkVW5GQ2RhWUxqXzVsdVJGWXd3aGQyWTRhdUt4ZUlKWE9HOEN1aEo="
    },
    { name: "x-chain-id", value: CHAIN_ID }
  ]
}

const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
const NFTContract = new caver.contract(NFTSimpleABI, NFT_SIMPLE_CONTRACT_ADDRESS);

export const fetchCardOf = async (address) => {
  // fetch Token IDs
  const tokenIds =  await NFTContract.methods.ownedTokens(address).call();
  // fetch Token URIs
  const tokenUris = [];
  for (let i = 0; i < tokenIds.length; i++)
  {
    let uri = await NFTContract.methods.tokenURIs(tokenIds[i]).call();
    tokenUris.push(uri);
  }
  // return array {uri: , id: }
  const nfts = [];
  for (let i = 0; i < tokenIds.length; i++)
  {
    nfts.push({uri: tokenUris[i], id: tokenIds[i]});
  }
  console.log(nfts);
  return nfts;
}

export const getBalance = (address) => {
  return caver.rpc.klay.getBalance(address).then((response) => {
    const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
    console.log(`BALANCE: ${balance}`);
    return balance;
  })
}



// import CounterABI from "../abi/CounterABI.json";

// export const readCount = async () => {
//   const _count = await CountContract.methods.count().call();
//   console.log(_count);
// }


// export const setCount = async (newCount) => {
//   // 사용할 account 설정
//   try {
//     const privateKey = '0xaf13ffbc83fd035ebe3dd7cdac5ac96cd207ef9944d361a7e55ec756b6cfd636';
//     const deployer = caver.wallet.keyring.createFromPrivateKey(privateKey);
//     caver.wallet.add(deployer);

//     // 스마트 컨트랙트 실행 트랜젝션 날리기
//     // 결과 확인
//     const receipt = await CountContract.methods.setCount(newCount).send({
//       from: deployer.address, // address
//       gas: "0x4bfd200"//
//     })
//     console.log(receipt);
//   } catch (e) {
//     console.log(`[ERROR_SET_COUNT]${e}`)
//   }
// }

// export const getCount = async (newCount) => {
//   // 사용할 account 설정
//   try {
//     const privateKey = '0xaf13ffbc83fd035ebe3dd7cdac5ac96cd207ef9944d361a7e55ec756b6cfd636';
//     const deployer = caver.wallet.keyring.createFromPrivateKey(privateKey);
//     caver.wallet.add(deployer);

//     // 스마트 컨트랙트 실행 트랜젝션 날리기
//     // 결과 확인
//     const receipt = await CountContract.methods.setCount(newCount).send({
//       from: deployer.address, // address
//       gas: "0x4bfd200"//
//     })
//     console.log(receipt);
//   } catch (e) {
//     console.log(`[ERROR_SET_COUNT]${e}`)
//   }
// }
  