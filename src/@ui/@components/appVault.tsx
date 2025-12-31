import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle } from "../../components/ui/card";
import { toast } from "sonner";
import { getBalanceApi } from "../../@core/api/api";
import { userAuthStore } from "../../store/userAuthStore";

export function AppVault() {
  const { user } = userAuthStore((state) => state);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      if (user?.role !== "admin") {
        return 0;
      }
      const response = await getBalanceApi();

      if (!response) {
        toast.error("Failed to fetch balance", { richColors: true });
        return 0;
      }

      return Number(response.balance || 0);
    },
    throwOnError: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
  });

  const balance = data ?? 0;

  return (
    <Card className="m-2">
      <CardHeader>
        <CardTitle>Balance</CardTitle>
        <div className="text-2xl font-bold mt-1">
          {isLoading
            ? "Loading balance..."
            : isError
            ? "Error fetching balance"
            : `$${balance.toLocaleString()}`}
        </div>
      </CardHeader>
    </Card>
  );
}
