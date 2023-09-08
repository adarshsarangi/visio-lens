import { SiteHeader } from "@/components/site-header";
import React from "react";

interface MainLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <SiteHeader />
      <main className="container">{children}</main>
    </div>
  );
};

export default MainLayout;
