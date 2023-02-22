import { isAddress } from "ethers/lib/utils.js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAtom, atom } from "jotai";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { useUsersTicketDelegate } from "@hooks/useUsersTicketDelegate";
import { usePrizePoolTicketAddress } from "@hooks/usePrizePoolTicketAddress";
import DelegateableERC20Abi from "@abis/DelegateableERC20";
import { Page } from "@components/Page";
import { useUsersTwab } from "@hooks/useUsersTwab";
import { TransactionButton } from "../../../../../../components/TransactionButton";

// TODO: Switch wallet chain to send transaction, show transaction receipt
const DelegatePage = () => {
  const router = useRouter();
  const { prizePoolAddress, delegateAddress, chainId } = router.query;

  const [config, setConfig] = useState<{
    chainId: number;
    prizePoolAddress: string;
    delegateAddress: string;
  }>();

  useEffect(() => {
    // TODO: Validate against proper chain ids
    if (
      router.isReady &&
      (typeof delegateAddress != "string" ||
        typeof prizePoolAddress != "string" ||
        typeof chainId != "string" ||
        isNaN(Number(chainId)) ||
        !isAddress(delegateAddress) ||
        !isAddress(prizePoolAddress))
    ) {
      router.replace(`/`);
    } else {
      setConfig({
        chainId: Number(chainId),
        prizePoolAddress: prizePoolAddress as string,
        delegateAddress: delegateAddress as string,
      });
    }
  }, [delegateAddress, prizePoolAddress, chainId, router]);

  return (
    <Page
      title="PoolTogether Delegation Donation"
      description="Delegate your chances to win to another wallet while maintaining full custody of your funds."
    >
      {!!config && (
        <DelegateCard
          chainId={config.chainId}
          prizePoolAddress={config.prizePoolAddress}
          delegateAddress={config.delegateAddress}
        />
      )}
    </Page>
  );
};

const DelegateCard = (props: {
  prizePoolAddress: string;
  delegateAddress: string;
  chainId: number;
}) => {
  const { prizePoolAddress, delegateAddress, chainId } = props;

  return (
    <div className="card bg-base-200">
      <div className="card-body">
        <h2 className="card-title">{delegateAddress}</h2>
        <p className="mb-8">
          Give your chances to win prizes to {delegateAddress} while maintaining
          full control of your funds.
        </p>
        <DelegationStatus
          prizePoolAddress={prizePoolAddress}
          delegateAddress={delegateAddress}
          chainId={chainId}
        />
      </div>
    </div>
  );
};

const DelegationStatus = (props: {
  prizePoolAddress: string;
  delegateAddress: string;
  chainId: number;
}) => {
  const { prizePoolAddress, delegateAddress, chainId } = props;

  const { isConnected, address } = useAccount();
  const {
    data: currentDelegateAddress,
    isFetched: isDelegateFetched,
    isError: isDelegateReadError,
    refetch: refetchDelegate,
  } = useUsersTicketDelegate(chainId, address as string, prizePoolAddress);
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

  if (isConnected && isDelegateFetched && !isDelegateReadError) {
    if (
      (currentDelegateAddress as string)?.toLowerCase() ===
      delegateAddress.toLowerCase()
    ) {
      return (
        <button className="btn btn-disabled" disabled>
          Donating
        </button>
      );
    } else {
      return (
        <TransactionButton
          chainId={chainId}
          className="btn btn-primary"
          write={write}
          hash={data?.hash}
        >
          Donate
        </TransactionButton>
      );
    }
  } else {
    return null;
  }
};

export default DelegatePage;
