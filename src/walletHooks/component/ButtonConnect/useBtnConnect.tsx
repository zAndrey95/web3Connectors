import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../../connectors";
import Web3 from "web3";

export const useBtnConnect = () => {
  const { library, account, activate, deactivate, active } = useWeb3React();

  const [isOpen, setIsOpen] = useState(false);
  const [balance, setBalance] = useState("0.00");
  const [isVerify, setIsVerify] = useState(false);

  let web3 = new Web3(library?.provider);

  const getInfo = async () => {
    const balance = await web3.eth.getBalance(account + "");
    if (balance) {
      setBalance(balance);
    }
  };

  const signMessage = async (messageSign?: string) => {
    if (!library) return;
    const fortmaticProvider = localStorage.getItem("provider");
    try {
      if (fortmaticProvider === "fortmatic") {
        await library?.provider.sendAsync(
          {
            method: "personal_sign",
            params: [messageSign, account],
          },
          (err: any, result: any) => {
            if (result) {
              verifyMessage(result.result);
            } else return;

            if (err) return;
          }
        );
      } else {
        let signature = await library?.provider.request({
          method: "personal_sign",
          params: [messageSign, account],
        });

        if (signature) {
          verifyMessage(signature);
        }
      }
    } catch (error) {
      return;
    }
  };

  const verifyMessage = async (signature: string) => {
    if (!library) return;
    let recovered = web3.eth.accounts.recover(
      "personal_sign message",
      signature
    );
    if (recovered === account) {
      setIsVerify(true);
    }
  };

  // const openModal = () => {
  //   setIsOpen(!isOpen);
  // };

  const refreshState = () => {
    window.localStorage.setItem("provider", "");
  };

  const disconnect = () => {
    refreshState();
    deactivate();
    localStorage.clear();
  };

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");

    if (provider) {
      activate(connectors[provider]);
    }

    if (account) {
      getInfo();
    }
  }, [account, active, activate]);

  console.log("isOpen btn",isOpen)

  return {
    active,
    // openModal,
    setIsOpen,
    balance,
    account,
    disconnect,
    isOpen,
    signMessage,
    isVerify,
  };
};
