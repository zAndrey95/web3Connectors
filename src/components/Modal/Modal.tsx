import React from "react";
import styled from "styled-components";
import Flex from "../Box/Flex";
import { ArrowBackIcon, CloseIcon } from "../Svg";
import { IconButton } from "../Button";
import { InjectedProps } from "./types";

interface Props extends InjectedProps {
  title: string;
  hideCloseButton?: boolean;
  onBack?: () => void;
  bodyPadding?: string;
  onDismiss?: () => void;
}

const Modal: React.FC<Props> = ({
  title,
  onDismiss,
  onBack,
  children,
  hideCloseButton = false,
}) => (
  <StyledModal>
    <ModalHeader>
      <ModalTitle>
        {onBack && (
          <IconButton variant="text" onClick={onBack} area-label="go back">
            <ArrowBackIcon color="primary" />
          </IconButton>
        )}
        <p>{title}</p>
      </ModalTitle>
      {!hideCloseButton && (
        <IconButton
          variant="text"
          onClick={onDismiss}
          aria-label="Close the dialog"
        >
          <CloseIcon color="primary" />
        </IconButton>
      )}
    </ModalHeader>
    <FlexCont>{children}</FlexCont>
  </StyledModal>
);

export default Modal;

const StyledModal = styled.div`
  flex-direction: column;
  background: rgba(14, 14, 44, 0.1);
  border: 1px solid rgba(14, 14, 44, 0.1);
  border-radius: 32px;
  width: 400px;
  z-index: 12;
`;
const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e9eaeb;
  align-items: center;
  padding: 12px 24px;
`;

const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
`;
const FlexCont = styled.div`
  display: flex;
  flex-direction: column;
`;
