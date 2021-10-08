import {
  Box,
  Grid,
  Button,
  TextInput,
  Form,
  ResponsiveContext,
  Text,
} from "grommet";
import { Send, ChatOption } from "grommet-icons";
import { React, useState, useContext } from "react";
import "./App.css";
import ChatMessages from "./ChatMessages.js";

function ChatComponent(props) {
  const [value, setValue] = useState("");
  const size = useContext(ResponsiveContext);

  return (
    <>
      {size === "small" && (
        <Box
          gridArea="chat"
          background="#1B1B1B"
          justify="center"
          fill={true}
          round="xsmall"
          pad="small"
          animation="zoomOut"
        >
          <Box fill={true}>
            <Grid
              rows={["small", "xxsmall"]}
              columns={["auto"]}
              areas={[
                { name: "messagingBox", start: [0, 0], end: [0, 0] },
                { name: "sendingBox", start: [0, 1], end: [0, 1] },
              ]}
              gap="small"
            >
              {props.isReady() === true && props.userName === "" && (
                <>
                  <Box
                    justify="center"
                    align="center"
                    gap="small"
                    responsive={true}
                    background="#171717"
                  >
                    <Form
                      onSubmit={({ value }) => {
                        props.addPlayer(value.username);
                      }}
                    >
                      <Box
                        direction="row"
                        gap="small"
                        animation="fadeIn"
                        responsive={true}
                      >
                        <TextInput
                          name="username"
                          placeholder="Type Username..."
                          size="xsmall"
                        />
                        <Button
                          secondary
                          type="submit"
                          icon={<ChatOption />}
                          label="CHAT!"
                          alignSelf="stretch"
                          color={props.color}
                        />
                      </Box>
                    </Form>
                  </Box>

                  <Form
                    onSubmit={({ value }) => {
                      props.setMessage(value.message);
                      setValue("");
                    }}
                  >
                    <Box
                      gridArea="sendingBox"
                      direction="row"
                      gap="small"
                      fill={true}
                      animation="fadeIn"
                      responsive={true}
                    >
                      <TextInput
                        placeholder="Choose a username!"
                        size="small"
                        name="message"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        disabled={true}
                      />
                      <Button
                        secondary
                        type="submit"
                        icon={<Send />}
                        label={<Text size="small">SEND</Text>}
                        disabled={true}
                        color={props.color}
                        margin={{ bottom: "3px" }}
                      />
                    </Box>
                  </Form>
                </>
              )}
              {props.userName !== "" && props.isReady() === true && (
                <>
                  <Box animation="fadeIn" responsive={true}>
                    <ChatMessages socket={props.socket} color={props.color} />
                  </Box>
                  <Form
                    onSubmit={({ value }) => {
                      props.setMessage(value.message);
                      setValue("");
                    }}
                  >
                    <Box
                      gridArea="sendingBox"
                      direction="row"
                      gap="small"
                      fill={true}
                      justify="center"
                      animation="fadeIn"
                    >
                      <TextInput
                        placeholder="Type Here..."
                        size="small"
                        name="message"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                      />
                      <Button
                        secondary
                        type="submit"
                        icon={<Send />}
                        label={<Text size="small">SEND</Text>}
                        color={props.color}
                        margin={{ bottom: "3px" }}
                      />
                    </Box>
                  </Form>
                </>
              )}
              {props.userName === "" && props.isReady() === false && (
                <>
                  <ChatMessages socket={props.socket} color={props.color} />

                  <Box
                    gridArea="sendingBox"
                    direction="row"
                    gap="small"
                    fill={true}
                    justify="center"
                    animation="fadeIn"
                    responsive={true}
                  >
                    <TextInput
                      placeholder="Connect first!"
                      size="small"
                      disabled={true}
                    />
                    <Button
                      secondary
                      type="submit"
                      icon={<Send />}
                      label={<Text size="small">SEND</Text>}
                      disabled={true}
                      color={props.color}
                      margin={{ bottom: "3px" }}
                    />
                  </Box>
                </>
              )}
            </Grid>
          </Box>
        </Box>
      )}
      {size === "medium" && (
        <Box
          gridArea="chat"
          background="#1B1B1B"
          justify="center"
          fill={true}
          round="xsmall"
          pad="small"
          animation="zoomOut"
        >
          <Box fill={true}>
            <Grid
              rows={["230px", "xxsmall"]}
              columns={["auto"]}
              areas={[
                { name: "messagingBox", start: [0, 0], end: [0, 0] },
                { name: "sendingBox", start: [0, 1], end: [0, 1] },
              ]}
              gap="small"
              responsive
            >
              {props.isReady() === true && props.userName === "" && (
                <>
                  <Box
                    justify="center"
                    align="center"
                    gap="small"
                    responsive={true}
                    background="#171717"
                  >
                    <Form
                      onSubmit={({ value }) => {
                        props.addPlayer(value.username);
                      }}
                    >
                      <Box
                        direction="row"
                        gap="small"
                        animation="fadeIn"
                        responsive={true}
                      >
                        <TextInput
                          name="username"
                          placeholder="Type Username..."
                          size="small"
                        />
                        <Button
                          secondary
                          type="submit"
                          icon={<ChatOption />}
                          label="CHAT!"
                          alignSelf="stretch"
                          color={props.color}
                        />
                      </Box>
                    </Form>
                  </Box>

                  <Form
                    onSubmit={({ value }) => {
                      props.setMessage(value.message);
                      setValue("");
                    }}
                  >
                    <Box
                      gridArea="sendingBox"
                      direction="row"
                      gap="small"
                      fill={true}
                      justify="center"
                      animation="fadeIn"
                      responsive={true}
                    >
                      <TextInput
                        placeholder="You must choose a username to chat!"
                        size="small"
                        name="message"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        disabled={true}
                      />
                      <Button
                        secondary
                        type="submit"
                        icon={<Send />}
                        label={<Text size="small">SEND</Text>}
                        disabled={true}
                        color={props.color}
                        margin={{ bottom: "3px" }}
                      />
                    </Box>
                  </Form>
                </>
              )}
              {props.userName !== "" && props.isReady() === true && (
                <>
                  <Box animation="fadeIn" responsive={true}>
                    <ChatMessages socket={props.socket} color={props.color} />
                  </Box>
                  <Form
                    onSubmit={({ value }) => {
                      props.setMessage(value.message);
                      setValue("");
                    }}
                  >
                    <Box
                      gridArea="sendingBox"
                      direction="row"
                      gap="small"
                      fill={true}
                      justify="center"
                      animation="fadeIn"
                    >
                      <TextInput
                        placeholder="Type Here..."
                        size="small"
                        name="message"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                      />
                      <Button
                        secondary
                        type="submit"
                        icon={<Send />}
                        label={<Text size="small">SEND</Text>}
                        color={props.color}
                        margin={{ bottom: "3px" }}
                      />
                    </Box>
                  </Form>
                </>
              )}
              {props.userName === "" && props.isReady() === false && (
                <>
                  <ChatMessages socket={props.socket} color={props.color} />

                  <Box
                    gridArea="sendingBox"
                    direction="row"
                    gap="small"
                    fill={true}
                    justify="center"
                    animation="fadeIn"
                    responsive={true}
                    size="xxsmall"
                    align="stretch"
                  >
                    <TextInput
                      placeholder="You must be connected with MetaMask to chat!"
                      size="small"
                      disabled={true}
                      align="stretch"
                    />
                    <Button
                      secondary
                      type="submit"
                      icon={<Send />}
                      label={<Text size="small">SEND</Text>}
                      disabled={true}
                      color={props.color}
                      margin={{ bottom: "3px" }}
                    />
                  </Box>
                </>
              )}
            </Grid>
          </Box>
        </Box>
      )}
      {(size === "large" || size === "xlarge") && (
        <Box
          gridArea="chat"
          background="#1B1B1B"
          justify="center"
          fill={true}
          round="xsmall"
          pad="small"
          animation="zoomOut"
        >
          <Box fill={true}>
            <Grid
              rows={["330px", "xxsmall"]}
              columns={["auto"]}
              areas={[
                { name: "messagingBox", start: [0, 0], end: [0, 0] },
                { name: "sendingBox", start: [0, 1], end: [0, 1] },
              ]}
              gap="small"
            >
              {props.isReady() === true && props.userName === "" && (
                <>
                  <Box
                    justify="center"
                    align="center"
                    gap="small"
                    responsive={true}
                    background="#171717"
                  >
                    <Form
                      onSubmit={({ value }) => {
                        props.addPlayer(value.username);
                      }}
                    >
                      <Box
                        direction="row"
                        gap="small"
                        animation="fadeIn"
                        responsive={true}
                      >
                        <TextInput
                          name="username"
                          placeholder="Type Username..."
                          size="medium"
                        />
                        <Button
                          secondary
                          type="submit"
                          icon={<ChatOption />}
                          size="xlarge"
                          label="CHAT!"
                          alignSelf="stretch"
                          color={props.color}
                        />
                      </Box>
                    </Form>
                  </Box>

                  <Form
                    onSubmit={({ value }) => {
                      props.setMessage(value.message);
                      setValue("");
                    }}
                  >
                    <Box
                      gridArea="sendingBox"
                      direction="row"
                      gap="small"
                      fill={true}
                      justify="center"
                      animation="fadeIn"
                      responsive={true}
                    >
                      <TextInput
                        placeholder="You must choose a username to chat!"
                        size="medium"
                        name="message"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        disabled={true}
                      />
                      <Button
                        secondary
                        type="submit"
                        icon={<Send />}
                        label={<Text size="small">SEND</Text>}
                        disabled={true}
                        color={props.color}
                      />
                    </Box>
                  </Form>
                </>
              )}
              {props.userName !== "" && props.isReady() === true && (
                <>
                  <Box animation="fadeIn" responsive={true}>
                    <ChatMessages socket={props.socket} color={props.color} />
                  </Box>
                  <Form
                    onSubmit={({ value }) => {
                      props.setMessage(value.message);
                      setValue("");
                    }}
                  >
                    <Box
                      gridArea="sendingBox"
                      direction="row"
                      gap="small"
                      fill={true}
                      justify="center"
                      animation="fadeIn"
                    >
                      <TextInput
                        placeholder="Type Here..."
                        size="medium"
                        name="message"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                      />
                      <Button
                        secondary
                        type="submit"
                        icon={<Send />}
                        label={<Text size="small">SEND</Text>}
                        color={props.color}
                      />
                    </Box>
                  </Form>
                </>
              )}
              {props.userName === "" && props.isReady() === false && (
                <>
                  <ChatMessages socket={props.socket} color={props.color} />

                  <Box
                    gridArea="sendingBox"
                    direction="row"
                    gap="small"
                    fill={true}
                    justify="center"
                    animation="fadeIn"
                    responsive={true}
                  >
                    <TextInput
                      placeholder="You must be connected with MetaMask to chat!"
                      size="medium"
                      disabled={true}
                    />
                    <Button
                      secondary
                      type="submit"
                      icon={<Send />}
                      label={<Text size="small">SEND</Text>}
                      disabled={true}
                      color={props.color}
                    />
                  </Box>
                </>
              )}
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
}

export default ChatComponent;
