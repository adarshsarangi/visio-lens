import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CameraCapture from "./camera-capture";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-blue-600/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-5 md:justify-end">
          <Link href="/">
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/flipkart-plus_8d85f4.png"
              alt="Flipkart"
              className="h-6"
            />
          </Link>
          <Dialog>
            <div className="flex w-full flex-1 items-center">
              <div className="relative flex w-full max-w-xl items-center">
                <Input
                  type="text"
                  placeholder="Search for products, phones and more"
                  className="h-10 max-w-xl border-none bg-white pr-[5.3rem]"
                />
                <div className={cn("absolute right-1")}>
                  <div className="flex items-center gap-[2px]">
                    <DialogTrigger asChild>
                      <div
                        className={cn(
                          buttonVariants({
                            variant: "ghost",
                          }),
                          "w-9 px-0 hover:cursor-pointer",
                        )}
                        role="button"
                      >
                        <Icons.camera className="h-6 w-6 text-gray-500" />
                      </div>
                    </DialogTrigger>

                    <div className="h-4 w-[1px] bg-gray-200" />
                    <div
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                        }),
                        "w-9 px-0 hover:cursor-pointer",
                      )}
                    >
                      <Icons.search className="h-6 w-6 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Search visually</DialogTitle>
                <DialogDescription>
                  Capture from your camera or upload a product you saved.
                </DialogDescription>
              </DialogHeader>
              <div>
                <CameraCapture />
              </div>
            </DialogContent>
          </Dialog>
          <h1 className="font-medium text-white">Saheb</h1>
          <h1 className="font-medium text-white">Cart</h1>
        </div>
      </div>
      <MainNav />
    </header>
  );
}
