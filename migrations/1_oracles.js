const pc = artifacts.require("iii6Utils/Oracles/iii6PriceConsumer");
module.exports = function (deployer) {
  deployer.deploy(pc);
};
