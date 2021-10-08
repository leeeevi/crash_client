const CrashToken = artifacts.require("CrashToken");

module.exports = function (deployer) {
  deployer.deploy(CrashToken);
};