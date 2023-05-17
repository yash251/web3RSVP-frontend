import abiJSON from "./Web3RSVP.json";
import { ethers } from "ethers";

function connectContract() {
    const contractAddress = "0x5A74f8935FE7204553cAa5918858ed8FF335eD4B";
    const contractABI = abiJSON.abi;
    let rsvpContract;
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        rsvpContract = new ethers.Contract(contractAddress, contractABI, signer); // instantiating new connection to the contract
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
    return rsvpContract;
  }
  
export default connectContract;