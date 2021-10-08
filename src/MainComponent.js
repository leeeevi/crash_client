import { Box, Grid } from "grommet";
import { useEffect, useState } from "react";
import React from "react";
import { ResponsiveContext } from "grommet";
import MainCrashedComponent from "./MainCrashedComponent";
import MainBettingComponent from "./MainBettingComponent";
import ControlComponent from "./ControlComponent";
import ResultTableComponent from "./ResultTableComponent";
import ChatComponent from "./ChatComponent";
import ChartContainer from "./ChartContainer.js";

const columns = {
  small: ["auto"],
  medium: ["40%", "21%", "auto"],
  large: ["large", "medium", "auto"],
  xlarge: ["large", "medium", "auto"],
};

const rows = {
  small: ["small", "small", "auto", "medium"],
  medium: ["310px", "310px"],
  large: ["415px", "415px"],
  xlarge: ["large", "large"],
};

const fixedGridAreas = {
  small: [
    { name: "chart", start: [0, 0], end: [0, 0] },
    { name: "betting", start: [0, 1], end: [0, 1] },
    { name: "resultTable", start: [0, 3], end: [0, 3] },
    { name: "chat", start: [0, 2], end: [0, 2] },
  ],
  medium: [
    { name: "chart", start: [0, 0], end: [0, 0] },
    { name: "betting", start: [1, 0], end: [1, 0] },
    { name: "resultTable", start: [2, 0], end: [2, 1] },
    { name: "chat", start: [0, 1], end: [1, 1] },
  ],
  large: [
    { name: "chart", start: [0, 0], end: [0, 0] },
    { name: "betting", start: [1, 0], end: [1, 0] },
    { name: "resultTable", start: [2, 0], end: [2, 1] },
    { name: "chat", start: [0, 1], end: [1, 1] },
  ],
  xlarge: [
    { name: "chart", start: [0, 0], end: [0, 0] },
    { name: "betting", start: [1, 0], end: [1, 0] },
    { name: "resultTable", start: [2, 0], end: [2, 1] },
    { name: "chat", start: [0, 1], end: [1, 1] },
  ],
};

const Responsive = ({
  children,
  overrideColumns,
  overrideRows,
  areas,
  ...props
}) => (
  <ResponsiveContext.Consumer>
    {(size) => {
      let columnsVal = columns;
      if (columns) {
        if (columns[size]) {
          columnsVal = columns[size];
        }
      }

      let rowsVal = rows;
      if (rows) {
        if (rows[size]) {
          rowsVal = rows[size];
        }
      }

      let areasVal = areas;
      if (areas && !Array.isArray(areas)) areasVal = areas[size];

      return (
        <Grid
          {...props}
          areas={!areasVal ? undefined : areasVal}
          rows={!rowsVal ? size : rowsVal}
          columns={!columnsVal ? size : columnsVal}
        >
          {children}
        </Grid>
      );
    }}
  </ResponsiveContext.Consumer>
);

