const NFTfactory = artifacts.require("iii6utils/Assets/iii6AssetFactory.sol");
module.exports = function (deployer) {
  deployer.deploy(NFTfactory);
};
