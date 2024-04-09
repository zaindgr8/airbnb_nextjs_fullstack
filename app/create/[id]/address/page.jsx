"use client"
import { useCountries } from "@/app/lib/getCountries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectItem
} from "@/components/ui/select";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import CreationBottomBar from "@/app/components/CreationBottomBar";
import { createLocation } from "@/components/ui/action";

const Page = ({params}) => {
  const [locationValue, setLocationValue]= useState("")
  const {getAllCountries}= useCountries()
//to render map only at client side
  const LazyMap= dynamic(()=>import("@/app/components/Map"), {
    ssr:false,
    loading: ()=><Skeleton />
  })

  return (
    <div className="w-3/5 mx-auto space-y-3">
      <h2>Where is you Home Located</h2>
      <div>
        <form action={createLocation}>
          <input type="hidden" name="homeId" value={params.id} />
          <input type="hidden" name="countryValue" value={locationValue} />
          <Select onValueChange={(e) => setLocationValue(e)} required>
            <SelectTrigger>
              <SelectValue placeholder="Select a Country" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Countries</SelectLabel>
                {getAllCountries().map((item) => (
                  <SelectItem value={item.value} key={item.value}>
                    {item.flag} {item.label}/ {item.region}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <CreationBottomBar />
        </form>
      </div>
      <LazyMap locationValue={locationValue} />

      {/* <Map /> */}
    </div>
  );
};

export default Page;
