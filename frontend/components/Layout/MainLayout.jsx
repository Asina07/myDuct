import React from "react";
import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
  const sideBarOpen = false;
  return (
    <div className="flex min-h-[100svh] overflow-auto bg-stone-100  lg:min-h-screen">
      <div
        className={`${
          sideBarOpen
            ? "left-[15rem] max-w-[calc(100%-15rem)] overflow-hidden sm:overflow-auto"
            : "left-0 max-w-[100vw]"
        } relative h-[100svh] w-full flex-1 overflow-auto text-sm transition-[margin,left]  duration-500 ease-in-out lg:h-screen`}
      >
        {/* <MainHeader /> */}

        <Navbar />
        <main className="flex    w-full max-w-[100vw] overflow-auto bg-stone-100 pb-8">
          <main className="w-full flex-1 px-5">{children}</main>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
