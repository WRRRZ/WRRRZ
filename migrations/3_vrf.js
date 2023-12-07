const vrfEth = artifacts.require("iii6Utils/Oracles/iii6VRFEth");
const vrfGoerli = artifacts.require("iii6Utils/Oracles/iii6VRFGoerli");
const vrfMatic = artifacts.require("iii6Utils/Oracles/iii6VRFMatic");
const vrfMumbai = artifacts.require("iii6Utils/Oracles/iii6VRFMumbai");
const vrfAvax = artifacts.require("iii6Utils/Oracles/iii6VRFAvax");
const vrfFuji = artifacts.require("iii6Utils/Oracles/iii6VRFFuji");

var netID;
const net = async () => {
  const n = await web3.eth.net.getId();
  netID = n;
  return netID;
};
net();
module.exports = function (deployer, netID) {
  console.log(netID, 80001);
  /**
   * @dev create a chainlink vrf subscription and fund it with link on https://vrf.chain.link
   * make sure to have the network settings correct for your chosen network
   * you have to verify the contracts back and forth therefor you need to add your sub_id
   * @dev deployer.deploy(vrfNetwork, <SUBSCRIPTION_ID>);
   * and inside the subscription panel you need to add the deployed contract address as a consumer
   * @link https://vrf.chain.link
   */
  if (netID == "mainnet") deployer.deploy(vrfEth, 0);
  if (netID == "goerli") deployer.deploy(vrfGoerli, 7331);
  if (netID == "polygon") deployer.deploy(vrfMatic, 490);
  if (netID == "mumbai") deployer.deploy(vrfMumbai, 2022);
  if (netID == "avax") deployer.deploy(vrfAvax, 0);
  if (netID == "fuji") deployer.deploy(vrfFuji, 423);
};
