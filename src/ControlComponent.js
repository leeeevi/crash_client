import {
  Box,
  Grid,
  Button,
  TextInput,
  Form,
  FormField,
  Text,
  ResponsiveContext,
} from "grommet";
import { Atm, Launch, Achievement, Time } from "grommet-icons";
import { React } from "react";
import { useState, useContext } from "react";
import ConnectMetaMask from "./ConnectMetaMask";

const suggestionsBet = [
  "1k $ITM",
  "10k $ITM",
  "100k $ITM",
  "1m $ITM",
  "10m $ITM",
  "100m $ITM",
];
const suggestionsAutoBet = ["1.2x", "1.5x", "2x", "5x", "8x", "10x"];

function ControlComponent(props) {
  const [valueBet, setValueBet] = useState(undefined);
  const [valueAutoBet, setValueAutoBet] = useState(undefined);
  const size = useContext(ResponsiveContext);

  const onSuggestionSelectBet = (event) => {
    switch (event.suggestion) {
      case "1k $ITM":
        setValueBet(1000);
        break;
      case "10k $ITM":
        setValueBet(10000);
        break;
      case "100k $ITM":
        setValueBet(100000);
        break;
      case "1m $ITM":
        setValueBet(1000000);
        break;
      case "10m $ITM":
        setValueBet(10000000);
        break;
      case "100m $ITM":
        setValueBet(100000000);
        break;
      default:
        setValueBet("");
    }
  };

  const onSuggestionSelectAutoBet = (event) => {
    switch (event.suggestion) {
      case "1.2x":
        setValueAutoBet(1.2);
        break;
      case "1.5x":
        setValueAutoBet(1.5);
        break;
      case "2x":
        setValueAutoBet(2);
        break;
      case "5x":
        setValueAutoBet(5);
        break;
      case "8x":
        setValueAutoBet(8);
        break;
      case "10x":
        setValueAutoBet(10);
        break;
      default:
        setValueAutoBet("");
    }
  };

  if (!props.isReady()) {
    return (
      <ConnectMetaMask
        setAccounts={props.setAccounts}
        setChainId={props.setChainId}
        setWeb3={props.setWeb3}
        setInitiatedLogIn={props.setInitiatedLogIn}
        setLoggedIn={props.setLoggedIn}
        color={props.color}
        metaMaskInstalled={props.metaMaskInstalled}
      />
    );
  } else {
    return (
      <>
        {size === "small" && (
          <Box
            gridArea="betting"
            background="#171717"
            align="center"
            justify="center"
            round="xsmall"
            pad="large"
            border={{ color: "#1B1B1B", size: "large" }}
          >
            <Grid
              columns={{
                count: 1,
                size: "auto",
              }}
              gap="xsmall"
            >
              {props.state === "BETTING" && (
                <>
                  {props.userPlacedBet === false && (
                    <Form
                      gap="xsmall"
                      onSubmit={({ value }) => {
                        props.placeBet(value);
                        setValueBet(undefined);
                        setValueAutoBet(undefined);
                      }}
                    >
                      <Box
                        direction="column"
                        gap="xsmall"
                        pad="xsmall"
                        animation={{ type: "fadeIn", duration: 390 }}
                      >
                        <FormField
                          required={true}
                          name="betAmount"
                          htmlFor="textinput-id"
                        >
                          <TextInput
                            size="small"
                            name="betAmount"
                            placeholder="Bet Amount"
                            suggestions={suggestionsBet}
                            value={valueBet}
                            onSuggestionSelect={onSuggestionSelectBet}
                            onChange={(event) =>
                              setValueBet(event.target.value)
                            }
                            icon={
                              <Text
                                weight="bold"
                                size="medium"
                                color={props.color}
                              >
                                $ITM
                              </Text>
                            }
                            reverse
                          />
                        </FormField>

                        <FormField
                          name="autoCashOut"
                          size="xsmall"
                          htmlFor="textinput-id"
                        >
                          <TextInput
                            size="small"
                            name="autoCashOut"
                            placeholder="Auto Cash Out"
                            suggestions={suggestionsAutoBet}
                            value={valueAutoBet}
                            onSuggestionSelect={onSuggestionSelectAutoBet}
                            onChange={(event) =>
                              setValueAutoBet(event.target.value)
                            }
                            icon={
                              <Text
                                color={props.color}
                                weight="bold"
                                size="medium"
                              >
                                x
                              </Text>
                            }
                            reverse
                          />
                        </FormField>
                        <Box animation={[{ type: "fadeIn", duration: 390 }]}>
                          <Button
                            secondary
                            fill={true}
                            type="submit"
                            icon={<Launch />}
                            label="PLACE BET"
                            color={props.color}
                          />
                        </Box>
                      </Box>
                    </Form>
                  )}
                  {props.userPlacedBet === true && (
                    <Box
                      direction="row"
                      gap="small"
                      alignSelf="center"
                      justify="center"
                      pad="medium"
                      responsive={true}
                    >
                      <Box
                        animation={[{ type: "fadeIn", duration: 390 }]}
                        responsive={true}
                      >
                        <Button
                          secondary
                          icon={<Time size="large" />}
                          label={
                            <Text size="large" textAlign="center">
                              BE READY! THE GAME STARTS SOON...
                            </Text>
                          }
                          gap="small"
                          color={props.color}
                        />
                      </Box>
                    </Box>
                  )}
                </>
              )}
              {props.state === "PLAYING" && (
                <>
                  {props.userPlacedBet === true && (
                    <>
                      {props.userWon === false && props.userCrashed === false && (
                        <Form>
                          <Box
                            direction="column"
                            gap="medium"
                            responsive={true}
                          >
                            <Button
                              primary
                              color={props.cashOutColor}
                              icon={<Atm />}
                              label="CASH OUT"
                              onClick={() => props.initiateCashOut()}
                            />
                          </Box>
                        </Form>
                      )}
                      {props.userWon === true && props.userCrashed === false && (
                        <Box
                          direction="column"
                          gap="small"
                          alignSelf="center"
                          justify="center"
                          pad="medium"
                          animation="zoomOut"
                          responsive={true}
                        >
                          <Button
                            primary
                            color={props.color}
                            label="CASHED OUT!"
                            gap="small"
                            icon={<Achievement size="medium" />}
                          />

                          <Button
                            secondary
                            color={props.color}
                            label={<Text>{props.wonAmount} $ITM</Text>}
                            gap="small"
                          />
                          <Text
                            weight="bold"
                            textAlign="center"
                            color="#AAAAAA"
                            size="small"
                          >
                            You'll receive your $ITM tokens shortly.
                          </Text>
                        </Box>
                      )}
                    </>
                  )}
                  {props.userPlacedBet === false && (
                    <Box
                      direction="row"
                      gap="small"
                      alignSelf="center"
                      justify="center"
                      pad="medium"
                      responsive={true}
                    >
                      <Button
                        secondary
                        color={props.color}
                        label="TAKE YOUR CHANCE IN THE NEXT ROUND!"
                        gap="small"
                        round={false}
                      />
                    </Box>
                  )}
                </>
              )}
              {props.state === "CRASHED" && (
                <>
                  {props.userPlacedBet === true && props.userWon === false && (
                    <Box
                      direction="column"
                      gap="small"
                      alignSelf="center"
                      justify="center"
                      pad="medium"
                      responsive={true}
                    >
                      <Button
                        secondray
                        color={props.color}
                        label="CRASHED!"
                        gap="small"
                      />
                    </Box>
                  )}
                  {props.userPlacedBet === true && props.userWon === true && (
                    <Box
                      direction="column"
                      gap="small"
                      alignSelf="center"
                      justify="center"
                      pad="medium"
                      responsive={true}
                    >
                      <Button
                        primary
                        color={props.color}
                        label="CASHED OUT!"
                        gap="small"
                        icon={<Achievement size="medium" />}
                      />

                      <Button
                        secondary
                        color={props.color}
                        label={
                          <Text size="xlarge">
                            {props.wonAmount}{" "}
                            <Text size="xlarge" color={props.color}>
                              $ITM
                            </Text>
                          </Text>
                        }
                        gap="small"
                      />
                      <Text
                        size="medium"
                        weight="bold"
                        textAlign="center"
                        color="#AAAAAA"
                      >
                        You'll receive your{" "}
                        <Text size="medium" color={props.color}>
                          $ITM
                        </Text>{" "}
                        tokens shortly.
                      </Text>
                    </Box>
                  )}
                  {props.userPlacedBet === false && (
                    <Box
                      direction="row"
                      gap="small"
                      alignSelf="center"
                      justify="center"
                      pad="medium"
                      responsive={true}
                    >
                      <Button
                        secondary
                        color={props.color}
                        label="TAKE YOUR CHANCE IN THE NEXT ROUND!"
                        gap="small"
                      />
                    </Box>
                  )}
                </>
              )}
            </Grid>
          </Box>
        )}
        {size === "medium" && (
          <Box
            gridArea="betting"
            background="#171717"
            align="center"
            justify="center"
            round="xsmall"
            pad="medium"
            border={{ color: "#1B1B1B", size: "large" }}
          >
            <Grid
              columns={{
                count: 1,
                size: "auto",
              }}
              gap="xsmall"
            >
              {props.state === "BETTING" && (
                <>
                  {props.userPlacedBet === false && (
                    <Form
                      onSubmit={({ value }) => {
                        props.placeBet(value);
                        setValueBet(undefined);
                        setValueAutoBet(undefined);
                      }}
                    >
                      <Box
                        direction="column"
                        gap="xxsmall"
                        pad="xsmall"
                        animation={{ type: "fadeIn", duration: 390 }}
                      >
                        <FormField
                          required={true}
                          name="betAmount"
                          htmlFor="textinput-id"
                        >
                          <TextInput
                            size="small"
                            name="betAmount"
                            placeholder="Bet Amount"
                            suggestions={suggestionsBet}
                            value={valueBet}
                            onSuggestionSelect={onSuggestionSelectBet}
                            onChange={(event) =>
                              setValueBet(event.target.value)
                            }
                            icon={
                              <Text
                                color={props.color}
                                weight="bold"
                                size="medium"
                              >
                                $ITM
                              </Text>
                            }
                            reverse
                          />
                        </FormField>
                        <FormField name="autoCashOut" htmlFor="textinput-id">
                          <TextInput
                            name="autoCashOut"
                            size="small"
                            placeholder="Auto Cash Out"
                            suggestions={suggestionsAutoBet}
                            value={valueAutoBet}
                            onSuggestionSelect={onSuggestionSelectAutoBet}
                            onChange={(event) =>
                              setValueAutoBet(event.target.value)
                            }
                            icon={
                              <Text
                                color={props.color}
                                weight="bold"
                                size="medium"
                              >
                                x
                              </Text>
                            }
                            reverse
                          />
                        </FormField>
                        <Box gap="small" animation={[{ type: "zoomOut" }]}>
                          <Button
                            secondary
                            fill={true}
                            type="submit"
                            icon={<Launch />}
                            label="PLACE BET"
                            color={props.color}
                          />

                          <Button
                            primary
                            color={props.cashOutColor}
                            icon={<Atm />}
                            label="CASH OUT"
                            disabled={true}
                          />
                        </Box>
                      </Box>
                    </Form>
                  )}
                  {props.userPlacedBet === true && (
                    <Box
                      direction="row"
                      gap="small"
                      alignSelf="center"
                      justify="center"
                      pad="medium"
                      responsive={true}
                    >
                      <Box responsive={true}>
                        <Button
                          secondary
                          color={props.color}
                          icon={<Time size="large" />}
                          label={
                            <Text textAlign="center" size="small">
                              BE READY! THE GAME STARTS SOON...
                            </Text>
                          }
                          gap="small"
                        />
                      </Box>
                    </Box>
                  )}
                </>
              )}
              {props.state === "PLAYING" && (
                <>
                  {props.userPlacedBet === true && (
                    <>
                      {props.userWon === false && props.userCrashed === false && (
                        <Form>
                          <Box
                            direction="column"
                            gap="xxsmall"
                            responsive={true}
                          >
                            <FormField name="betAmount">
                              <TextInput
                                name="betAmount"
                                size="small"
                                placeholder="Bet Amount"
                                disabled={true}
                                value={valueBet}
                                icon={
                                  <Text
                                    color="#434343"
                                    weight="bold"
                                    size="medium"
                                  >
                                    $ITM
                                  </Text>
                                }
                                reverse
                              />
                            </FormField>
                            <FormField name="autoCashOut">
                              <TextInput
                                name="autoCashOut"
                                size="small"
                                placeholder="Auto Cash Out"
                                disabled={true}
                                value={valueAutoBet}
                                icon={
                                  <Text
                                    color="#434343"
                                    weight="bold"
                                    size="medium"
                                  >
                                    x
                                  </Text>
                                }
                                reverse
                              />
                            </FormField>
                            <Box gap="small" animation={[{ type: "zoomOut" }]}>
                              <Button
                                secondary
                                type="submit"
                                icon={<Launch />}
                                label="PLACE BET"
                                disabled={true}
                              />

                              <Button
                                primary
                                color={props.cashOutColor}
                                icon={<Atm />}
                                label="CASH OUT"
                                onClick={() => props.initiateCashOut()}
                              />
                            </Box>
                          </Box>
                        </Form>
                      )}
                      {props.userWon === true && props.userCrashed === false && (
                        <Box
                          direction="column"
                          gap="small"
                          alignSelf="center"
                          justify="center"
                          pad="small"
                          animation="zoomOut"
                          responsive={true}
                        >
                          <Button
                            primary
                            color={props.color}
                            label={<Text size="medium">CASHED OUT!</Text>}
                            gap="small"
                            icon={<Achievement size="medium" />}
                          />

                          <Button
                            secondary
                            color={props.color}
                            label={
                              <Text size="medium">
                                {props.wonAmount}{" "}
                                <Text size="medium" color={props.color}>
                                  $ITM
                                </Text>
                              </Text>
                            }
                            gap="small"
                          />
                          <Text
                            size="small"
                            weight="bold"
                            textAlign="center"
                            color="#AAAAAA"
                          >
                            You'll receive your{" "}
                            <Text size="small" color={props.color}>
                              $ITM
                            </Text>{" "}
                            tokens shortly.
                          </Text>
                        </Box>
                      )}
                    </>
                  )}
                  {props.userPlacedBet === false && (
                    <Box
                      direction="row"
                      gap="small"
                      alignSelf="center"
                      justify="center"
                      pad="medium"
                      responsive={true}
                    >
                      <Button
                        secondary
                        color={props.color}
                        label="TAKE YOUR CHANCE IN THE NEXT ROUND!"
                        gap="small"
                        round={false}
                      />
                    </Box>
                  )}
                </>
              )}
              {props.state === "CRASHED" && (
                <>
                  {props.userPlacedBet === true && props.userWon === false && (
                    <Box
                      direction="column"
                      gap="small"
                      alignSelf="center"
                      justify="center"
                      pad="medium"
                      responsive={true}
                    >
                      <Button
                        secondray
                        color={props.cashOutColor}
                        label={<Text size="xlarge">CRASHED!</Text>}
                        gap="small"
                      />
                    </Box>
                  )}
                  {props.userPlacedBet === true && props.userWon === true && (
                    <Box
                      direction="column"
                      gap="small"
                      alignSelf="center"
                      justify="center"
                      pad="small"
                      animation="zoomOut"
                      responsive={true}
                    >
                      <Button
                        primary
                        color={props.color}
                        label={<Text size="medium">CASHED OUT!</Text>}
                        gap="small"
                        icon={<Achievement size="medium" />}
                      />

                      <Button
                        secondary
                        color={props.color}
                        label={
                          <Text size="medium">
                            {props.wonAmount}{" "}
                            <Text size="medium" color={props.color}>
                              $ITM
                            </Text>
                          </Text>
                        }
                        gap="small"
                      />
                      <Text
                        size="small"
                        weight="bold"
                        textAlign="center"
                        color="#AAAAAA"
                      >
                        You'll receive your{" "}
                        <Text size="small" color={props.color}>
                          $ITM
                        </Text>{" "}
                        tokens shortly.
                      </Text>
                    </Box>
                  )}
                  {props.userPlacedBet === false && (
                    <Box
                      direction="row"
                      gap="small"
                      alignSelf="center"
                      justify="center"
                      pad="medium"
                      responsive={true}
                    >
                      <Button
                        secondary
                        color={props.color}
                        label="TAKE YOUR CHANCE IN THE NEXT ROUND!"
                        gap="small"
                      />
                    </Box>
                  )}
                </>
              )}
            </Grid>
          </Box>
        )}
        {(size === "large" || size === "xlarge") && (
          <Box
            gridArea="betting"
            background="#171717"
            align="center"
            justify="center"
            round="xsmall"
            pad="medium"
            border={{ color: "#1B1B1B", size: "large" }}
          >
            <Grid
              columns={{
                count: 1,
                size: "auto",
              }}
              gap="xsmall"
            >
              {props.state === "BETTING" && (
                <>
                  {props.userPlacedBet === false && (
                    <Form
                      onSubmit={({ value }) => {
                        props.placeBet(value);
                        setValueBet(undefined);
                        setValueAutoBet(undefined);
                      }}
                    >
                      <Box
                        direction="column"
                        gap="small"
                        pad="xsmall"
                        animation={{ type: "fadeIn", duration: 390 }}
                      >
                        <FormField
                          required={true}
                          name="betAmount"
                          htmlFor="textinput-id"
                        >
                          <TextInput
                            name="betAmount"
                            placeholder="Bet Amount"
                            suggestions={suggestionsBet}
                            value={valueBet}
                            onSuggestionSelect={onSuggestionSelectBet}
                            onChange={(event) =>
                              setValueBet(event.target.value)
                            }
                            icon={
                              <Text
                                color={props.color}
                                weight="bold"
                                size="large"
                              >
                                $ITM
                              </Text>
                            }
                            reverse
                          />
                        </FormField>
                        <FormField name="autoCashOut" htmlFor="textinput-id">
                          <TextInput
                            name="autoCashOut"
                            placeholder="Auto Cash Out"
                            suggestions={suggestionsAutoBet}
                            value={valueAutoBet}
                            onSuggestionSelect={onSuggestionSelectAutoBet}
                            onChange={(event) =>
                              setValueAutoBet(event.target.value)
                            }
                            icon={
                              <Text
                                color={props.color}
                                weight="bold"
                                size="large"
                              >
                                x
                              </Text>
                            }
                            reverse
                          />
                        </FormField>
                        <Box animation={[{ type: "zoomOut" }]}>
                          <Button
                            secondary
                            fill={true}
                            type="submit"
                            icon={<Launch />}
                            label="PLACE BET"
                            color={props.color}
                          />
                        </Box>
                        <Button
                          primary
                          color={props.cashOutColor}
                          icon={<Atm />}
                          label="CASH OUT"
                          disabled={true}
                        />
                      </Box>
                    </Form>
                  )}
                  {props.userPlacedBet === true && (
                    <Box
                      direction="row"
                      gap="small"
                      alignSelf="center"
                      justify="center"
                      pad="medium"
                      responsive={true}
                    >
                      <Box responsive={true}>
                        <Button
                          secondary
                          color={props.color}
                          icon={<Time size="large" />}
                          label={
                            <Text size="large" textAlign="center">
                              BE READY! THE GAME STARTS SOON...
                            </Text>
                          }
                          gap="small"
                        />
                      </Box>
                    </Box>
                  )}
                </>
              )}
              {props.state === "PLAYING" && (
                <>
                  {props.userPlacedBet === true && (
                    <>
                      {props.userWon === false && props.userCrashed === false && (
                        <Form>
                          <Box direction="column" gap="small" responsive={true}>
                            <FormField name="betAmount">
                              <TextInput
                                name="betAmount"
                                placeholder="Bet Amount"
                                disabled={true}
                                value={valueBet}
                                icon={
                                  <Text
                                    color="#434343"
                                    weight="bold"
                                    size="large"
                                  >
                                    $ITM
                                  </Text>
                                }
                                reverse
                              />
                            </FormField>
                            <FormField name="autoCashOut">
                              <TextInput
                                name="autoCashOut"
                                placeholder="Auto Cash Out"
                                disabled={true}
                                value={valueAutoBet}
                                icon={
                                  <Text
                                    color="#434343"
                                    weight="bold"
                                    size="large"
                                  >
                                    x
                                  </Text>
                                }
                                reverse
                              />
                            </FormField>
                            <Button
                              secondary
                              type="submit"
                              icon={<Launch />}
                              label="PLACE BET"
                              disabled={true}
                            />

                            <Button
                              primary
                              color={props.cashOutColor}
                              icon={<Atm />}
                              label="CASH OUT"
                              onClick={() => props.initiateCashOut()}
                            />
                          </Box>
                        </Form>
                      )}
                      {props.userWon === true && props.userCrashed === false && (
                        <Box
                          direction="column"
                          gap="small"
                          alignSelf="center"
                          justify="center"
                          pad="medium"
                          animation="zoomOut"
                          responsive={true}
                        >
                          <Button
                            primary
                            color={props.color}
                            label="CASHED OUT!"
                            gap="small"
                            icon={<Achievement size="medium" />}
                          />

                          <Button
                            secondary
                            color={props.color}
                            label={
                              <Text size="xlarge">
                                {props.wonAmount}{" "}
                                <Text size="xlarge" color={props.color}>
                                  $ITM
                                </Text>
                              </Text>
                            }
                            gap="small"
                          />
                          <Text
                            size="medium"
                            weight="bold"
                            textAlign="center"
                            color="#AAAAAA"
                          >
                            You'll receive your{" "}
                            <Text color={props.color} size="medium">
                              $ITM
                            </Text>{" "}
                            tokens shortly.
                          </Text>
                        </Box>
                      )}
                    </>
                  )}
                  {props.userPlacedBet === false && (
                    <Box
                      direction="row"
                      gap="small"
                      alignSelf="center"
                      justify="center"
                      pad="medium"
                      responsive={true}
                    >
                      <Button
                        secondary
                        color={props.color}
                        label="TAKE YOUR CHANCE IN THE NEXT ROUND!"
                        gap="small"
                        round={false}
                      />
                    </Box>
                  )}
                </>
              )}
              {props.state === "CRASHED" && (
                <>
                  {props.userPlacedBet === true && props.userWon === false && (
                    <Box
                      direction="column"
                      gap="small"
                      alignSelf="center"
                      justify="center"
                      pad="medium"
                      responsive={true}
                    >
                      <Button
                        secondray
                        color={props.cashOutColor}
                        label="CRASHED!"
                        gap="small"
                      />
                    </Box>
                  )}
                  {props.userPlacedBet === true && props.userWon === true && (
                    <Box
                      direction="column"
                      gap="small"
                      alignSelf="center"
                      justify="center"
                      pad="medium"
                      responsive={true}
                    >
                      <Button
                        primary
                        color={props.color}
                        label="CASHED OUT!"
                        gap="small"
                        icon={<Achievement size="medium" />}
                      />

                      <Button
                        secondary
                        color={props.color}
                        label={
                          <Text size="xlarge">
                            {props.wonAmount}{" "}
                            <Text size="xlarge" color={props.color}>
                              $ITM
                            </Text>
                          </Text>
                        }
                        gap="small"
                      />
                      <Text
                        size="medium"
                        weight="bold"
                        textAlign="center"
                        color="#AAAAAA"
                      >
                        You'll receive your{" "}
                        <Text color={props.color} size="medium">
                          $ITM
                        </Text>{" "}
                        tokens shortly.
                      </Text>
                    </Box>
                  )}
                  {props.userPlacedBet === false && (
                    <Box
                      direction="row"
                      gap="small"
                      alignSelf="center"
                      justify="center"
                      pad="medium"
                      responsive={true}
                    >
                      <Button
                        secondary
                        color={props.color}
                        label="TAKE YOUR CHANCE IN THE NEXT ROUND!"
                        gap="small"
                      />
                    </Box>
                  )}
                </>
              )}
            </Grid>
          </Box>
        )}
      </>
    );
  }
}

export default ControlComponent;
