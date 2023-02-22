export interface PrizePoolMetaData {
  chainId: number;
  prizePoolAddress: string;
  ticketAddress: string;
}

export const V4_PRIZE_POOLS: PrizePoolMetaData[] = [
  {
    chainId: 1,
    prizePoolAddress: "0xd89a09084555a7D0ABe7B111b1f78DFEdDd638Be",
    ticketAddress: "0xdd4d117723C257CEe402285D3aCF218E9A8236E1",
  },
  {
    chainId: 10,
    prizePoolAddress: "0x79Bc8bD53244bC8a9C8c27509a2d573650A83373",
    ticketAddress: "0x62BB4fc73094c83B5e952C2180B23fA7054954c4",
  },
  {
    chainId: 137,
    prizePoolAddress: "0x19DE635fb3678D8B8154E37d8C9Cdf182Fe84E60",
    ticketAddress: "0x6a304dFdb9f808741244b6bfEe65ca7B3b3A6076",
  },
];
