"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
// import { Badge } from "@/components/ui/badge";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="hidden bg-white shadow md:flex">
      <div className="container flex h-10 items-center">
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/men"
            className={cn(
              "hover:text-foreground/80 transition-colors",
              pathname === "/men" ? "text-foreground" : "text-foreground/60",
            )}
          >
            Men
          </Link>
          <Link
            href="/women"
            className={cn(
              "hover:text-foreground/80 transition-colors",
              pathname?.startsWith("/women")
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            Women
          </Link>
          <Link
            href="/clothings"
            className={cn(
              "hover:text-foreground/80 transition-colors",
              pathname?.startsWith("/themes")
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            Clothings
          </Link>
          <Link
            href="/electronics"
            className={cn(
              "hover:text-foreground/80 transition-colors",
              pathname?.startsWith("/electronics")
                ? "text-foreground"
                : "text-foreground/60",
            )}
          >
            Electronics
          </Link>
          <Link
            href={siteConfig.links.github}
            className={cn(
              "text-foreground/60 hover:text-foreground/80 hidden transition-colors lg:block",
            )}
          >
            Mobile
          </Link>
        </nav>
      </div>
    </div>
  );
}
