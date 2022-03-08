import React from "react"; // @ts-nocheck
import Button from "../Button/Button";
import { connectorLocalStorageKey } from "./config";
import { Login, Config } from "./types";
// import { isMobile } from "react-device-detect";

interface Props {
  walletConfig: Config;
  login: Login;
  onDismiss: () => void;
  mb: string;
}

const WalletCard: React.FC<Props> = ({
  login,
  walletConfig,
  onDismiss,
  mb,
}) => {
  const { title, icon: Icon } = walletConfig;

  return (
    <>
      <Button
        width="100%"
        variant="tertiary"
        onClick={() => {
          login(walletConfig.connectorId);
          window.localStorage.setItem(
            connectorLocalStorageKey,
            walletConfig.connectorId
          );
          onDismiss();
        }}
        style={{ justifyContent: "space-between" }}
        mb={mb}
        id={`wallet-connect-${title.toLocaleLowerCase()}`}
      >
        <span>{title}</span>
        <Icon width="32px" />
      </Button>
    </>
  );
};

export default WalletCard;
