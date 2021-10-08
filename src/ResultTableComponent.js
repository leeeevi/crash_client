import { Box, DataTable, Text, Meter, ResponsiveContext } from "grommet";
import { React } from "react";
import { useState, useContext } from "react";

function ResultTableComponent(props) {
  const [sort, setSort] = useState({
    property: "bet",
    direction: "desc",
  });
  const size = useContext(ResponsiveContext);

  return (
    <>
      {size === "small" && (
        <Box
          gridArea="resultTable"
          background="#1B1B1B"
          align="center"
          pad="small"
          round="xsmall"
          animation={{ type: "fadeIn", duration: 390 }}
        >
          <Box overflow="auto" fill={true} background="#171717">
            <DataTable
              alignSelf="center"
              step={50}
              show={10}
              sort={sort}
              onSort={setSort}
              background={{
                header: { color: "#171717", opacity: "medium" },
                body: ["#171717", "#1E1E1E"],
                footer: { color: "dark-3", opacity: "strong" },
              }}
              columns={[
                {
                  property: "user",

                  header: (
                    <Text weight="bold" size="9px">
                      USER
                    </Text>
                  ),
                  primary: true,
                  verticalAlign: "middle",
                  render: function (datum) {
                    return (
                      <Text truncate weight="bold" color="#EDEDED" size="8px">
                        {datum.user}
                      </Text>
                    );
                  },
                },
                {
                  property: "at",
                  header: (
                    <Text weight="bold" size="9px">
                      @
                    </Text>
                  ),
                  primary: false,
                  verticalAlign: "middle",
                  render: function (datum) {
                    if (datum.profit >= 0) {
                      return (
                        <Text truncate weight="bold" color="#00C781" size="8px">
                          {datum.at}
                        </Text>
                      );
                    } else {
                      return (
                        <Text truncate weight="bold" color="#FF4040" size="8px">
                          {datum.at}
                        </Text>
                      );
                    }
                  },
                },
                {
                  property: "bet",
                  header: (
                    <Text weight="bold" size="9px">
                      BET
                    </Text>
                  ),
                  primary: false,
                  verticalAlign: "middle",
                  render: function (datum) {
                    return (
                      <Text truncate weight="bold" color="#EDEDED" size="8px">
                        {datum.bet}
                      </Text>
                    );
                  },
                },
                {
                  property: "profit",
                  header: (
                    <Text weight="bold" size="9px">
                      PROFIT
                    </Text>
                  ),
                  primary: false,
                  verticalAlign: "middle",
                  render: function (datum) {
                    if (datum.profit >= 0) {
                      return (
                        <Text truncate weight="bold" color="#00C781" size="8px">
                          {datum.profit}
                        </Text>
                      );
                    } else {
                      return (
                        <Text truncate weight="bold" color="#FF4040" size="8px">
                          {datum.profit}
                        </Text>
                      );
                    }
                  },
                },
                {
                  property: "bravery",
                  header: (
                    <Text weight="bold" size="9px">
                      BRAVERY
                    </Text>
                  ),
                  verticalAlign: "middle",
                  render: (datum) => (
                    <Box pad={{ vertical: "xsmall" }}>
                      <Meter
                        values={[{ value: datum.bravery, color: props.color }]}
                        thickness="small"
                        size="xxsmall"
                        background="#1B1B1B"
                      />
                    </Box>
                  ),
                },
              ]}
              data={props.resultTableAll}
            />
          </Box>
        </Box>
      )}
      {size === "medium" && (
        <Box
          gridArea="resultTable"
          background="#1B1B1B"
          align="center"
          pad="small"
          round="xsmall"
          animation={{ type: "fadeIn", duration: 390 }}
        >
          <Box overflow="auto" fill={true} background="#171717">
            <DataTable
              alignSelf="center"
              step={50}
              show={10}
              sort={sort}
              onSort={setSort}
              background={{
                header: { color: "#171717", opacity: "medium" },
                body: ["#171717", "#1E1E1E"],
                footer: { color: "dark-3", opacity: "strong" },
              }}
              columns={[
                {
                  property: "user",
                  header: (
                    <Text weight="bold" size="small">
                      USER
                    </Text>
                  ),
                  primary: true,
                  verticalAlign: "middle",
                  render: function (datum) {
                    return (
                      <Text
                        truncate
                        weight="bold"
                        color="#EDEDED"
                        size="xsmall"
                      >
                        {datum.user}
                      </Text>
                    );
                  },
                },
                {
                  property: "at",
                  header: (
                    <Text weight="bold" size="small">
                      @
                    </Text>
                  ),
                  primary: false,
                  verticalAlign: "middle",
                  render: function (datum) {
                    if (datum.profit >= 0) {
                      return (
                        <Text
                          truncate
                          weight="bold"
                          color="#00C781"
                          size="xsmall"
                        >
                          {datum.at}
                        </Text>
                      );
                    } else {
                      return (
                        <Text
                          truncate
                          weight="bold"
                          color="#FF4040"
                          size="xsmall"
                        >
                          {datum.at}
                        </Text>
                      );
                    }
                  },
                },
                {
                  property: "bet",
                  header: (
                    <Text weight="bold" size="small">
                      BET
                    </Text>
                  ),
                  primary: false,
                  verticalAlign: "middle",
                  render: function (datum) {
                    return (
                      <Text
                        truncate
                        weight="bold"
                        color="#EDEDED"
                        size="xsmall"
                      >
                        {datum.bet}
                      </Text>
                    );
                  },
                },
                {
                  property: "profit",
                  header: (
                    <Text weight="bold" size="small">
                      PROFIT
                    </Text>
                  ),
                  primary: false,
                  verticalAlign: "middle",
                  render: function (datum) {
                    if (datum.profit >= 0) {
                      return (
                        <Text
                          truncate
                          weight="bold"
                          color="#00C781"
                          size="xsmall"
                        >
                          {datum.profit}
                        </Text>
                      );
                    } else {
                      return (
                        <Text
                          truncate
                          weight="bold"
                          color="#FF4040"
                          size="xsmall"
                        >
                          {datum.profit}
                        </Text>
                      );
                    }
                  },
                },
                {
                  property: "bravery",
                  header: (
                    <Text weight="bold" size="small">
                      BRAVERY
                    </Text>
                  ),
                  verticalAlign: "middle",
                  render: (datum) => (
                    <Box pad={{ vertical: "xsmall" }}>
                      <Meter
                        values={[{ value: datum.bravery, color: props.color }]}
                        thickness="small"
                        size="small"
                        background="#1B1B1B"
                      />
                    </Box>
                  ),
                },
              ]}
              data={props.resultTableAll}
            />
          </Box>
        </Box>
      )}
      {(size === "large" || size === "xlarge") && (
        <Box
          gridArea="resultTable"
          background="#1B1B1B"
          align="center"
          pad="small"
          round="xsmall"
          animation={{ type: "fadeIn", duration: 390 }}
        >
          <Box overflow="auto" fill={true} background="#171717">
            <DataTable
              alignSelf="center"
              step={50}
              show={10}
              sort={sort}
              onSort={setSort}
              background={{
                header: { color: "#171717", opacity: "medium" },
                body: ["#171717", "#1E1E1E"],
                footer: { color: "dark-3", opacity: "strong" },
              }}
              columns={[
                {
                  property: "user",
                  header: <Text weight="bold">USER</Text>,
                  primary: true,
                  verticalAlign: "middle",
                  render: function (datum) {
                    return (
                      <Text truncate weight="bold" color="#EDEDED">
                        {datum.user}
                      </Text>
                    );
                  },
                },
                {
                  property: "at",
                  header: <Text weight="bold">@</Text>,
                  primary: false,
                  verticalAlign: "middle",
                  render: function (datum) {
                    if (datum.profit >= 0) {
                      return (
                        <Text truncate weight="bold" color="#00C781">
                          {datum.at}
                        </Text>
                      );
                    } else {
                      return (
                        <Text truncate weight="bold" color="#FF4040">
                          {datum.at}
                        </Text>
                      );
                    }
                  },
                },
                {
                  property: "bet",
                  header: <Text weight="bold">BET</Text>,
                  primary: false,
                  verticalAlign: "middle",
                  render: function (datum) {
                    return (
                      <Text truncate weight="bold" color="#EDEDED">
                        {datum.bet}
                      </Text>
                    );
                  },
                },
                {
                  property: "profit",
                  header: <Text weight="bold">PROFIT</Text>,
                  primary: false,
                  verticalAlign: "middle",
                  render: function (datum) {
                    if (datum.profit >= 0) {
                      return (
                        <Text truncate weight="bold" color="#00C781">
                          {datum.profit}
                        </Text>
                      );
                    } else {
                      return (
                        <Text truncate weight="bold" color="#FF4040">
                          {datum.profit}
                        </Text>
                      );
                    }
                  },
                },
                {
                  property: "bravery",
                  header: <Text weight="bold">BRAVERY</Text>,
                  verticalAlign: "middle",
                  render: (datum) => (
                    <Box pad={{ vertical: "xsmall" }}>
                      <Meter
                        values={[{ value: datum.bravery, color: props.color }]}
                        thickness="small"
                        size="small"
                        background="#1B1B1B"
                      />
                    </Box>
                  ),
                },
              ]}
              data={props.resultTableAll}
            />
          </Box>
        </Box>
      )}
    </>
  );
}

export default ResultTableComponent;
