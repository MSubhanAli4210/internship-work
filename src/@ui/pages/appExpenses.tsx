import { AppTable } from "../@components/appTable";

function AppExpenses() {
  return (
    <>
      <div
        className="
          w-[90%] min-h-155
          p-4
          bg-gray-100
          rounded-md
          md:w-full
        "
      >
        <h1 className="font-bold m-2">Expenses</h1>
        <AppTable />
      </div>
    </>
  );
}

export default AppExpenses;
