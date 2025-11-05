import { AppTable } from "../@components/appTable";

function AppExpenses() {
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
        <h1 className="font-bold m-2">Expenses</h1>
        <AppTable endpoint="" />
      </div>
    </>
  );
}

export default AppExpenses;
