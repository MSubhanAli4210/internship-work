import { QueryClient } from "@tanstack/react-query";
import { AppTable } from "../@components/appTable";
import { Button } from "../../components/ui/button";

function AppDeposit() {
  const queryClient = new QueryClient();

  const refreshDepositsData = () => {
    queryClient.invalidateQueries({ queryKey: ["deposite"] });
  };

  return (
    <>
      <Button onClick={refreshDepositsData}>Refresh Table</Button>
      <div
        className="
              w-full min-h-155
              p-4
              bg-gray-100
              rounded-md
            "
      >
        <h1 className="font-bold m-2">Deposit</h1>
        <AppTable endpoint="" />
      </div>
    </>
  );
}

export default AppDeposit;
