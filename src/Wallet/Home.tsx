import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "./connectors";
import styled from "styled-components";
import { shortAddress, normalizeAccount } from "./utils";
import ModalConnectors from "./Modal/ModalConnectors";
import logoutImg from "./image/logout-svgrepo-com.svg";
import Web3 from "web3";

const Home = () => {
  const { library, account, activate, deactivate, active } = useWeb3React();

  const [isOpen, setIsOpen] = useState(false);

  let web3 = new Web3(library?.provider);

  const signMessage = async () => {
    if (!library) return;
    try {
      let signature = await library?.provider.request({
        method: "personal_sign",
        params: ["personal_sign message", account],
      });

      if (signature) {
        verifyMessage(signature);
      }
    } catch (error) {
      console.log("ERR", error);
    }
  };

  const verifyMessage = async (signature: string) => {
    if (!library) return;

    let recovered = web3.eth.accounts.recover(
      "personal_sign message",
      signature
    );
  };

  const closeModal = () => {
    setIsOpen(!isOpen);
  };

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
  }, [account, active, activate]);

  const callContract = async () => {
    try {
      const abi = [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "totalSupply_",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "name_",
              type: "string",
            },
            {
              internalType: "string",
              name: "symbol_",
              type: "string",
            },
            {
              internalType: "uint8",
              name: "decimals_",
              type: "uint8",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "account",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "decimals",
          outputs: [
            {
              internalType: "uint8",
              name: "",
              type: "uint8",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "mint",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "name",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "symbol",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "recipient",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "sender",
              type: "address",
            },
            {
              internalType: "address",
              name: "recipient",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];

      const bep20 = new web3.eth.Contract(
        abi as [],
        "0x53a38D12b84a7413eDa4B1206A7A28B59Aed9850"
      );

      await bep20.methods
        .approve("0xD3BbF6AFC5286D245aCC947F4c5Bcff4FF3726e2", "10000000000")
        .send({ from: account });
    } catch (error) {
      console.log("ERR", error);
    }
  };

  return (
    <>
      <>
        {!active ? (
          <Button onClick={closeModal}>Connect Wallet</Button>
        ) : (
          <>
            <AccountDiv>
              {/* <span className={account}>balance wallet</span> */}
              <WalletSpan>{shortAddress(account)}</WalletSpan>
              <button onClick={disconnect}>
                <img
                  src={logoutImg}
                  alt="logout image"
                  width={15}
                  height={15}
                />
              </button>
            </AccountDiv>
            <WalletMobileSpan>{normalizeAccount(account)}</WalletMobileSpan>
          </>
        )}
        <button onClick={callContract}>Aprove ( imitation )</button>
        <button onClick={signMessage}>signMessage</button>
      </>
      <ModalConnectors isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};
export default Home;

export const Button = styled.button`
  width: 200px;
  height: 40px;
  border-radius: 4px;
  line-height: 40px;
  border: none;
  background-color: #e44b05;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #bd3c00;
  }

  @media screen and (max-width: 960px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: 40px;
    padding: 0 5px;
    font-size: 12px;
    line-height: 40px;
    width: 200px;
  }
`;

export const AccountDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  padding: 2px 2px 2px 10px;
  height: 40px;
  width: 150px;
  background-color: #174862;
  color: #ffffff;
  font-size: 14px;

  @media screen and (max-width: 960px) {
    font-size: 12px;
    padding: 2px 10px 2px 10px;
  }
`;

export const WalletSpan = styled.span`
  display: block;
  margin-left: 10px;
  border-radius: 4px;
  padding: 10px;
  background-color: #252525;

  @media screen and (max-width: 550px) {
    display: none;
  }
`;

export const WalletMobileSpan = styled.span`
  display: none;
  /* margin-left: 10px; */
  border-radius: 8px;
  padding: 10px;
  color: #ffffff;
  width: 110px;
  height: 40px;
  background-color: #111111;

  @media screen and (max-width: 960px) {
    /* !* .account-wallet-mobile { *!
    !* display: block; *!
    display: flex;
    align-items: center;
    height: 24px;*/
    font-size: 12px;
    /* } */
  }
`;
