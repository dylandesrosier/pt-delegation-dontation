import { useContractRead } from "wagmi";
import DelegateableERC20Abi from "../abis/DelegateableERC20";
import { usePrizePoolTicketAddress } from "./usePrizePoolTicketAddress";

export const useUsersTwab = (
  chainId: number,
  address: string,
  prizePoolAddress: string
) => {
  const ticketAddress = usePrizePoolTicketAddress(chainId, prizePoolAddress);
  return useContractRead({
    abi: DelegateableERC20Abi,
    address: ticketAddress as `0x${string}`,
    chainId,
    args: [address, Math.floor(Date.now())],
    functionName: "getBalanceAt",
  });
};
