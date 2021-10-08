import React from "react";
import { TableRow, TableCell, Text, ResponsiveContext } from "grommet";
import { Grommet } from "grommet";
import "./App.css";

const customTheme = {
  table: {
    body: {
      pad: { vertical: "xxxsmall", horizontal: "xxsmall" },
    },
  },
};

class ChatMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentMessages: [],
    };
  }

  componentDidMount() {
    this.props.socket.on("messaging", (receivedMessages) => {
      if (this.state.recentMessages !== receivedMessages) {
        this.setState({ recentMessages: receivedMessages });
      }
    });
  }

  componentWillUnmount() {
    this.props.socket.off("messaging");
  }

  render() {
    return (
      <>
        <ResponsiveContext.Consumer>
          {(size) =>
            size === "small" && (
              <div className="messageBox">
                <Grommet theme={customTheme}>
                  {this.state.recentMessages &&
                    this.state.recentMessages.map((d) => (
                      <TableRow>
                        <TableCell size="xxxsmall" key={d.id}>
                          <TableCell key={d.id}>
                            <Text
                              color={this.props.color}
                              size="12px"
                              weight="bold"
                            >
                              {d.username}:{" "}
                            </Text>
                            <Text size="12px">{d.message}</Text>
                          </TableCell>
                        </TableCell>
                      </TableRow>
                    ))}
                </Grommet>
              </div>
            )
          }
        </ResponsiveContext.Consumer>
        <ResponsiveContext.Consumer>
          {(size) =>
            size === "medium" && (
              <div className="messageBox">
                <Grommet theme={customTheme}>
                  {this.state.recentMessages &&
                    this.state.recentMessages.map((d) => (
                      <TableRow>
                        <TableCell size="xxxsmall" key={d.id}>
                          <TableCell key={d.id}>
                            <Text
                              color={this.props.color}
                              size="xsmall"
                              weight="bold"
                            >
                              {d.username}:{" "}
                            </Text>
                            <Text size="xsmall">{d.message}</Text>
                          </TableCell>
                        </TableCell>
                      </TableRow>
                    ))}
                </Grommet>
              </div>
            )
          }
        </ResponsiveContext.Consumer>
        <ResponsiveContext.Consumer>
          {(size) =>
            (size === "large" || size === "xlarge") && (
              <div className="messageBox">
                <Grommet theme={customTheme}>
                  {this.state.recentMessages &&
                    this.state.recentMessages.map((d) => (
                      <TableRow>
                        <TableCell size="xxxsmall" key={d.id}>
                          <TableCell key={d.id}>
                            <Text
                              color={this.props.color}
                              size="small"
                              weight="bold"
                            >
                              {d.username}:{" "}
                            </Text>
                            <Text size="small">{d.message}</Text>
                          </TableCell>
                        </TableCell>
                      </TableRow>
                    ))}
                </Grommet>
              </div>
            )
          }
        </ResponsiveContext.Consumer>
      </>
    );
  }
}

export default ChatMessages;
