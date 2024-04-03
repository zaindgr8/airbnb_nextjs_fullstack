"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { categoryItems } from "../lib/categoryItems";

const MapFilterItems = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("filter");
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex gap-x-5 overflow-x-scroll mt-2">
      {categoryItems.map((item, index) => (
        <Link
          className={cn(
            search == item.name ? "border-b-2 border-black" : "opacity-70"
          )}
          key={item.id}
          href={pathname + "?" + createQueryString("filter", item.name)}
        >
          <Image src={item.imageUrl} alt="Category Image" width={24} height={24} />
          <p className="">{item.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default MapFilterItems;
