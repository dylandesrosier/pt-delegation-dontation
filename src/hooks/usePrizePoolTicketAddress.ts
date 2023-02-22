// import { useContractRead } from "wagmi";
// import V4PrizePool from "../abis/V4PrizePool";
import { V4_PRIZE_POOLS } from "../constants/prizePool";

export const usePrizePoolTicketAddress = (
  chainId: number,
  prizePoolAddress: string
) => {
  return V4_PRIZE_POOLS.find(
    (prizePool) =>
      prizePool.chainId === chainId &&
      prizePool.prizePoolAddress.toLowerCase() ===
        prizePoolAddress.toLowerCase()
  )?.ticketAddress;

  // Too many reads for something we know is constant
  // return useContractRead({
  //   abi: V4PrizePool,
  //   address: prizePoolAddress,
  //   chainId,
  //   functionName: "getTicket",
  // });
};
