import React from "react";
import BoxComponent from "./Box";
import FlexComponent from "./Flex";

export default {
  title: "Components/Primitives",
  component: BoxComponent,
  argTypes: {},
};

export const Box: React.FC = () => {
  return (
    <div>
      <BoxComponent as="p">
        Contains background, border, layout, position, and space from{" "}
        <a href="https://styled-system.com/api" target="_blank">
          Styled System&lsquo;s API
        </a>
      </BoxComponent>
    </div>
  );
};

export const Flex: React.FC = () => {
  return (
    <div>
      <span>
        Based on the Box component. You can apply any flexbox properties on the
        Flex component.
      </span>
      <a href="https://styled-system.com/api#flexbox" target="_blank">
        List of applicable props
      </a>
      <FlexComponent>
        <span>Left</span>
        <span>right</span>
      </FlexComponent>
      <FlexComponent>
        <span>center</span>
      </FlexComponent>
    </div>
  );
};
