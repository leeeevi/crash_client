import React from "react";
import { VictoryLine, VictoryChart, VictoryArea, VictoryAxis } from "victory";
import { Box, Heading, Stack, ResponsiveContext } from "grommet";

class ChartContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{ x: 0, y: 1 }],
      maxX: 0.69314,
      maxY: 2,
      startTime: Date.now() + 10000,
      endTime: Date.now() + 10000,
      crashPoint: 0,
      connected: false, // getting the server time
      loaded: false, // filling the chart's array to fit the actual time
      size: ResponsiveContext,
      timeDelay: 0,
    };
  }

  growthFunc = (ms) => {
    return 0.005 * ms;
  };

  loop() {
    this.elapsed = Date.now() - this.state.startTime;

    this.tick = this.elapsed / 100;

    this.dataArray = {
      x: 0.005 * this.tick,
      y: Math.exp(0.005 * this.tick),
    };

    if (this.dataArray.y <= this.props.crashPoint) {
      this.setState({ data: [...this.state.data, this.dataArray] });

      if (this.dataArray.y >= this.props.autoCashOutMultiplier) {
        this.props.autoCashOut(this.props.autoCashOutMultiplier);
      }
      if (this.dataArray.x > 0.69314) {
        this.setState({ maxX: this.dataArray.x });
      }
      if (this.dataArray.y > 2) {
        this.setState({ maxY: this.dataArray.y });
      }
      this.id = setTimeout(this.loop.bind(this), 1000 / 60);
    }
  }

  componentDidMount() {
    this.props.socket.on("chartArray", (receivedChartArray) => {
      if (!this.state.loaded) {
        this.setState({ data: receivedChartArray });
        this.setState({ loaded: true });
      }
    });

    this.props.socket.on("startData", (receivedStartData) => {
      this.setState({ startTime: Date.parse(receivedStartData) });
      this.setState({ connected: true });
      setTimeout(this.loop.bind(this), 1000 / 60);
    });

    this.props.socket.on("endData", (receivedEndData) => {
      this.setState({ endTime: Date.parse(receivedEndData) });
    });
  }

  render() {
    return (
      <>
        <ResponsiveContext.Consumer>
          {(size) =>
            size === "small" && (
              <>
                <Box
                  gridArea="chart"
                  background="#171717"
                  fill={true}
                  pad="small"
                  round="xsmall"
                  responsive={true}
                  border={{ color: "#1B1B1B", size: "large" }}
                >
                  <Stack anchor="center" fill>
                    <VictoryChart
                      maxDomain={{ x: this.state.maxX, y: this.state.maxY }}
                      minDomain={{ x: 0, y: 1 }}
                      height={700}
                      width={1390}
                    >
                      <VictoryAxis
                        dependentAxis
                        orientation="left"
                        style={{
                          axis: { stroke: "#AAAAAA", strokeWidth: 1 },
                          tickLabels: {
                            fill: "#AAAAAA",
                            fontSize: 19,
                            fontFamily: "HelveticaNeueBd",
                          },
                        }}
                        tickFormat={(t) => `${t}x`}
                      />
                      <VictoryAxis
                        orientation="bottom"
                        style={{
                          axis: { stroke: "#AAAAAA", strokeWidth: 1 },
                          tickLabels: {
                            fill: "#AAAAAA",
                            strokeWidth: 2,
                            fontSize: 19,
                            fontFamily: "HelveticaNeueBd",
                          },
                        }}
                        tickFormat={(t) => `${t * 10}`}
                      />
                      <VictoryArea data={this.state.data} />
                      <svg>
                        <defs>
                          <linearGradient
                            id="myGradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#FFCA58" />
                            <stop offset="100%" stopColor={this.props.color} />
                          </linearGradient>
                        </defs>
                      </svg>
                      <VictoryLine
                        style={{
                          data: {
                            stroke: "url(#myGradient)",
                            strokeWidth: 15,
                            border: "10px",
                          },
                          parent: { border: "50px solid #fff" },
                        }}
                        data={this.state.data} //props.data
                        interpolation="natural"
                      />
                    </VictoryChart>
                    <Box
                      animation={{
                        type: "zoomOut",
                        duration: 50,
                        size: "large",
                      }}
                    >
                      <Heading
                        size="large"
                        color={this.props.color}
                        alignSelf="center"
                        margin="none"
                      >
                        {this.state.data[this.state.data.length - 1].y.toFixed(
                          2
                        ) + "x"}
                      </Heading>
                    </Box>
                  </Stack>
                </Box>
              </>
            )
          }
        </ResponsiveContext.Consumer>
        <ResponsiveContext.Consumer>
          {(size) =>
            size === "medium" && (
              <>
                <Box
                  gridArea="chart"
                  background="#171717"
                  fill={true}
                  pad="small"
                  round="xsmall"
                  responsive={true}
                  border={{ color: "#1B1B1B", size: "large" }}
                >
                  <Stack anchor="center" fill>
                    <VictoryChart
                      maxDomain={{ x: this.state.maxX, y: this.state.maxY }}
                      minDomain={{ x: 0, y: 1 }}
                      height={700}
                      width={1390}
                    >
                      <VictoryAxis
                        dependentAxis
                        orientation="left"
                        style={{
                          axis: { stroke: "#AAAAAA", strokeWidth: 1.5 },
                          tickLabels: {
                            fill: "#AAAAAA",
                            fontSize: 28,
                            fontFamily: "HelveticaNeueBd",
                          },
                        }}
                        tickFormat={(t) => `${t}x`}
                      />
                      <VictoryAxis
                        orientation="bottom"
                        style={{
                          axis: { stroke: "#AAAAAA", strokeWidth: 1.5 },
                          tickLabels: {
                            fill: "#AAAAAA",
                            strokeWidth: 2,
                            fontSize: 28,
                            fontFamily: "HelveticaNeueBd",
                          },
                        }}
                        tickFormat={(t) => `${t * 10}`}
                      />
                      <VictoryArea data={this.state.data} />
                      <svg>
                        <defs>
                          <linearGradient
                            id="myGradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#FFCA58" />
                            <stop offset="100%" stopColor={this.props.color} />
                          </linearGradient>
                        </defs>
                      </svg>
                      <VictoryLine
                        style={{
                          data: {
                            stroke: "url(#myGradient)",
                            strokeWidth: 15,
                            border: "10px",
                          },
                          parent: { border: "50px solid #fff" },
                        }}
                        data={this.state.data}
                        interpolation="natural"
                      />
                    </VictoryChart>
                    <Box
                      animation={{
                        type: "zoomOut",
                        duration: 50,
                        size: "large",
                      }}
                    >
                      <Heading
                        size="large"
                        color={this.props.color}
                        alignSelf="center"
                        margin="none"
                      >
                        {this.state.data[this.state.data.length - 1].y.toFixed(
                          2
                        ) + "x"}
                      </Heading>
                    </Box>
                  </Stack>
                </Box>
              </>
            )
          }
        </ResponsiveContext.Consumer>
        <ResponsiveContext.Consumer>
          {(size) =>
            (size === "large" || size === "xlarge") && (
              <>
                <Box
                  gridArea="chart"
                  background="#171717"
                  fill={true}
                  pad="small"
                  round="xsmall"
                  responsive={true}
                  border={{ color: "#1B1B1B", size: "large" }}
                >
                  <Stack anchor="center" fill>
                    <VictoryChart
                      maxDomain={{ x: this.state.maxX, y: this.state.maxY }}
                      minDomain={{ x: 0, y: 1 }}
                      height={700}
                      width={1390}
                    >
                      <VictoryAxis
                        dependentAxis
                        orientation="left"
                        style={{
                          axis: { stroke: "#AAAAAA", strokeWidth: 2 },
                          tickLabels: {
                            fill: "#AAAAAA",
                            fontSize: 22,
                            fontFamily: "HelveticaNeueBd",
                          },
                        }}
                        tickFormat={(t) => `${t}x`}
                      />
                      <VictoryAxis
                        orientation="bottom"
                        style={{
                          axis: { stroke: "#AAAAAA", strokeWidth: 2 },
                          tickLabels: {
                            fill: "#AAAAAA",
                            strokeWidth: 2,
                            fontSize: 22,
                            fontFamily: "HelveticaNeueBd",
                          },
                        }}
                        tickFormat={(t) => `${t * 10}`}
                      />
                      <VictoryArea data={this.state.data} />
                      <svg>
                        <defs>
                          <linearGradient
                            id="myGradient"
                            x1="0%"
                            y1="0%"
                            x2="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#FFCA58" />
                            <stop offset="100%" stopColor={this.props.color} />
                          </linearGradient>
                        </defs>
                      </svg>
                      <VictoryLine
                        style={{
                          data: {
                            stroke: "url(#myGradient)",
                            strokeWidth: 15,
                            border: "10px",
                          },
                          parent: { border: "50px solid #fff" },
                        }}
                        data={this.state.data}
                        interpolation="natural"
                      />
                    </VictoryChart>
                    <Box
                      animation={{
                        type: "zoomOut",
                        duration: 50,
                        size: "large",
                      }}
                    >
                      <Heading
                        size="xlarge"
                        color={this.props.color}
                        alignSelf="center"
                        margin="none"
                      >
                        {this.state.data[this.state.data.length - 1].y.toFixed(
                          2
                        ) + "x"}
                      </Heading>
                    </Box>
                  </Stack>
                </Box>
              </>
            )
          }
        </ResponsiveContext.Consumer>
      </>
    );
  }
}

export default ChartContainer;
