import { AppTable } from "../@components/appTable";


function AppWithdraw() {
     return (
        <><div 
        className="
              w-[90%] min-h-155
              p-4
              bg-gray-100
              rounded-md
              md:w-full
            "
        >   <h1 className="font-bold m-2">Withdraw</h1>
          <AppTable />
          </div>
        </>
      );
}


export default AppWithdraw;