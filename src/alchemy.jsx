import { Network, Alchemy } from "alchemy-sdk";
const apiKey = import.meta.env.VITE_ALCHEMY_SDK_API_KEY;
// Optional config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: apiKey, // Replace with your Alchemy API Key.
  network: Network.ETH_MAINNET, // Replace with your network.
};
export const alchemy = new Alchemy(settings);
