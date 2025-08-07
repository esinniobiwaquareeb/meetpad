import {
  getCurrentUser,
  getUserEarnings,
  getUserWalletHistory,
} from "@/server/user.actions";
import { EarningsTable, WalletHistoryTable } from "./tables";
import { earningColumns, walletHistoryColumns } from "./columns";

export async function EarningsTableProvider() {
  const user = await getCurrentUser();
  const earnings = (await getUserEarnings(user.id)) ?? [];
  return <EarningsTable columns={earningColumns} data={earnings} />;
}

export async function WalletHistoryTableProvider() {
  const user = await getCurrentUser();
  const walletHistory = (await getUserWalletHistory(user.id)) ?? [];

  return (
    <WalletHistoryTable columns={walletHistoryColumns} data={walletHistory} />
  );
}
