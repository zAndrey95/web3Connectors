// @ts-nocheck
import { capitalize } from "lodash";
import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import styled from "styled-components";
import Box from "../Box/Box";
import Flex from "../Box/Flex";
import { AddIcon, AutoRenewIcon, LogoIcon } from "../Svg";
import IconButton from "./IconButton";
import Button from "./Button";
import { scales, variants } from "./types";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {},
};

const Row = styled(Flex)`
  margin-bottom: 32px;
  & > button + button,
  & > a + a {
    margin-left: 16px;
  }
`;

export const Default: React.FC = () => {
  return (
    <>
      <Box>
        <button type="button">Unstyled Button</button>
      </Box>
      <Box>
        {Object.values(variants).map((variant) => {
          return (
            <Box key={variant}>
              {Object.values(scales).map((scale) => {
                return (
                  <Button key={scale} variant={variant} scale={scale}>
                    {`${capitalize(variant)} ${scale.toUpperCase()}`}
                  </Button>
                );
              })}
            </Box>
          );
        })}
      </Box>
      <Box>
        <Button disabled>Disabled</Button>
        <Button variant="secondary" disabled>
          Disabled
        </Button>
      </Box>
    </>
  );
};

export const Anchors: React.FC = () => {
  return (
    <>
      <Box>
        {Object.values(variants).map((variant) => {
          return (
            <Box key={variant}>
              {Object.values(scales).map((scale) => {
                return (
                  <Button
                    // as="a"
                    // href="https://pancakeswap.finance"
                    key={scale}
                    variant={variant}
                    scale={scale}
                    external
                  >
                    {`${capitalize(variant)} anchor ${scale.toUpperCase()}`}
                  </Button>
                );
              })}
            </Box>
          );
        })}
      </Box>
      <Box>
        <Button
          // as="a"
          // href="https://pancakeswap.finance"

          external
          disabled
        >
          Disabled
        </Button>
        <Button
          // as="a"
          // href="https://pancakeswap.finance"
          variant="secondary"
          external
          disabled
        >
          Disabled
        </Button>
      </Box>
    </>
  );
};

export const Variants: React.FC = () => {
  return (
    <Box>
      <BrowserRouter>
        <Row>
          <Button as={Link} to="/router-link" variant="secondary">
            As an React Router link
          </Button>
        </Row>
        <Row>
          <Button>Full size</Button>
        </Row>
        <Row>
          <Button
            isLoading
            endIcon={<AutoRenewIcon spin color="currentColor" />}
          >
            Approving
          </Button>
          <Button isLoading variant="success">
            Approving
          </Button>
        </Row>
        <Row>
          <Button startIcon={<LogoIcon />}>Start Icon</Button>
          <Button endIcon={<LogoIcon />}>End Icon</Button>
          <Button startIcon={<LogoIcon />} endIcon={<LogoIcon />}>
            Start & End Icon
          </Button>
        </Row>
        <Row>
          <IconButton>
            <LogoIcon />
          </IconButton>
          <IconButton variant="secondary">
            <AddIcon />
          </IconButton>
        </Row>
        <Row>
          <IconButton scale="sm" variant="danger">
            <LogoIcon />
          </IconButton>
          <IconButton scale="sm" variant="success">
            <AddIcon color="currentColor" />
          </IconButton>
        </Row>
      </BrowserRouter>
    </Box>
  );
};
