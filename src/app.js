import "../public/app.scss";
import Web3 from "web3";
import { ethers } from "ethers";
import { sha256 } from "crypto-hash";
import UAuth from "@uauth/js";
import { s0x, Friends, Groups } from "./bin/contracts";
import { bg, dev_inf, stage, nav, head, move, modal, modalbox, foot } from "./bin/mainelements";
import { resetFormElements, name, email, country, mobile, mm, ud, closer, status } from "./bin/formelements";
import { iii6, design, develop, launch, info, account, token, network } from "./bin/navelements";
import { show } from "./bin/dynelements";
import { login, signup, edit } from "./bin/forms";
import { iii6_stage, iii6_bg, design_stage, develop_stage, launch_stage, info_stage } from "./bin/dyncontent";
import { init, animate, character3d, level3d, flex3d, removeModel } from "./bin/threezy";
const client = require("ipfs-http-client");
const ipfs = client.create({
  host: "ipfs.infura.io",
  port: "5001",
  protocol: "https",
});

let accounts;
let user;
let net;
let balance;

let provider;
let signer;
let hold;
const navigate = async (e) => {
  console.log(":: target :", e.target.id, hold, "::");
  bg.innerHTML = "";
  if (e.target.id == "iii6") {
    show.innerHTML = iii6_stage;
    bg.innerHTML = iii6_bg;
  } else if (e.target.id == "design") {
    show.innerHTML = design_stage;
    init(character3d);
    hold = character3d;
    animate();
  } else if (e.target.id == "develop") {
    show.innerHTML = develop_stage;
  } else if (e.target.id == "launch") {
    show.innerHTML = launch_stage;
  } else if (e.target.id == "info") {
    show.innerHTML = info_stage;
  } else if (e.target.id == "account") {
    checkIn();
  } else if (e.target.id == "token") {
  } else if (e.target.id == "network") {
  } else {
  }
};
const web2 = async () => {
  console.log(":: new web2 user ::");
  modalbox.innerHTML = signup;
  console.log(":: sign up new user ::");
  resetFormElements();
  mm.addEventListener("click", clickMM);
  ud.addEventListener("click", clickUD);
  modal.style.display = "grid";
};
const closeModal = () => {
  modal.style.display = "none";
};
const loaded = () => {
  console.log(":: loaded iii6v2 framework ::");
  iii6.addEventListener("click", navigate);
  design.addEventListener("click", navigate);
  develop.addEventListener("click", navigate);
  launch.addEventListener("click", navigate);
  info.addEventListener("click", navigate);
  token.addEventListener("click", navigate);
  network.addEventListener("click", navigate);
  closer.addEventListener("click", closeModal);
  console.log(":: iii6v2 navigation initialised ::");

  if (isMetaMaskInstalled()) account.addEventListener("click", navigate);
  else account.addEventListener("click", web2);

  web3init();
};
const checkIn = async () => {
  provider = new ethers.providers.Web3Provider(web3.currentProvider);
  signer = await provider.getSigner();
  accounts = await provider.send("eth_requestAccounts", []);
  user = accounts[0];
  net = await provider.getNetwork();
  console.log("::", accounts, net.chainId, "::");
  let uData = await checkUser();
  console.log(":: Check User :", uData, "::");
  if (uData == 0) {
    console.log(":: new user ::");
    modalbox.innerHTML = signup;
    console.log(":: sign up new user ::");
    resetFormElements();
    mm.addEventListener("click", mmSignUp);
    ud.addEventListener("click", udSignUp);
  } else if (uData == 1 || uData == 2) {
    console.log(":: known user ::");
    modalbox.innerHTML = login;
    console.log(":: login user ::");
    resetFormElements();
    mm.addEventListener("click", mmLogin);
    ud.addEventListener("click", udLogin);
  } else if (uData == 99) {
    console.log(":: admin user ::");
    modalbox.innerHTML = login;
    console.log(":: login user ::");
    resetFormElements();
    mm.addEventListener("click", mmLogin);
    ud.addEventListener("click", udLogin);
  } else {
    web2();
  }
  modal.style.display = "grid";
};
const mmLogin = async (e) => {
  console.log(":: checking metamask user data ::");
  const sign = await signer.signMessage(user);
  closeModal();
  goProfile();
};
const udLogin = async (e) => {
  console.log(":: checking unstoppable user data ::");
};
const mmSignUp = async (e) => {
  const S0X = await s0xData();
  console.log(":: creating user profile ::");
  let dias = {
    name: name.value,
    email: email.value,
    mobile: "+" + String(country.value) + " " + String(mobile.value),
    country: country.value,
    network: net.chainId,
    wallet: user,
    info: "new s0xiety member",
    image: "QmQQUgGnzAaySRbUphGgjPtT49JMMHydX74AhG98DnEi6Q",
  };
  const makeU = await S0X.createUserAccount(JSON.stringify(dias), user, name.value)
    .then((res) => {
      mm.innerText = "LOADING";
      console.log("LOADING", res);
    })
    .catch((err) => {
      console.error(err);
    });
  closeModal();
  goProfile();
  account.innerText = name.value;
  account.removeEventListener("click", navigate);
  account.addEventListener("click", goProfile);
};
const udSignUp = async (e) => {
  console.log(":: checking unstoppable user data ::");
};
const goProfile = async () => {
  console.log(":: checking profile data ::");
  const S0X = await s0xData();
  const profile = await S0X.showUser(user)
    .then((res) => {
      // console.log(res);
      let pro = JSON.parse(res);
      let showTemp = `<img src='https://ipfs.io/ipfs/${pro.image}' class='pimg'/><h1 class='pint'>Profile</h1><input type='text' id='name' value=${pro.name} class='pinp' disabled /><input id='email' type='email' value=${pro.email} class='pinp' /><input id='wallet' type='text' value=${pro.wallet} class='pinp' disabled /><input id='status' placeholder='info' class='pinp' value='${pro.info}' /><input type='file' id="image" value=${pro.image} class='pinp' disabled /><input type="hidden" id="imageholder" value="${pro.image}"/><div id='edit' class='pbtn'>EDIT</div>`;
      show.innerHTML = showTemp;
      const edit = document.getElementById("edit");
      edit.addEventListener("click", goEdit);
      account.innerText = pro.name;
      account.removeEventListener("click", navigate);
      account.addEventListener("click", goProfile);
      return res;
    })
    .catch((err) => {
      console.error(err);
    });
};
const goEdit = async () => {
  console.log(":: edit user account data ::");
  const S0X = await s0xData();
  resetFormElements();
  let profile = await S0X.showUser(user);
  console.log(profile);
  let pro = JSON.parse(profile);
  console.log(pro);
  let dias = {
    name: pro.name,
    email: email.value,
    mobile: pro.mobile,
    country: pro.country,
    network: pro.network,
    wallet: pro.wallet,
    info: status.value,
    image: imageholder.value,
  };
  console.log(dias);
  const edit = await S0X.editUser(JSON.stringify(dias))
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
  edit
    .wait()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
  goProfile();
};
const checkUser = async () => {
  const S0X = await s0xData();
  // Is User
  const isUser = await S0X.isUser(user)
    .then((res) => {
      console.log(":: makeUser response :", Number(res._hex), "::");
      // action

      return res;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
  if (isUser === true) {
    const role = await S0X.roles(user)
      .then((res) => {
        console.log(":: makeUser response :", Number(res._hex), "::");
        // action

        return Number(res._hex);
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
    return isUser, role;
  } else return isUser, 0;
};
const netCheck = () => {
  let a;
  if (Number(net.chainId) === 137) a = 2;
  if (Number(net.chainId) === 43113) a = 1;
  if (Number(net.chainId) === 43114) a = 2;
  if (Number(net.chainId) === 80001) a = 0;
  return a;
};
const s0xData = async () => {
  let a = netCheck();
  const deploymentKey = await Object.keys(s0x.networks)[a];
  // console.log(net, deploymentKey, s0x.networks);
  return new ethers.Contract(s0x.networks[deploymentKey].address, s0x.abi, signer);
};
const connected = () => {};

const loggedIn = () => {};

const isMetaMaskInstalled = () => {
  //Have to check the ethereum binding on the window object to see if it's installed
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};
const clickMM = (e) => {
  e.preventDefault();
  alert("You are being redirected to the official download of Metamask.io ... Please Follow their installation instructions.");
  window.open("https://metamask.io");
};
const clickUD = (e) => {
  e.preventDefault();
  alert("You are being redirected to the official Unstoppable Domains Website ... You will need an UDDomain to continue this path.");
  window.open("https://unstoppabledomains.com");
};
const MetaMaskClientCheck = () => {
  console.log(isMetaMaskInstalled());
  //Now we check to see if MetaMask is installed
  if (!isMetaMaskInstalled()) {
    //If it isn't installed we ask the user to click to install it
    account.addEventListener("click", web2);
    account.innerText = "CONNECT";
  } else {
    //If it is installed we change our button text
    account.innerText = "CONNECT";
  }
  console.log(":: iii6v2 web3 initialised ::");
};
const web3init = async () => {
  MetaMaskClientCheck();
  show.innerHTML = iii6_stage;
  bg.innerHTML = iii6_bg;
};
document.addEventListener("DOMContentLoaded", loaded);
