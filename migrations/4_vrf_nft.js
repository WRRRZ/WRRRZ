const NFT = artifacts.require("iii6utils/iii6DiaModel");
module.exports = function (deployer) {
  deployer.deploy(NFT, "0xe55e1a1c7c8a82648aedbb2853a01306ce97df87", "WRRRZ", "WRRRZ", 1000000, 1, 0);
};
