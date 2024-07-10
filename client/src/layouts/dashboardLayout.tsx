import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React, { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <Suspense
      fallback={
        <div className="grid h-screen  place-items-center">Loading...</div>
      }
    >
      <div className="max-w-[1280px] w-full mx-auto">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </Suspense>
  );
};

export default DashboardLayout;
