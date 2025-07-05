import { useEffect, useCallback } from "react";
import { Log, TransactionReceipt } from "viem";
import { useWaitForTransactionReceipt } from "wagmi";

export type TxSuccessCallback = (receipt: TransactionReceipt) => void;

const useWaitForTransactionSuccess = (
  hash: `0x${string}` | undefined,
  callback: TxSuccessCallback
) => {
  const memoizedCallback = useCallback(callback, []);
  const { data, isLoading } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: Boolean(hash),
      select: (receipt) => ({
        isSuccess: receipt.status === "success",
        logs: receipt.logs,
        receipt,
      }),
    },
  });

  useEffect(() => {
    if (data?.isSuccess && hash) {
      memoizedCallback(data?.receipt);
    }
  }, [data?.isSuccess, hash, memoizedCallback]);

  return {
    isLoading,
  };
};

export default useWaitForTransactionSuccess;
