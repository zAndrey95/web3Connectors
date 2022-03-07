// Set of helper functions to facilitate wallet setup

// import { BASE_BSC_SCAN_URL, BASE_URL } from "config";
// import { nodes } from "./getRpcUrl";
// import { getAlternativeProvider } from "../util/helpers";

export const setupNetwork = async () => {
  const provider = window.ethereum;
  if (provider) {
    const chainId = parseInt("56", 10);
    try {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: "BNB Smart Chain Mainnet",
            nativeCurrency: {
              name: "BNB",
              symbol: "bnb",
              decimals: 18,
            },
            // rpcUrls: nodes,
            blockExplorerUrls: [`https://bscscan.com`],
          },
        ],
      });
      return true;
    } catch (error) {
      console.error("Failed to setup the network in Metamask:", error);
      return false;
    }
  } else {
    console.error(
      "Can't setup the BSC network on metamask because window.ethereum is undefined"
    );
    return false;
  }
};

