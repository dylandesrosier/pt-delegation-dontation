import { NextPage } from "next";
import { Page } from "../components/Page";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { PrizePoolMetaData, V4_PRIZE_POOLS } from "../constants/prizePool";
import { useUsersTicketDelegate } from "../hooks/useUsersTicketDelegate";
import DelegateableERC20Abi from "@abis/DelegateableERC20";
import {
  getChainNiceName,
  getEtherscanAddressLink,
  getViewDelegatePath,
} from "../utils/blockchain";
import Link from "next/link";
import { TransactionButton } from "../components/TransactionButton";
import { usePrizePoolTicketAddress } from "../hooks/usePrizePoolTicketAddress";

const Account: NextPage = () => {
  const { isConnected } = useAccount();
  return (
    <Page
      title="PoolTogether Delegation Donation"
      description="Delegate your chances to win to another wallet while maintaining full custody of your funds."
    >
      {isConnected ? <DelegatesCard /> : <NoWalletConnected />}
    </Page>
  );
};

/**
 * A card that displays the current delegate of the connected wallet
 */
const DelegatesCard = () => {
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title">Current Delegates</h2>
        <p>These are the delegates you currently have set.</p>
        <div className="flex flex-col gap-4">
          {V4_PRIZE_POOLS.map((prizePool) => (
            <CurrentDelegateCardItem
              key={`${prizePool.chainId}-${prizePool.prizePoolAddress}`}
              prizePool={prizePool}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const CurrentDelegateCardItem = (props: { prizePool: PrizePoolMetaData }) => {
  const { prizePool } = props;
  const { chainId, prizePoolAddress } = prizePool;
  const { address } = useAccount();
  const {
    data: delegateAddress,
    isFetched,
    isError,
    refetch: refetchDelegate,
  } = useUsersTicketDelegate(
    chainId,
    address as `0x${string}`,
    prizePoolAddress
  );
  const ticketAddress = usePrizePoolTicketAddress(chainId, prizePoolAddress);
  const { config } = usePrepareContractWrite({
    address: ticketAddress as `0x${string}`,
    chainId,
    args: [delegateAddress],
    abi: DelegateableERC20Abi,
    functionName: "delegate",
    onSuccess: () => refetchDelegate(),
  });
  const { write, data } = useContractWrite(config);

  return (
    <div>
      <h3 className="font-bold text-lg">{getChainNiceName(chainId)}</h3>
      {isFetched && !isError && (
        <div className="flex flex-col lg:flex-row lg:items-center gap-2">
          <span className="text-sm lg:text-base">
            {delegateAddress as string}
          </span>
          <a
            href={getEtherscanAddressLink(chainId, delegateAddress as string)}
            className="btn btn-sm btn-link"
          >
            Block Explorer
          </a>
          <Link
            href={getViewDelegatePath(
              chainId,
              prizePoolAddress,
              delegateAddress as string
            )}
            className="btn btn-sm btn-primary"
          >
            View
          </Link>
          <TransactionButton
            chainId={chainId}
            className="btn btn-primary btn-sm"
            write={write}
            hash={data?.hash}
          >
            Reset
          </TransactionButton>
        </div>
      )}
    </div>
  );
};

const NoWalletConnected = () => {
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title">No wallet connected</h2>
        <p>Connect your wallet to make changes to your delegations.</p>
      </div>
    </div>
  );
};

export default Account;
