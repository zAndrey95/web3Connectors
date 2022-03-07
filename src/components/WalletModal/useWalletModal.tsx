// @ts-nocheck
import React from "react";
import useModal from "../Modal/Modal";
import ConnectModal from "./ConnectModal";
import { Login } from "./types";

interface Props {
  onPresentConnectModal?: () => any;
}

const useWalletModal = () => {
  const [onPresentConnectModal] = useModal(<ConnectModal />);
  return { onPresentConnectModal };
};

export default useWalletModal;
