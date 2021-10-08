import "./App.css";
import { Grommet, Footer, Text, ResponsiveContext } from "grommet";
import { grommet } from "grommet/themes";
import HeaderComponent from "./HeaderComponent.js";
import MainComponent from "./MainComponent";
import Crash from "./contracts/Crash.json";
import CrashToken from "./contracts/CrashToken.json";
import { useEffect, useState } from "react";
import Axios from "axios";
import { deepMerge } from "grommet/utils";
import io from "socket.io-client";
import Web3 from "web3";

//var socket = io("http://localhost:3003");
//var socket = io("https://decentralizedcrashgame.herokuapp.com");
var socket = io("https://decentralizedcrashgame.herokuapp.com");

function App() {
  // web3 hooks
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]); //
  const [contract, setContract] = useState(undefined); //
  const [token, setToken] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  const [contractAddress, setContractAddress] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [owner, setOwner] = useState(undefined);
  const [metaMaskInstalled, setMetaMaskInstalled] = useState(undefined);
  const houseFee = 1; // 1%

  // chat hooks
  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [playerExistsInDB, setplayerExistsInDB] = useState(false);
  const [message, setMessage] = useState("");
  const [chatLoaded, setChatLoaded] = useState(false);

  // gameplay hooks
  const [userBetAmount, setUserBetAmount] = useState(0);
  const [userPlacedBet, setUserPlacedBet] = useState(false);
  const [userCrashed, setUserCrashed] = useState(false);
  const [userWon, setUserWon] = useState(false);
  const [wonAmount, setWonAmount] = useState(0);
  const [gameState, setGameState] = useState("");
  const [initiatedCashOut, setInitiatedCashOut] = useState(false);
  const [cashOutMultiplier, setCashOutMultiplier] = useState(undefined);
  const [startTimeApp, setStartTimeApp] = useState(undefined);
  const [autoCashOutMultiplier, setAutoCashOutMultiplier] = useState(undefined);
  const [color, setColor] = useState("#6FFFB0");
  const [cashOutColor, setCashOutColor] = useState("#FF4040");
  const [initColorBetting, setInitColorBetting] = useState(true);
  const [initColorWaiting, setInitColorWaiting] = useState(false);

  // Database connection
  const addPlayer = async (user) => {
    if (userName !== null && userAddress !== null) {
      //Axios.post("http://localhost:3003/create", {
      Axios.post("https://decentralizedcrashgame.herokuapp.com/create", {
        address: await window.ethereum.request({
          method: "eth_accounts",
        }),
        username: user,
      }).then(() => {
        setUserName(user);
      });
    }
  };

  const checkPlayerInDB = async () => {
    if (window.ethereum) {
      Axios.post("https://decentralizedcrashgame.herokuapp.com/check", {
        address: await window.ethereum.request({
          method: "eth_accounts",
        }),
      }).then((response) => {
        if (response.data[0] !== undefined) {
          if (response.data[0].addressCnt > 0) {
            getPlayerUsername();
            setplayerExistsInDB(true);
          } else {
            setplayerExistsInDB(false);
          }
        }
      });
    }
  };

  const getPlayerUsername = async () => {
    Axios.post("https://decentralizedcrashgame.herokuapp.com/username", {
      address: await window.ethereum.request({
        method: "eth_accounts",
      }),
    }).then((response) => {
      setUserName(response.data[0].username);
    });
  };

  const isMetaMaskInstalled = () => {
    if (window.ethereum) setMetaMaskInstalled(true);
    else setMetaMaskInstalled(false);
  };

  // Web3 connection

  useEffect(() => {
    isMetaMaskInstalled();
    const init = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accs = await window.ethereum.request({
          method: "eth_accounts",
        });
        setAccounts(accs);

        const contract = new web3.eth.Contract(
          Crash.abi,
          process.env.REACT_APP_GAME_ADDRESS
        );
        const address = process.env.REACT_APP_TOKEN_ADDRESS;
        const token = new web3.eth.Contract(CrashToken.abi, address);
        const owner = web3.eth.accounts.privateKeyToAccount(
          process.env.REACT_APP_PRIVATE_KEY
        );
        setOwner(owner);
        setWeb3(web3);
        setContract(contract);
        setToken(token);
        setContractAddress(process.env.REACT_APP_GAME_ADDRESS);
        setTokenAddress(address);
        setUserAddress(accounts[0]);
        checkPlayerInDB();

        if (accounts.length > 0) {
          setLoggedIn(true);
          checkPlayerInDB();
        }
      }
    };
    init();
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (!accounts.length) {
          setLoggedIn(false);
          setplayerExistsInDB(false);
          setAccounts([]);
          setUserAddress("");
          setUserName("");
          setUserPlacedBet(false);
        }
        setplayerExistsInDB(false);
        checkPlayerInDB();
        setAccounts(accounts);
        setUserAddress(accounts[0]);
        setUserName("");
        setUserPlacedBet(false);
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    checkPlayerInDB();
  });

  useEffect(() => {
    if (window.ethereum && !window.ethereum.isConnected) {
      setLoggedIn(false);
      setUserAddress("");
    }
  }, []);

  useEffect(() => {
    if (accounts.length > 0) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [accounts]);

  useEffect(() => {
    const sendMessage = () => {
      if (userAddress !== "" && userName !== "" && message !== "") {
        Axios.post("https://decentralizedcrashgame.herokuapp.com/chat", {
          address: userAddress,
          username: userName,
          message: message,
        }).then((response) => {
          //console.log("Success!");
        });
      }
    };
    sendMessage(); // eslint-disable-next-line
  }, [message]);

  const isReady = () => {
    return accounts.length > 0;
  };

  useEffect(() => {
    if (userBetAmount > 0 && gameState === "BETTING" && userPlacedBet) {
      socket.emit("resultTableUserData", {
        user: userName,
        bet: userBetAmount,
        bravery: calculateBravery(userBetAmount),
      });
    }
  }, [userName, userBetAmount, gameState, userPlacedBet]);

  useEffect(() => {
    if (
      userBetAmount > 0 &&
      wonAmount > 0 &&
      gameState === "PLAYING" &&
      userPlacedBet
    ) {
      socket.emit("resultTableUserData", {
        user: userName,
        at: cashOutMultiplier,
        bet: userBetAmount,
        profit: wonAmount - userBetAmount,
        bravery: calculateBravery(userBetAmount),
      });
    }
  }, [
    userName,
    userBetAmount,
    cashOutMultiplier,
    wonAmount,
    gameState,
    userPlacedBet,
  ]);

  useEffect(() => {
    if (userBetAmount > 0 && gameState === "CRASHED" && userPlacedBet) {
      socket.emit("resultTableUserData", {
        user: userName,
        at: cashOutMultiplier,
        bet: userBetAmount,
        profit: wonAmount - userBetAmount,
        bravery: calculateBravery(userBetAmount),
      });
    }
  }, [
    userName,
    cashOutMultiplier,
    userBetAmount,
    wonAmount,
    gameState,
    userPlacedBet,
  ]);

  // Web3 betting
  async function placeBet(value) {
    setAutoCashOutMultiplier(value.autoCashOut);
    if (gameState === "BETTING") {
      if (isReady) {
        if (
          (await token.methods.allowance(accounts[0], contractAddress).call()) <
          web3.utils.toWei(value.betAmount.toString(), "ether")
        ) {
          await token.methods
            .approve(
              contractAddress,
              web3.utils.toWei(web3.utils.toBN(100000000000), "ether")
            )
            .send({ from: accounts[0] });
        }
        await contract.methods
          .placeBet(
            web3.utils.toWei(value.betAmount.toString(), "ether"),
            tokenAddress
          )
          .send({ from: accounts[0] });
      }

      setUserBetAmount(value.betAmount * ((100 - houseFee) / 100));
      socket.emit("betAmountOfUser", value.betAmount);
      setUserPlacedBet(true);
      setInitColorWaiting(true);
    }
  }

  async function cashOut() {
    if (gameState === "PLAYING") {
      setInitiatedCashOut(true);
      setUserCrashed(false);
      setUserWon(true);
      setInitColorBetting(true);

      setWonAmount(
        userBetAmount *
          Math.exp((0.005 * (Date.now() - startTimeApp)) / 100).toFixed(2)
      );
      setCashOutMultiplier(
        Math.exp((0.005 * (Date.now() - startTimeApp)) / 100).toFixed(2)
      );

      const betInside = await contract.methods.getBetAmount(accounts[0]).call();
      const prizeAmount =
        web3.utils.fromWei(betInside.toString(), "ether") *
        Math.exp((0.005 * (Date.now() - startTimeApp)) / 100).toFixed(2);
      const transaction1 = await token.methods.approve(
        owner.address,
        web3.utils.toWei(prizeAmount.toString(), "ether")
      );
      await send(web3, owner, transaction1);
      const transaction2 = await token.methods.transferFrom(
        owner.address,
        accounts[0],
        web3.utils.toWei(prizeAmount.toString(), "ether")
      );
      await send(web3, owner, transaction2);
    }
  }

  async function autoCashOut(autoCashOutMultiplier) {
    if (gameState === "PLAYING") {
      setInitiatedCashOut(true);
      setUserCrashed(false);
      setUserWon(true);
      setWonAmount(userBetAmount * autoCashOutMultiplier);
      setCashOutMultiplier(autoCashOutMultiplier);
      setInitColorBetting(true);

      const betInside = await contract.methods.getBetAmount(accounts[0]).call();
      const prizeAmount =
        web3.utils.fromWei(betInside.toString(), "ether") *
        autoCashOutMultiplier;
      const transaction1 = await token.methods.approve(
        owner.address,
        web3.utils.toWei(prizeAmount.toString(), "ether")
      );
      await send(web3, owner, transaction1);
      const transaction2 = await token.methods.transferFrom(
        owner.address,
        accounts[0],
        web3.utils.toWei(prizeAmount.toString(), "ether")
      );
      await send(web3, owner, transaction2);
    }
  }

  async function send(web3, account, transaction) {
    const options = {
      to: transaction._parent._address,
      data: transaction.encodeABI(),
      gas: await transaction.estimateGas({ from: account.address }),
    };
    const signed = await web3.eth.accounts.signTransaction(
      options,
      account.privateKey
    );
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    return receipt;
  }

  function initiateCashOut() {
    cashOut();
  }

  function calculateBravery(bet) {
    if (bet >= 500 && bet < 10000) {
      return 10;
    }
    if (bet >= 10000 && bet < 20000) {
      return 20;
    }
    if (bet >= 20000 && bet < 100000) {
      return 25;
    }
    if (bet >= 100000 && bet < 500000) {
      return 30;
    }
    if (bet >= 500000 && bet < 1000000) {
      return 40;
    }
    if (bet >= 1000000 && bet < 10000000) {
      return 60;
    }
    if (bet >= 10000000 && bet < 100000000) {
      return 85;
    }
    if (bet >= 100000000) {
      return 100;
    }
  }

  const customTheme = {
    formField: {
      border: false,
    },
    button: {
      border: {
        radius: "4px",
      },
      hover: {
        color: "#81FCED",
      },
    },
    global: {
      colors: {
        text: {
          dark: "#F7F7F7",
          light: "#1B1B1B",
        },
      },
      focus: {
        border: {
          color: color,
        },
      },
      font: {
        family: "HelveticaNeueBd",
      },
      drop: {
        background: "#222222",
        shadowSize: "medium",
        extend: `
          font-size: 14px;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          li {
            border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          }
          overflow: hidden;
        `,
      },
      elevation: {
        light: {
          xsmall: "0px 0px 5px #81FCED",
          xxsmall: "10px 10px 10px #81FCED",
          small: "0px 0px 0px #81FCED",
        },
        dark: {
          xsmall: "0px 0px 5px #81FCED",
          xxsmall: "10px 10px 10px #81FCED",
          medium: "0px 0px 0px #81FCED",
        },
      },
    },
    background: {
      color: "#171717",
    },
    dataTable: {
      header: {
        border: {
          color: "#1B1B1B",
          side: "bottom",
          size: "small",
        },
      },
    },
    menu: {
      background: "#171717",
    },
    text: {
      xxsmall: {
        size: "7px",
      },
    },
  };

  return (
    <Grommet
      theme={deepMerge(grommet, customTheme)}
      style={{
        backgroundColor: "#171717",
      }}
      full
    >
      <HeaderComponent
        setUserName={setUserName}
        userName={userName}
        loggedIn={loggedIn}
        accounts={accounts}
        playerExistsInDB={playerExistsInDB}
        userAddress={userAddress}
        checkPlayerInDB={checkPlayerInDB()}
        isReady={isReady}
        color={color}
      />
      <MainComponent
        id="yo"
        isReady={isReady}
        setUserName={setUserName}
        userName={userName}
        placeBet={placeBet}
        initiateCashOut={initiateCashOut}
        setCashOutMultiplier={setCashOutMultiplier}
        playerExistsInDB={playerExistsInDB}
        checkPlayerInDB={checkPlayerInDB()}
        setMessage={setMessage}
        userBetAmount={userBetAmount}
        socket={socket}
        chatLoaded={chatLoaded}
        setChatLoaded={setChatLoaded}
        userPlacedBet={userPlacedBet}
        setUserBetAmount={setUserBetAmount}
        setUserPlacedBet={setUserPlacedBet}
        userCrashed={userCrashed}
        setUserCrashed={setUserCrashed}
        userWon={userWon}
        setUserWon={setUserWon}
        setGameState={setGameState}
        wonAmount={wonAmount}
        setWonAmount={setWonAmount}
        initiatedCashOut={initiatedCashOut}
        setInitiatedCashOut={setInitiatedCashOut}
        setStartTimeApp={setStartTimeApp}
        setAccounts={setAccounts}
        setWeb3={setWeb3}
        setLoggedIn={setLoggedIn}
        setAutoCashOutMultiplier={setAutoCashOutMultiplier}
        cashOut={cashOut}
        autoCashOutMultiplier={autoCashOutMultiplier}
        autoCashOut={autoCashOut}
        addPlayer={addPlayer}
        color={color}
        setColor={setColor}
        cashOutColor={cashOutColor}
        setCashOutColor={setCashOutColor}
        loggedIn={loggedIn}
        initColorBetting={initColorBetting}
        setInitColorBetting={setInitColorBetting}
        initColorWaiting={initColorWaiting}
        setInitColorWaiting={setInitColorWaiting}
        metaMaskInstalled={metaMaskInstalled}
      />

      <Footer
        background="#171717"
        pad={{ vertical: "xsmall", horizontal: "medium" }}
      >
        <ResponsiveContext.Consumer>
          {(size) =>
            size === "small" ? (
              <>
                <Text textAlign="start" size="6px">
                  ©2021 CRASH. Enjoy! ❤️
                </Text>
                <Text textAlign="end" size="6px">
                  We take {houseFee}% house fee on each bet & accept only $ITM.
                </Text>
              </>
            ) : (
              <>
                <Text textAlign="start" size="xsmall">
                  ©2021 CRASH. Have fun! ❤️
                </Text>
                <Text textAlign="end" size="xsmall">
                  We take {houseFee}% house fee on each bet & accept only $ITM.
                </Text>
              </>
            )
          }
        </ResponsiveContext.Consumer>
      </Footer>
    </Grommet>
  );
}

export default App;
