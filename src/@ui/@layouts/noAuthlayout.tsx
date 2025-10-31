import { Outlet } from "react-router-dom";

const NoAuthLayout = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Outlet />
    </div>
  );
};
export default NoAuthLayout;
