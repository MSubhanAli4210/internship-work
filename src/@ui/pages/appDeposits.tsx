import { Button } from "../../components/ui/button";

import { AppTable } from "../@components/appTable";
import { BankDeposit } from "../@components/bankDeposit";
import { useLocation, useNavigate } from "react-router-dom";

function AppDeposit() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const type = params.get("type") || "bank";

  const bank = () => navigate("/deposits?type=bank");
  const cash = () => navigate("/deposits?type=cash");

  return (
    <>
      <div
        className="
              w-full min-h-155
              p-4
              bg-gray-100
              rounded-md
            "
      >
        <h1 className="font-bold m-2">
          {type === "cash"
            ? "Cash Deposit"
            : type === "bank"
            ? "Bank Deposit"
            : "Pending Requests for deposits"}
        </h1>

        <div className="flex justify-between mb-5 bg-gray-300 rounded-md">
          <Button
            className={
              type === "bank"
                ? "w-[50%]"
                : "w-[50%] bg-gray-300 text-black hover:text-gray-400 hover:bg-gray-200"
            }
            onClick={bank}
          >
            Bank Deposits
          </Button>
          <Button
            className={
              type === "cash"
                ? "w-[50%]"
                : "w-[50%] bg-gray-300 text-black hover:text-gray-400 hover:bg-gray-200"
            }
            onClick={cash}
          >
            Cash Deposits
          </Button>
        </div>
        {type === "cash" ? <AppTable /> : <BankDeposit />}
      </div>
    </>
  );
}

export default AppDeposit;
