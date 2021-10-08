import {
  Header,
  Anchor,
  Box,
  ResponsiveContext,
  Menu,
  Button,
  Text,
} from "grommet";
import { Money, Cube, Magic } from "grommet-icons";
import { User } from "grommet-icons";
import { Alert } from "grommet-icons";
import { useContext } from "react";

function HeaderComponent(props) {
  const size = useContext(ResponsiveContext);

  return (
    <>
      {size === "small" && (
        <>
          <Header background="#171717" pad="medium" height="55px">
            <Box animation="slideRight">
              <Button
                secondary
                label={<Text size="xlarge">CRASH</Text>}
                justify="center"
                color={props.color}
                background="#171717"
              />
            </Box>
            <Box justify="end" background="#171717">
              <Menu
                a11yTitle="Navigation Menu"
                dropProps={{ align: { top: "bottom", right: "right" } }}
                icon={<Cube size="medium" color={props.color} />}
                items={[
                  {
                    label: (
                      <Box animation="fadeIn">
                        <Button
                          primary
                          color={props.color}
                          icon={<Money />}
                          label="BUY $ITM"
                        />
                      </Box>
                    ),
                    href: "https://pancakeswap.finance/swap#/swap?outputCurrency=0xee409bb2b8874eb5b077f4f83f91a390df82adad",
                  },
                  {
                    label: (
                      <>
                        {props.playerExistsInDB === false && !props.loggedIn && (
                          <Box animation="fadeIn">
                            <Anchor
                              label={
                                <Button
                                  icon={<Magic />}
                                  color={props.color}
                                  secondary
                                  label="INSTALL METAMASK"
                                  gap="small"
                                />
                              }
                              href="https://metamask.io/download.html"
                            />
                          </Box>
                        )}
                        {props.playerExistsInDB === false && props.loggedIn && (
                          <Box animation="fadeIn">
                            <Button
                              icon={<User />}
                              secondary
                              color={props.color}
                              label={
                                props.accounts[0].substring(0, 6) +
                                "..." +
                                props.accounts[0].substring(
                                  props.accounts[0].length - 4,
                                  props.accounts[0].length
                                )
                              }
                              gap="small"
                            />
                          </Box>
                        )}
                        {props.playerExistsInDB === true && props.loggedIn && (
                          <Box
                            direction="row"
                            gap="small"
                            alignSelf="center"
                            justify="center"
                            animation="fadeIn"
                          >
                            <Button
                              icon={<User />}
                              secondary
                              color={props.color}
                              label={
                                props.userName +
                                ": " +
                                props.accounts[0].substring(0, 6) +
                                "..." +
                                props.accounts[0].substring(
                                  props.accounts[0].length - 4,
                                  props.accounts[0].length
                                )
                              }
                              gap="small"
                            />
                          </Box>
                        )}
                      </>
                    ),
                  },
                ]}
              />
            </Box>
          </Header>
        </>
      )}
      {size === "medium" && (
        <>
          <Header background="#171717" pad="medium" height="67px">
            <Box animation="slideRight">
              <Button
                secondary
                color={props.color}
                label={<Text size="xlarge">CRASH</Text>}
                justify="center"
                background="#171717"
              />
            </Box>
            <Box justify="end" direction="row" gap="medium">
              <Box animation="fadeIn">
                <Anchor
                  label={
                    <Button
                      primary
                      color={props.color}
                      icon={<Money />}
                      label={<Text size="small">BUY $ITM</Text>}
                    />
                  }
                  href="https://pancakeswap.finance/swap#/swap?outputCurrency=0xee409bb2b8874eb5b077f4f83f91a390df82adad"
                />
              </Box>
              {!props.loggedIn ? (
                <Box animation="fadeIn">
                  <Anchor
                    label={
                      <Button
                        secondary
                        color={props.color}
                        icon={<Alert />}
                        disabled={true}
                        label={
                          <Text size="small">
                            You must be connected with MetaMask to play!
                          </Text>
                        }
                        onClick={() => props.logIn()}
                      />
                    }
                  />
                </Box>
              ) : (
                <>
                  {props.playerExistsInDB === false && (
                    <Box animation="fadeIn">
                      <Button
                        icon={<User />}
                        color={props.color}
                        secondary
                        label={
                          <Text size="small">
                            {props.accounts[0].substring(0, 6) +
                              "..." +
                              props.accounts[0].substring(
                                props.accounts[0].length - 4,
                                props.accounts[0].length
                              )}
                          </Text>
                        }
                        gap="small"
                      />
                    </Box>
                  )}
                  {props.playerExistsInDB === true && (
                    <Box
                      direction="row"
                      gap="small"
                      alignSelf="center"
                      justify="center"
                      animation="slideLeft"
                    >
                      <Button
                        icon={<User />}
                        secondary
                        color={props.color}
                        label={
                          <Text size="small">
                            {" "}
                            {props.userName +
                              ": " +
                              props.accounts[0].substring(0, 6) +
                              "..." +
                              props.accounts[0].substring(
                                props.accounts[0].length - 4,
                                props.accounts[0].length
                              )}
                          </Text>
                        }
                        gap="small"
                      />
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Header>
        </>
      )}
      {(size === "large" || size === "xlarge") && (
        <>
          <Header background="#171717" pad="medium" height="77px">
            <Box animation="slideRight">
              <Button
                secondary
                size="xxlarge"
                label="CRASH"
                justify="center"
                background="#171717"
                color={props.color}
              />
            </Box>
            <Box justify="end" direction="row" gap="medium">
              <Box animation="fadeIn">
                <Anchor
                  label={
                    <Button
                      primary
                      color={props.color}
                      icon={<Money />}
                      label="BUY $ITM"
                    />
                  }
                  href="https://pancakeswap.finance/swap#/swap?outputCurrency=0xee409bb2b8874eb5b077f4f83f91a390df82adad"
                />
              </Box>
              {!props.loggedIn ? (
                <Box animation="fadeIn">
                  <Anchor
                    label={
                      <Button
                        secondary
                        icon={<Alert />}
                        color={props.color}
                        disabled={true}
                        label="You must be connected with MetaMask to play!"
                        onClick={() => props.logIn()}
                      />
                    }
                  />
                </Box>
              ) : (
                <>
                  {props.playerExistsInDB === false && (
                    <Box animation="fadeIn">
                      <Button
                        icon={<User />}
                        secondary
                        color={props.color}
                        label={
                          props.accounts[0].substring(0, 6) +
                          "..." +
                          props.accounts[0].substring(
                            props.accounts[0].length - 4,
                            props.accounts[0].length
                          )
                        }
                        gap="small"
                      />
                    </Box>
                  )}
                  {props.playerExistsInDB === true && (
                    <Box
                      direction="row"
                      gap="small"
                      alignSelf="center"
                      justify="center"
                      animation="slideLeft"
                    >
                      <Button
                        icon={<User />}
                        secondary
                        color={props.color}
                        label={
                          props.userName +
                          ": " +
                          props.accounts[0].substring(0, 6) +
                          "..." +
                          props.accounts[0].substring(
                            props.accounts[0].length - 4,
                            props.accounts[0].length
                          )
                        }
                        gap="small"
                      />
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Header>
        </>
      )}
    </>
  );
}

export default HeaderComponent;
