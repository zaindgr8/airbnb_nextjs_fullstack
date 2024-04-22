import { Skeleton } from "@/components/ui/skeleton"
import dynamic from "next/dynamic"


export function HomeMap ({locationValue}) {
  const LazyMap= dynamic(()=>import("@/app/components/Map"),{
    ssr: false,
    loading: () => <Skeleton className=""/>
  })
  return (
<>
<LazyMap locationValue={locationValue} />
</>
  )
}