function MainComponent(props) {
  // Defining states
  const [state, setState] = useState("BETTING"); // BETTING, PLAYING, CRASHED
  const [data, setData] = useState([{ x: 0, y: 1 }]);
  const [crashPoint, setCrashPoint] = useState(1.0);
  const [resultTableAll, setResultTableAll] = useState([]);
  const [connected, setConnected] = useState(false);
  const [chartArray, setChartArray] = useState([{ x: 0, y: 1 }]);
  const [bettingTime, setBettingTime] = useState(undefined);
  const [gameStartTime, setGameStartTime] = useState(0);

  useEffect(() => {
    props.socket.on("currentState", (receivedState) => {
      setState(receivedState);
      if (receivedState === "CRASHED") {
        setData([{ x: 0, y: 1 }]);
      }
    });
    props.socket.on("calculatedCrashPoint", (receivedCrashPoint) => {
      setCrashPoint(receivedCrashPoint);
    });
    props.socket.on("bettingTime", (receivedBettingTime) => {
      setBettingTime(receivedBettingTime);
    });
    props.socket.on("gameStartTime", (receivedGameStartTime) => {
      setGameStartTime(receivedGameStartTime);
    });
    props.socket.on("startData", (receivedStartData) => {
      props.setStartTimeApp(Date.parse(receivedStartData));
    });
  }, [props]);

  useEffect(() => {
    props.setGameState(state);
    if (state === "BETTING") {
      props.setUserBetAmount(0);
      props.setUserPlacedBet(false);
      props.setUserWon(false);
      props.setUserCrashed(false);
      props.setWonAmount(undefined);
      props.setAutoCashOutMultiplier(undefined);
      setCrashPoint(1.0);
      setConnected(false);
      setResultTableAll([]);
      props.setInitiatedCashOut(false);
      props.setWonAmount(0);
      props.setCashOutMultiplier(undefined);
    }
    if (state === "PLAYING") {
      props.setInitColorBetting(false);
      props.setInitColorWaiting(false);
    } // eslint-disable-next-line
  }, [state]);

  useEffect(() => {
    props.socket.on("everyPlayer", (receivedData) => {
      setResultTableAll(receivedData);
    });
  });

  useEffect(() => {
    if (state === "BETTING" && !props.userPlacedBet) {
      props.setColor("#6FFFB0");
      props.setCashOutColor("#FF4040");
    }
    if (state === "BETTING" && props.initColorWaiting) {
      props.setColor("#FFCA58");
    }
    if (state === "PLAYING") {
      props.setColor("#00C781");
      props.setCashOutColor("#FF4040");
    }
    if (state === "CRASHED" && props.userCrashed) {
      props.setColor("#FF4040");
    }
    if (state === "CRASHED" && props.userWon) {
      props.setColor("#00C781");
    }
    if (state === "CRASHED" && !props.userCrashed && !props.userWon) {
      props.setColor("#FF4040");
    }
    if (state === "CRASHED" && !props.loggedIn) {
      props.setColor("#FF4040");
    }
  }, [state, props]);

  return (
    <Box background="#222222">
      <Responsive
        rows={rows}
        columns={columns}
        gap="small"
        pad="small"
        areas={fixedGridAreas}
      >
        <ControlComponent
          logIn={props.logIn}
          isReady={props.isReady}
          state={state}
          placeBet={props.placeBet}
          initiateCashOut={props.initiateCashOut}
          setInitConnection={props.setInitConnection}
          userPlacedBet={props.userPlacedBet}
          userBetAmount={props.userBetAmount}
          userCrashed={props.userCrashed}
          userWon={props.userWon}
          wonAmount={props.wonAmount}
          setAccounts={props.setAccounts}
          setChainId={props.setChainId}
          setWeb3={props.setWeb3}
          setInitiatedLogIn={props.setInitiatedLogIn}
          setLoggedIn={props.setLoggedIn}
          setAutoCashOutMultiplier={props.setAutoCashOutMultiplier}
          color={props.color}
          cashOutColor={props.cashOutColor}
          metaMaskInstalled={props.metaMaskInstalled}
        />
        <ResultTableComponent
          state={state}
          placeBet={props.placeBet}
          initiateCashOut={props.initiateCashOut}
          resultTableAll={resultTableAll}
          color={props.color}
        />
        <ChatComponent
          setUserName={props.setUserName}
          userName={props.userName}
          isReady={props.isReady}
          playerExists={props.playerExists}
          checkPlayerInDB={props.checkPlayerInDB}
          setMessage={props.setMessage}
          socket={props.socket}
          chatLoaded={props.chatLoaded}
          setChatLoaded={props.setChatLoaded}
          addPlayer={props.addPlayer}
          color={props.color}
        />
        {state === "BETTING" && (
          <MainBettingComponent
            data={data}
            crashPoint={crashPoint}
            bettingTime={bettingTime}
            gameStartTime={gameStartTime}
            color={props.color}
          />
        )}
        {state === "PLAYING" && (
          <ChartContainer
            maxX={props.maxX}
            maxY={props.maxY}
            data={props}
            crashPoint={crashPoint}
            setMaxX={props.setMaxX}
            setMaxY={props.setMaxY}
            setCashOutMultiplier={props.setCashOutMultiplier}
            state={state}
            connected={connected}
            setConnected={setConnected}
            chartArray={chartArray}
            setChartArray={setChartArray}
            socket={props.socket}
            initiatedCashOut={props.initiatedCashOut}
            setState={setState}
            setStartTimeApp={props.setStartTimeApp}
            initiateCashOut={props.initiateCashOut}
            autoCashOutMultiplier={props.autoCashOutMultiplier}
            autoCashOut={props.autoCashOut}
            color={props.color}
            timeDelay={props.timeDelay}
          />
        )}
        {state === "CRASHED" && (
          <MainCrashedComponent
            data={data}
            crashPoint={crashPoint}
            color={props.color}
          />
        )}
      </Responsive>
    </Box>
  );
}

export default MainComponent;
